import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../../common/dto/address.dto';

export class CustomerResponseDto {
  @ApiProperty({ description: 'Customer ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Customer first name', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Customer middle name', example: 'Michael' })
  middleName: string;

  @ApiProperty({ description: 'Customer last name', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Customer address', type: AddressDto })
  address: AddressDto;

  @ApiProperty({ description: 'Customer email address', example: 'john.doe@email.com' })
  email: string;

  @ApiProperty({ description: 'Customer phone number', example: '+1234567890' })
  phone: string;

  @ApiProperty({ description: 'Customer date of birth', example: '1990-01-15' })
  dateOfBirth: string;
}
