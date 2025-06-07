import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMonthlyExpenses,
  getMonthlyIncome,
  getTotalNetWorth,
} from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";

export function OverviewCards() {
  const netWorth = getTotalNetWorth();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Total across all accounts
          </p>
        </CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            ${monthlyIncome.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Current month</p>
        </CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Expenses
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-600">
            ${monthlyExpenses.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Current month</p>
        </CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Balance</CardTitle>
          <DollarSign
            className={cn(
              "h-4 w-4",
              monthlyBalance >= 0 ? "text-emerald-500" : "text-rose-500"
            )}
          />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-2xl font-bold",
              monthlyBalance >= 0 ? "text-emerald-600" : "text-rose-600"
            )}
          >
            ${Math.abs(monthlyBalance).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {monthlyBalance >= 0 ? "Positive balance" : "Negative balance"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
