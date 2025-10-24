import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';


@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('accounts/:id/transactions')
  @HttpCode(HttpStatus.CREATED)
  createTransaction(
    @Param('id') id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(+id, createTransactionDto);
  }

  @Get('accounts/:id/transactions')
  findByAccountId(@Param('id') id: string) {
    return this.transactionsService.findByAccountId(+id);
  }
}
