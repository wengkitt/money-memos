"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowLeftRight,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { Transaction } from "@/types";

export function TransactionTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getWalletById(transaction.walletId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getCategoryById(transaction.category)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                Columns
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Date</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Description
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Category
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Wallet
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Amount
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Notes</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No transactions found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
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
        {format(new Date(transaction.date), "MMM dd, yyyy")}
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
