import {
  BudgetOverview,
  OverviewCards,
  RecentTransactions,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your financial health
        </p>
      </div>

      <OverviewCards />

      <div className="grid gap-4 grid-cols-4">
        <RecentTransactions />
        <BudgetOverview />
      </div>
    </div>
  );
}
