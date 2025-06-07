"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgets, getBudgetStatus, getCategoryById } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Budget } from "@/types";
import { format } from "date-fns";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export function BudgetCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}

function BudgetCard({ budget }: { budget: Budget }) {
  const category = getCategoryById(budget.category);
  const percentSpent = Math.min(
    Math.round((budget.spent / budget.amount) * 100),
    100
  );
  const status = getBudgetStatus(budget);

  // Calculate remaining amount and days
  const remaining = budget.amount - budget.spent;
  const startDate = new Date(budget.startDate);
  const endDate = new Date(budget.endDate);

  // Format date range
  const dateRange = `${format(startDate, "MMM d")} - ${format(
    endDate,
    "MMM d, yyyy"
  )}`;

  // Determine progress bar color based on status
  // const getProgressColor = (status: string) => {
  //   switch (status) {
  //     case "on-track":
  //       return "bg-emerald-600";
  //     case "warning":
  //       return "bg-amber-600";
  //     case "over-budget":
  //       return "bg-rose-600";
  //     default:
  //       return "";
  //   }
  // };

  // Badge for budget status
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
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {category?.icon && <span>{category.icon}</span>}
              {budget.name}
            </CardTitle>
            <CardDescription>{dateRange}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Budget Progress</div>
          {getStatusBadge(status)}
        </div>
        <Progress
          value={percentSpent}
          className={cn(
            "h-2",
            status === "over-budget"
              ? "bg-rose-100 dark:bg-rose-950"
              : status === "warning"
              ? "bg-amber-100 dark:bg-amber-950"
              : "bg-emerald-100 dark:bg-emerald-950"
          )}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-sm font-medium">Spent</div>
            <div className="text-2xl font-bold">
              ${budget.spent.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              of ${budget.amount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Remaining</div>
            <div
              className={cn(
                "text-2xl font-bold",
                remaining >= 0 ? "text-emerald-600" : "text-rose-600"
              )}
            >
              ${Math.abs(remaining).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {percentSpent}% used
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Edit className="h-3.5 w-3.5" />
          <span>Edit</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-full gap-2">
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
