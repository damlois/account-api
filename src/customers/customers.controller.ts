import { Controller, Get, Post, Body, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ 
    status: 201, 
    description: 'Customer created successfully.',
    type: CustomerResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input',
    type: ErrorResponseDto
  })
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of customers.',
    type: [CustomerResponseDto]
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer found.',
    type: CustomerResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found.',
    type: ErrorResponseDto
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update customer information' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer updated successfully.',
    type: CustomerResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input',
    type: ErrorResponseDto
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }
}
