import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerResponseDto> {
    const existingEmail = await this.prisma.customer.findUnique({
      where: { email: createCustomerDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Customer with this email already exists');
    }

    const customer = await this.prisma.customer.create({
      data: {
        firstName: createCustomerDto.firstName,
        middleName: createCustomerDto.middleName,
        lastName: createCustomerDto.lastName,
        street: createCustomerDto.address.street,
        city: createCustomerDto.address.city,
        state: createCustomerDto.address.state,
        postalCode: createCustomerDto.address.postalCode,
        country: createCustomerDto.address.country,
        email: createCustomerDto.email,
        phone: createCustomerDto.phone,
        dateOfBirth: new Date(createCustomerDto.dateOfBirth),
      },
    });

    return this.mapToResponseDto(customer);
  }

  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.prisma.customer.findMany({
      orderBy: { id: 'asc' },
    });

    return customers.map(customer => this.mapToResponseDto(customer));
  }

  async findOne(id: number): Promise<CustomerResponseDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.mapToResponseDto(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const updateData: any = {};

    if (updateCustomerDto.firstName) updateData.firstName = updateCustomerDto.firstName;
    if (updateCustomerDto.middleName) updateData.middleName = updateCustomerDto.middleName;
    if (updateCustomerDto.lastName) updateData.lastName = updateCustomerDto.lastName;
    if (updateCustomerDto.email) updateData.email = updateCustomerDto.email;
    if (updateCustomerDto.phone) updateData.phone = updateCustomerDto.phone;

    if (updateCustomerDto.address) {
      if (updateCustomerDto.address.street) updateData.street = updateCustomerDto.address.street;
      if (updateCustomerDto.address.city) updateData.city = updateCustomerDto.address.city;
      if (updateCustomerDto.address.state) updateData.state = updateCustomerDto.address.state;
      if (updateCustomerDto.address.postalCode) updateData.postalCode = updateCustomerDto.address.postalCode;
      if (updateCustomerDto.address.country) updateData.country = updateCustomerDto.address.country;
    }

    if (updateCustomerDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateCustomerDto.dateOfBirth);
    }

    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: updateData,
    });

    return this.mapToResponseDto(updatedCustomer);
  }

  private mapToResponseDto(customer: any): CustomerResponseDto {
    return {
      id: customer.id,
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      address: {
        street: customer.street,
        city: customer.city,
        state: customer.state,
        postalCode: customer.postalCode,
        country: customer.country,
      },
      email: customer.email,
      phone: customer.phone,
      dateOfBirth: customer.dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
    };
  }
}
