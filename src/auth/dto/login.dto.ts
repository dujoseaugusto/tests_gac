import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'E-mail do usuário', example: 'john@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;
}
