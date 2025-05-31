"use client";

import { wallets, getTransactionsByWalletId } from "@/data/mock-data";
import { formatDistanceToNow } from "date-fns";
import { Wallet } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  CreditCard,
  PiggyBank,
  Landmark,
  Briefcase,
  Banknote,
  MoreHorizontal,
} from "lucide-react";
import { WalletTransactions } from "./wallet-transactions";

export function WalletList() {
  const getWalletIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <CreditCard className="h-5 w-5" />;
      case "savings":
        return <PiggyBank className="h-5 w-5" />;
      case "investment":
        return <Briefcase className="h-5 w-5" />;
      case "credit":
        return <CreditCard className="h-5 w-5" />;
      case "cash":
        return <Banknote className="h-5 w-5" />;
      default:
        return <Landmark className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wallets.map((wallet) => (
        <WalletCard
          key={wallet.id}
          wallet={wallet}
          icon={getWalletIcon(wallet.type)}
        />
      ))}
    </div>
  );
}

function WalletCard({
  wallet,
  icon,
}: {
  wallet: Wallet;
  icon: React.ReactNode;
}) {
  const transactions = getTransactionsByWalletId(wallet.id);
  const lastTransaction = transactions[0];

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <div
              className="p-2 rounded-md"
              style={{
                backgroundColor: `${wallet.color}20`,
                color: wallet.color,
              }}
            >
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{wallet.name}</CardTitle>
              <CardDescription>
                <Badge
                  variant="outline"
                  className="mt-1 font-normal capitalize"
                >
                  {wallet.type}
                </Badge>
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">
            {wallet.balance < 0 ? "-" : ""}$
            {Math.abs(wallet.balance).toLocaleString()}
          </div>

          {transactions.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Last transaction:{" "}
              {formatDistanceToNow(new Date(lastTransaction.date), {
                addSuffix: true,
              })}
            </div>
          )}
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
