import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({ description: 'Account ID', example: 1 })
  accountId: number;

  @ApiProperty({ description: 'Account type (e.g., Savings, Current)', example: 'Savings' })
  acctType: string;

  @ApiProperty({ description: 'Account balance', example: 1000.50 })
  balance: number;

  @ApiProperty({ description: 'Account open date', example: '2023-01-15T10:30:00Z' })
  openDate: string;

  @ApiProperty({ description: 'Account status', example: 'Active' })
  status: string;

  @ApiProperty({ description: 'Customer ID', example: 1 })
  custId: number;

  @ApiProperty({ description: 'User who created the account', example: 'admin' })
  createdBy: string;

  @ApiProperty({ description: 'Account creation date', example: '2023-01-15T10:30:00Z' })
  createdOn: string;

  @ApiProperty({ description: 'Account last update date', example: '2023-01-15T10:30:00Z' })
  updatedOn: string;

  @ApiProperty({ description: 'User who last updated the account', example: 'admin' })
  updatedBy: string;
}