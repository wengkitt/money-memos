"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  transactions,
  wallets,
  categories,
  getWalletById,
  getCategoryById,
} from "@/data/mock-data";
import { format } from "date-fns";
import { Transaction } from "@/types";

const TRANSACTIONS_PER_PAGE = 5;

export function RecentTransactions() {
  const [showAll, setShowAll] = useState(false);

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, TRANSACTIONS_PER_PAGE);

  return (
    <Card className="col-span-4 lg:col-span-3 transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center">
        <div className="flex flex-col gap-1">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto gap-1"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Show Less
              </span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Show All
              </span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const wallet = getWalletById(transaction.walletId);
  const category = getCategoryById(transaction.category);

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
    <TableRow className="group cursor-pointer hover:bg-muted/50">
      <TableCell className="font-medium">
        {format(new Date(transaction.date), "MMM dd")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {getTransactionIcon(transaction.type)}
          {transaction.description}
        </div>
      </TableCell>
      <TableCell>
        {category && (
          <Badge
            variant="outline"
            style={{ borderColor: category.color, color: category.color }}
            className="bg-transparent font-normal"
          >
            {category.icon} {category.name}
          </Badge>
        )}
      </TableCell>
      <TableCell>{wallet?.name}</TableCell>
      <TableCell
        className={cn(
          "text-right font-medium",
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
      </TableCell>
    </TableRow>
  );
}
