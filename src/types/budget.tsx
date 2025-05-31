export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  category: string;
  notes?: string;
}
