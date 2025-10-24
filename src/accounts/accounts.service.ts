import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponseDto } from './dto/account-response.dto';
import { AccountType } from '../common/enums/account-type.enum';

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
        acctType: createAccountDto.acctType as AccountType,
        status: createAccountDto.status as any,
        custId: customerId,
        createdBy: createAccountDto.createdBy,
      },
    });

    return this.mapToResponseDto(account);
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

    return accounts.map(account => this.mapToResponseDto(account));
  }

  async findOne(accountId: number): Promise<AccountResponseDto> {
    const account = await this.prisma.account.findUnique({
      where: { accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    return this.mapToResponseDto(account);
  }

  async updateByCustomerId(customerId: number, updateAccountDto: UpdateAccountDto): Promise<AccountResponseDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const account = await this.prisma.account.findFirst({
      where: { custId: customerId },
    });

    if (!account) {
      throw new NotFoundException(`No account found for customer with ID ${customerId}`);
    }

    const updateData: any = {};
    if (updateAccountDto.acctType) updateData.acctType = updateAccountDto.acctType as AccountType;
    if (updateAccountDto.status) updateData.status = updateAccountDto.status;
    if (updateAccountDto.updatedBy) updateData.updatedBy = updateAccountDto.updatedBy;

    const updatedAccount = await this.prisma.account.update({
      where: { accountId: account.accountId },
      data: updateData,
    });

    return this.mapToResponseDto(updatedAccount);
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

    return this.mapToResponseDto(account);
  }

  private mapToResponseDto(account: any): AccountResponseDto {
    return {
      accountId: account.accountId,
      acctType: account.acctType,
      balance: account.balance,
      openDate: account.createdOn,
      status: account.status,
      custId: account.custId,
      createdBy: account.createdBy,
      createdOn: account.createdOn,
      updatedOn: account.updatedOn,
      updatedBy: account.updatedBy,
    };
  }
}
