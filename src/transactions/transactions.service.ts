import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(accountId: number, createTransactionDto: CreateTransactionDto): Promise<TransactionResponseDto> {
    const account = await this.prisma.account.findUnique({
      where: { accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    if (account.status.toUpperCase() !== 'ACTIVE') {
      throw new BadRequestException('Cannot perform transactions on inactive account');
    }

    if (createTransactionDto.tranxType === 'Withdrawal') {
      if (account.balance < createTransactionDto.amount) {
        throw new BadRequestException('Insufficient balance');
      }
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        transactionType: createTransactionDto.tranxType as any,
        amount: createTransactionDto.amount,
        accountId: accountId,
        performedBy: createTransactionDto.performedBy,
      },
    });

    let newBalance = account.balance;
    if (createTransactionDto.tranxType === 'Deposit') {
      newBalance += createTransactionDto.amount;
    } else if (createTransactionDto.tranxType === 'Withdrawal') {
      newBalance -= createTransactionDto.amount;
    }

    await this.prisma.account.update({
      where: { accountId },
      data: { 
        balance: newBalance,
        updatedBy: 'admin',
      },
    });

    return this.mapToResponseDto(transaction);
  }

  async findByAccountId(accountId: number): Promise<TransactionResponseDto[]> {
    const account = await this.prisma.account.findUnique({
      where: { accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: { transactionDate: 'desc' },
    });

    return transactions.map(transaction => this.mapToResponseDto(transaction));
  }

  private mapToResponseDto(transaction: any): TransactionResponseDto {
    return {
      tranxId: transaction.transactionId,
      tranxDate: transaction.transactionDate,
      tranxType: transaction.transactionType,
      amount: transaction.amount,
      accountId: transaction.accountId,
    };
  }
}