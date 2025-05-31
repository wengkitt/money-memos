export type TransactionType = "income" | "expense" | "transfer";

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  type: TransactionType;
  category: string;
  walletId: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}
