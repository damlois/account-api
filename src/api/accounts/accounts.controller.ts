import { Controller, Get, Post, Body, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('customers/:id/accounts')
  @HttpCode(HttpStatus.CREATED)
  createAccount(
    @Param('id') id: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(+id, createAccountDto);
  }

  @Get('customers/:id/accounts')
  findByCustomerId(@Param('id') id: string) {
    return this.accountsService.findByCustomerId(+id);
  }

  @Put('accounts/:id')
  updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Get('accounts/:id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Get('customers/:custId/accounts/:acctId')
  findByCustomerAndAccount(
    @Param('custId') custId: string,
    @Param('acctId') acctId: string,
  ) {
    return this.accountsService.findByCustomerAndAccount(+custId, +acctId);
  }
}
