# Bank API

A REST API for managing customers, accounts, and transactions.

## Features

- Customer management
- Account management  
- Transaction processing

## Technology Stack

- NestJS
- TypeScript
- Prisma
- SQLite

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up the database:
   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

3. Start the development server:
   ```bash
   yarn start:dev
   ```

4. Access the API at `http://localhost:3000`

## API Endpoints

### Customers
- `POST /customers` - Create customer
- `GET /customers` - List customers
- `GET /customers/{id}` - Get customer
- `PUT /customers/{id}` - Update customer

### Accounts
- `POST /customers/{id}/accounts` - Create account for customer
- `GET /customers/{id}/accounts` - List customer accounts
- `PUT /accounts/{id}` - Update account by ID
- `GET /accounts/{id}` - Get account by ID
- `GET /customers/{custId}/accounts/{acctId}` - Get specific customer account

### Transactions
- `POST /accounts/{id}/transactions` - Create transaction
- `GET /accounts/{id}/transactions` - List transactions