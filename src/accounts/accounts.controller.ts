import { Controller, Get, Post, Body, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountResponseDto } from './dto/account-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts')
@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('customers/:id/accounts')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new account for customer' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({ 
    status: 201, 
    description: 'Account created successfully.',
    type: AccountResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input',
    type: ErrorResponseDto
  })
  createAccount(
    @Param('id') id: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(+id, createAccountDto);
  }

  @Get('customers/:id/accounts')
  @ApiOperation({ summary: 'Get all accounts for customer' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of accounts.',
    type: [AccountResponseDto]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found',
    type: ErrorResponseDto
  })
  findByCustomerId(@Param('id') id: string) {
    return this.accountsService.findByCustomerId(+id);
  }

  @Put('customers/:id/accounts')
  @ApiOperation({ summary: 'Update customer account' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Account updated successfully.',
    type: AccountResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input',
    type: ErrorResponseDto
  })
  updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.updateByCustomerId(+id, updateAccountDto);
  }

  @Get('accounts/:id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiParam({ name: 'id', description: 'Account ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Account found.',
    type: AccountResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Account not found.',
    type: ErrorResponseDto
  })
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Get('customers/:custId/accounts/:acctId')
  @ApiOperation({ summary: 'Get specific account for customer' })
  @ApiParam({ name: 'custId', description: 'Customer ID', type: 'number' })
  @ApiParam({ name: 'acctId', description: 'Account ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Account found.',
    type: AccountResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Account not found.',
    type: ErrorResponseDto
  })
  findByCustomerAndAccount(
    @Param('custId') custId: string,
    @Param('acctId') acctId: string,
  ) {
    return this.accountsService.findByCustomerAndAccount(+custId, +acctId);
  }
}
