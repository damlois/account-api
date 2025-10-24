import { Module } from '@nestjs/common';
import { CustomersModule } from '../api/customers/customers.module';
import { AccountsModule } from '../api/accounts/accounts.module';
import { TransactionsModule } from '../api/transactions/transactions.module';
import { PrismaService } from '../prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CustomersModule, AccountsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
