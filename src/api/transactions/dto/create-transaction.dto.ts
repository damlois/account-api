import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class CreateTransactionDto {

  @IsString()
  @IsNotEmpty()
  tranxType: string;


  @IsNumber()
  @IsPositive()
  amount: number;


  @IsString()
  @IsNotEmpty()
  performedBy: string;
}
