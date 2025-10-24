import { IsString, IsNumber, IsOptional } from 'class-validator';


export class UpdateAccountDto {

  @IsString()
  @IsOptional()
  acctType?: string;


  @IsString()
  @IsOptional()
  status?: string;


  @IsString()
  @IsOptional()
  updatedBy?: string;
}
