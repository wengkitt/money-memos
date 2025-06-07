"use client";

import { BudgetCards } from "@/components/budget";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Manage your spending and saving goals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Budget</span>
          </Button>
        </div>
      </div>

      <BudgetCards />
    </div>
  );
}
