import { Transaction, Wallet, Budget, Category } from "@/types";

// Helper to create dates relative to current date
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Categories
export const categories: Category[] = [
  { id: "1", name: "Food & Dining", color: "#FF5722", icon: "🍔" },
  { id: "2", name: "Shopping", color: "#E91E63", icon: "🛍️" },
  { id: "3", name: "Transportation", color: "#2196F3", icon: "🚗" },
  { id: "4", name: "Entertainment", color: "#9C27B0", icon: "🎬" },
  { id: "5", name: "Housing", color: "#607D8B", icon: "🏠" },
  { id: "6", name: "Utilities", color: "#FF9800", icon: "💡" },
  { id: "7", name: "Health", color: "#4CAF50", icon: "🏥" },
  { id: "8", name: "Salary", color: "#00BCD4", icon: "💼" },
  { id: "9", name: "Investments", color: "#8BC34A", icon: "📈" },
  { id: "10", name: "Other", color: "#9E9E9E", icon: "📝" },
];

// Wallets
export const wallets: Wallet[] = [
  {
    id: "1",
    name: "Checking Account",
    type: "checking",
    balance: 2456.78,
    currency: "USD",
    color: "#2196F3",
    icon: "💳",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "savings",
    balance: 12456.78,
    currency: "USD",
    color: "#9C27B0",
    icon: "🏦",
  },
  {
    id: "3",
    name: "Investment Account",
    type: "investment",
    balance: 24456.78,
    currency: "USD",
    color: "#4CAF50",
    icon: "📊",
  },
  {
    id: "4",
    name: "Credit Card",
    type: "credit",
    balance: -1250.34,
    currency: "USD",
    color: "#F44336",
    icon: "💰",
  },
];

// Transactions
export const transactions: Transaction[] = [
  {
    id: "1",
    date: daysAgo(1),
    amount: 85.43,
    description: "Grocery Shopping",
    type: "expense",
    category: "1", // Food & Dining
    walletId: "1", // Checking Account
    notes: "Weekly groceries from Trader Joe's",
  },
  {
    id: "2",
    date: daysAgo(2),
    amount: 35.99,
    description: "Gas Station",
    type: "expense",
    category: "3", // Transportation
    walletId: "4", // Credit Card
  },
  {
    id: "3",
    date: daysAgo(3),
    amount: 4500,
    description: "Salary Deposit",
    type: "income",
    category: "8", // Salary
    walletId: "1", // Checking Account
    notes: "Monthly salary payment",
  },
  {
    id: "4",
    date: daysAgo(3),
    amount: 1000,
    description: "Transfer to Savings",
    type: "transfer",
    category: "10", // Other
    walletId: "1", // Checking Account
    notes: "Monthly savings transfer",
  },
  {
    id: "5",
    date: daysAgo(4),
    amount: 129.99,
    description: "Amazon Purchase",
    type: "expense",
    category: "2", // Shopping
    walletId: "4", // Credit Card
    notes: "New headphones",
  },
  {
    id: "6",
    date: daysAgo(5),
    amount: 59.99,
    description: "Streaming Subscriptions",
    type: "expense",
    category: "4", // Entertainment
    walletId: "1", // Checking Account
  },
  {
    id: "7",
    date: daysAgo(7),
    amount: 1250.0,
    description: "Rent Payment",
    type: "expense",
    category: "5", // Housing
    walletId: "1", // Checking Account
  },
  {
    id: "8",
    date: daysAgo(8),
    amount: 42.5,
    description: "Restaurant Dinner",
    type: "expense",
    category: "1", // Food & Dining
    walletId: "4", // Credit Card
    notes: "Dinner with friends",
  },
  {
    id: "9",
    date: daysAgo(10),
    amount: 200.0,
    description: "Freelance Work",
    type: "income",
    category: "8", // Salary
    walletId: "1", // Checking Account
    notes: "Logo design for client",
  },
  {
    id: "10",
    date: daysAgo(12),
    amount: 89.99,
    description: "Internet Bill",
    type: "expense",
    category: "6", // Utilities
    walletId: "1", // Checking Account
  },
];

// Budgets
export const budgets: Budget[] = [
  {
    id: "1",
    name: "Groceries",
    amount: 500,
    spent: 345.67,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    category: "1", // Food & Dining
    notes: "Monthly grocery budget",
  },
  {
    id: "2",
    name: "Entertainment",
    amount: 200,
    spent: 175.5,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    category: "4", // Entertainment
  },
  {
    id: "3",
    name: "Transportation",
    amount: 300,
    spent: 175.45,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    category: "3", // Transportation
  },
  {
    id: "4",
    name: "Dining Out",
    amount: 400,
    spent: 410.33,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    category: "1", // Food & Dining
    notes: "Over budget this month",
  },
];

// Helper functions
export const getWalletById = (id: string): Wallet | undefined => {
  return wallets.find((wallet) => wallet.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

export const getTransactionsByWalletId = (walletId: string): Transaction[] => {
  return transactions.filter(
    (transaction) => transaction.walletId === walletId
  );
};

export const getBudgetStatus = (
  budget: Budget
): "on-track" | "warning" | "over-budget" => {
  const percentSpent = (budget.spent / budget.amount) * 100;
  if (percentSpent > 100) return "over-budget";
  if (percentSpent > 75) return "warning";
  return "on-track";
};

export const getMonthlyIncome = (): number => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        t.type === "income" &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getMonthlyExpenses = (): number => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        t.type === "expense" &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getTotalNetWorth = (): number => {
  return wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
};
