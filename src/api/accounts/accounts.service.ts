import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponseDto } from './dto/account-response.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: number, createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const account = await this.prisma.account.create({
      data: {
        acctType: createAccountDto.acctType,
        status: createAccountDto.status.toUpperCase() as any,
        custId: customerId,
        createdBy: createAccountDto.createdBy,
      },
    });

    return account;
  }

  async findByCustomerId(customerId: number): Promise<AccountResponseDto[]> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const accounts = await this.prisma.account.findMany({
      where: { custId: customerId },
      orderBy: { accountId: 'asc' },
    });

    return accounts;
  }

  async findOne(accountId: number): Promise<AccountResponseDto> {
    const account = await this.prisma.account.findUnique({
      where: { accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    return account;
  }

  async update(accountId: number, updateAccountDto: UpdateAccountDto): Promise<AccountResponseDto> {
    const account = await this.prisma.account.findUnique({
      where: { accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    const updateData: any = {};
    if (updateAccountDto.acctType) updateData.acctType = updateAccountDto.acctType;
    if (updateAccountDto.status) updateData.status = updateAccountDto.status.toUpperCase();
    if (updateAccountDto.updatedBy) updateData.updatedBy = updateAccountDto.updatedBy;

    const updatedAccount = await this.prisma.account.update({
      where: { accountId },
      data: updateData,
    });

    return updatedAccount;
  }

  async findByCustomerAndAccount(customerId: number, accountId: number): Promise<AccountResponseDto> {
    const account = await this.prisma.account.findFirst({
      where: { 
        accountId: accountId,
        custId: customerId 
      },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found for customer ${customerId}`);
    }

    return account;
  }

}
