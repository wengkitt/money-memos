"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgets, getBudgetStatus, getCategoryById } from "@/data/mock-data";
import { Budget } from "@/types/budget";

export function BudgetOverview() {
  return (
    <Card className="col-span-4 lg:col-span-1 transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>
          Your current month&apos;s budget progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </CardContent>
    </Card>
  );
}

function BudgetItem({ budget }: { budget: Budget }) {
  const category = getCategoryById(budget.category);
  const percentSpent = Math.min(
    Math.round((budget.spent / budget.amount) * 100),
    100
  );
  const status = getBudgetStatus(budget);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-track":
        return (
          <Badge
            variant="outline"
            className="bg-transparent text-emerald-600 border-emerald-600"
          >
            On Track
          </Badge>
        );
      case "warning":
        return (
          <Badge
            variant="outline"
            className="bg-transparent text-amber-600 border-amber-600"
          >
            Warning
          </Badge>
        );
      case "over-budget":
        return (
          <Badge
            variant="outline"
            className="bg-transparent text-rose-600 border-rose-600"
          >
            Over Budget
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{category?.icon}</span>
          <span className="font-medium">{budget.name}</span>
        </div>
        {getStatusBadge(status)}
      </div>
      <Progress
        value={percentSpent}
        className={`h-2 ${
          status === "over-budget"
            ? "bg-rose-100 dark:bg-rose-950"
            : status === "warning"
            ? "bg-amber-100 dark:bg-amber-950"
            : "bg-emerald-100 dark:bg-emerald-950"
        }`}
      />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          ${budget.spent.toLocaleString()} of ${budget.amount.toLocaleString()}
        </span>
        <span
          className={`font-medium ${
            status === "over-budget"
              ? "text-rose-600"
              : status === "warning"
              ? "text-amber-600"
              : "text-emerald-600"
          }`}
        >
          {percentSpent}%
        </span>
      </div>
    </div>
  );
}
