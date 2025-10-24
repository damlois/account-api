import { IsString, IsNotEmpty, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ enum: ['Deposit', 'Withdrawal', 'Transfer'] })
  @IsString()
  @IsNotEmpty()
  tranxType: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  performedBy: string;
}
