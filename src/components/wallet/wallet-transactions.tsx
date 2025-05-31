"use client";

import { format } from "date-fns";
import { Transaction } from "@/types";
import { ArrowDownRight, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { getCategoryById } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WalletTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return <p className="text-sm text-muted-foreground">No transactions yet</p>;
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
      case "expense":
        return <ArrowDownRight className="h-4 w-4 text-rose-500" />;
      case "transfer":
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 mt-2">
      {transactions.slice(0, 3).map((transaction) => {
        const category = getCategoryById(transaction.category);

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-2 border-b last:border-0 text-sm"
          >
            <div className="flex items-center gap-2">
              {getTransactionIcon(transaction.type)}
              <div>
                <div>{transaction.description}</div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {category && (
                <Badge
                  variant="outline"
                  style={{ borderColor: category.color, color: category.color }}
                  className="bg-transparent font-normal text-xs"
                >
                  {category.name}
                </Badge>
              )}
              <span
                className={cn(
                  "font-medium",
                  transaction.type === "income"
                    ? "text-emerald-600"
                    : transaction.type === "expense"
                    ? "text-rose-600"
                    : ""
                )}
              >
                {transaction.type === "expense"
                  ? "−"
                  : transaction.type === "income"
                  ? "+"
                  : ""}
                ${transaction.amount.toLocaleString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
