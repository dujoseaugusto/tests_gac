import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importa a entidade User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporta o serviço caso seja necessário em outros módulos
})
export class UsersModule {}
