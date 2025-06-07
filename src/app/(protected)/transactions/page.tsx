"use client";

import { TransactionTable } from "@/components/transaction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  DownloadCloud,
  FileText,
  Filter,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Track your financial activities
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter Transactions</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>Sort Transactions</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  <span>Export Data</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Generate Report</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Transaction</span>
          </Button>
        </div>
      </div>

      <TransactionTable />
    </div>
  );
}
