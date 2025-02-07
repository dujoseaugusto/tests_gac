import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  UseGuards, 
  HttpCode 
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todas as transações' })
  @ApiResponse({ status: 200, description: 'Lista de transações retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter detalhes de uma transação específica' })
  @ApiResponse({ status: 200, description: 'Detalhes da transação retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar uma nova transação' })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou saldo insuficiente.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Post()
  @HttpCode(201)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Reverter uma transação' })
  @ApiResponse({ status: 200, description: 'Transação revertida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Post('reverse/:id')
  reverse(@Param('id') id: string) {
    return this.transactionsService.reverseTransaction(+id);
  }
}