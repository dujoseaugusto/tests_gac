import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432, 
      username: 'postgres',
      password: 'password',
      database: 'tests_gac_db', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    UsersModule,
    TransactionsModule,
  ],
})
export class AppModule {}
