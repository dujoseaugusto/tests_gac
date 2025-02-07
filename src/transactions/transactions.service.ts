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
    private readonly usersService: UsersService, // Adiciona dependência do serviço de usuários
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

    return transaction;
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const { senderId, receiverId, amount } = createTransactionDto;

    // Valida se o remetente existe
    const sender = await this.usersService.findOne(senderId);
    if (!sender) {
      throw new NotFoundException(`Sender with ID ${senderId} not found`);
    }

    // Valida se o destinatário existe
    const receiver = await this.usersService.findOne(receiverId);
    if (!receiver) {
      throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
    }

    // Valida se o remetente tem saldo suficiente
    if (sender.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // Atualiza os saldos de remetente e destinatário
    sender.balance -= amount;
    receiver.balance += amount;

    await this.usersService.update(senderId, { balance: sender.balance });
    await this.usersService.update(receiverId, { balance: receiver.balance });

    // Cria e salva a transação
    const transaction = this.transactionRepository.create({
      sender: sender, // Deve ser uma instância de User
      receiver: receiver, // Deve ser uma instância de User
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
}
