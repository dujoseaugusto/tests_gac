import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Amount of the transaction',
    example: 100.50,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Payment for services',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'User ID associated with the transaction',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}