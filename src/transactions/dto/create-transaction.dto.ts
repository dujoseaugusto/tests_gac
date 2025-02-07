import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'ID do usuário que envia o dinheiro',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({
    description: 'ID do usuário que recebe o dinheiro',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @ApiProperty({
    description: 'Valor da transação',
    example: 100.50,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Pagamento por serviços',
  })
  @IsNotEmpty()
  description: string;
}