import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly usersService: UsersService,
  ) {}

  async findAll() {
    return this.transactionRepository.find({ relations: ['sender', 'receiver'] });
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    transaction.receiver.balance = parseFloat(transaction.receiver.balance.toString());
    transaction.sender.balance = parseFloat(transaction.sender.balance.toString());
    transaction.amount = parseFloat(transaction.amount.toString());
    return transaction;
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const { senderId, receiverId, amount } = createTransactionDto;

    const sender = await this.usersService.findOne(senderId);
    if (!sender) {
      throw new NotFoundException(`Sender with ID ${senderId} not found`);
    }

    const receiver = await this.usersService.findOne(receiverId);
    if (!receiver) {
      throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
    }

    if (sender.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await this.usersService.update(senderId, { balance: sender.balance });
    await this.usersService.update(receiverId, { balance: receiver.balance });

    const transaction = this.transactionRepository.create({
      sender: sender,
      receiver: receiver,
      amount,
      description: createTransactionDto.description,
    });

    return this.transactionRepository.save(transaction);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.transactionRepository.remove(transaction);
  }

  async reverseTransaction(id: number) {
    const transaction = await this.findOne(id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    const { sender, receiver, amount } = transaction;

    sender.balance += amount;
    receiver.balance -= amount;

    await this.usersService.update(sender.id, { balance: sender.balance });
    await this.usersService.update(receiver.id, { balance: receiver.balance });

    await this.transactionRepository.remove(transaction);

    return transaction;
  }
}
