import { Roles } from "@/constants/enums/roles";

export interface ITransaction  {
  walletId: string;
  type: "credit" | "debit";
  amount: number;
  currency: string;
  description?: string;
  referenceType: "interview" | "payout" | "adjustment";
  referenceId?: string;
  createdAt: Date;
}

export interface IWallet  {
  userId: string;
  userType: Roles.COMPANY | Roles.INTERVIEWER;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  updatedAt: Date;
}