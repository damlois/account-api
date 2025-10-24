import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('Transactions')
@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('accounts/:id/transactions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new transaction for account' })
  @ApiParam({ name: 'id', description: 'Account ID', type: 'number' })
  @ApiResponse({ 
    status: 201, 
    description: 'Transaction created successfully.',
    type: TransactionResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request',
    type: ErrorResponseDto
  })
  createTransaction(
    @Param('id') id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(+id, createTransactionDto);
  }

  @Get('accounts/:id/transactions')
  @ApiOperation({ summary: 'Get all transactions for account' })
  @ApiParam({ name: 'id', description: 'Account ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of transactions.',
    type: [TransactionResponseDto]
  })
  findByAccountId(@Param('id') id: string) {
    return this.transactionsService.findByAccountId(+id);
  }
}
