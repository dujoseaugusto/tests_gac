import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email único do usuário', example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}