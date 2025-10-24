import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty({ description: 'Transaction ID', example: 1 })
  tranxId: number;

  @ApiProperty({ description: 'Transaction date', example: '2023-01-15T10:30:00Z' })
  tranxDate: string;

  @ApiProperty({ description: 'Transaction type', example: 'Deposit' })
  tranxType: string;

  @ApiProperty({ description: 'Transaction amount', example: 100.50 })
  amount: number;

  @ApiProperty({ description: 'Account ID', example: 1 })
  accountId: number;
}