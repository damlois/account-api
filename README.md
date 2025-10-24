# Bank API

A REST API for managing customers, accounts, and transactions.

## Features

- Customer management
- Account management  
- Transaction processing
- Swagger documentation

## API Endpoints

### Customers
- `POST /customers` - Create customer
- `GET /customers` - List customers
- `GET /customers/{id}` - Get customer
- `PUT /customers/{id}` - Update customer

### Accounts
- `POST /customers/{id}/accounts` - Create account
- `GET /customers/{id}/accounts` - List accounts
- `PUT /customers/{id}/accounts` - Update account
- `GET /accounts/{id}` - Get account
- `GET /customers/{custId}/accounts/{acctId}` - Get specific account

### Transactions
- `POST /accounts/{id}/transactions` - Create transaction
- `GET /accounts/{id}/transactions` - List transactions

## Technology Stack

- NestJS
- TypeScript
- Prisma
- SQLite
- Swagger

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

4. Access the API at `http://localhost:3000`
5. View Swagger documentation at `http://localhost:3000/api`

## Development

- `npm run start` - Start production server
- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run test` - Run tests