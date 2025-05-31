export type WalletType =
  | "checking"
  | "savings"
  | "credit"
  | "investment"
  | "cash"
  | "other";

export interface Wallet {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  currency: string;
  icon?: string;
  color?: string;
}
