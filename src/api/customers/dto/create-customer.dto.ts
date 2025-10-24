import { IsString, IsEmail, IsDateString, IsNotEmpty, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { AddressDto } from '../../../common/dto/address.dto';

export class CreateCustomerDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;


  @IsString()
  @IsNotEmpty()
  middleName: string;


  @IsString()
  @IsNotEmpty()
  lastName: string;


  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;


  @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  phone: string;


  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
