import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  findAll() {
    return this.transactionRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.transactionRepository.findOne({ where: { id }, relations: ['user'] });
  }

  create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (transaction) {
      return this.transactionRepository.remove(transaction);
    }
    return null;
  }
}
