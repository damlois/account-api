import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {

  @IsString()
  @IsNotEmpty()
  acctType: string;


  @IsString()
  @IsNotEmpty()
  status: string;


  @IsString()
  @IsNotEmpty()
  createdBy: string;
}


