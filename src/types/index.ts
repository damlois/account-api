// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
}

// Customer Types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface UpdateCustomerRequest {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface Customer {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
  email: string;
  phone: string;
  dateOfBirth: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Account Types
export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT',
}

export interface CreateAccountRequest {
  acctType: AccountType;
  createdBy: string;
}

export interface Account {
  id: number;
  acctNumber: string;
  acctType: AccountType;
  balance: number;
  customerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Transaction Types
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
}

export interface CreateTransactionRequest {
  transactionType: TransactionType;
  amount: number;
  performedBy: string;
}

export interface Transaction {
  id: number;
  transactionType: TransactionType;
  amount: number;
  balance: number;
  accountId: number;
  performedBy: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

