import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({ 
    description: 'Account type (e.g., Savings, Current)', 
    example: 'Savings',
    required: false
  })
  @IsString()
  @IsOptional()
  acctType?: string;

  @ApiProperty({ description: 'Account status', example: 'Active', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Customer ID', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  custId?: number;

  @ApiProperty({ description: 'User who updated the account', example: 'admin', required: false })
  @IsString()
  @IsOptional()
  updatedBy?: string;
}
