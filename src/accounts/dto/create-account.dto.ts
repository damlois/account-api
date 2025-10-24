import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ 
    description: 'Account type (e.g., Savings, Current)'
  })
  @IsString()
  @IsNotEmpty()
  acctType: string;

  @ApiProperty({ description: 'Account status'})
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'User who created the account'})
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}


