import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Certifique-se de que o caminho esteja correto
import { User } from '../users/entities/user.entity'; // Certifique-se de que o caminho esteja correto
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user: any){
    const userLogin = await this.userRepository.findOne({ 
      where: { email: user.email }
    });

    if (!userLogin) {
      throw new NotFoundException(`User with email ${user.email} not found`);
    }

    if (user.password !== userLogin?.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    return {
      access_token: this.jwtService.sign({ sub: userLogin.id, email: userLogin.email }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const userLogin = await this.userRepository.findOne({ 
      where: { email: createUserDto.email }
    });

    if (userLogin) {
      throw new NotFoundException(`User with email ${createUserDto.email} already exists`);
    }
    return this.usersService.create(createUserDto);
  }
}
