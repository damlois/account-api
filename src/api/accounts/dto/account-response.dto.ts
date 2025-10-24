export class AccountResponseDto {
  accountId: number;
  acctType: string;
  balance: number;
  status: string;
  custId: number;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string | null;
}
