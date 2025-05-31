"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Wallet,
  Receipt,
  LineChart,
  PlusCircle,
  FileText,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { ScrollArea } from "@/components/ui/scroll-area";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside
          className={cn(
            "hidden border-r bg-background lg:block transition-all duration-300",
            isCollapsed ? "w-[4.5rem]" : "w-[240px]"
          )}
        >
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center justify-between px-4">
              {!isCollapsed && (
                <p className="flex items-center gap-2 font-semibold">
                  <CircleDollarSign className="h-6 w-6" />
                  <span>Money Memos</span>
                </p>
              )}
              {isCollapsed && (
                <Link
                  href="/"
                  className="flex items-center justify-center w-full"
                >
                  <CircleDollarSign className="h-6 w-6" />
                </Link>
              )}
            </div>
            <div className={cn("px-4", isCollapsed && "flex justify-center")}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={cn(
                        "w-full justify-start gap-2",
                        isCollapsed && "justify-center px-0"
                      )}
                      size="sm"
                    >
                      <PlusCircle className="h-4 w-4" />
                      {!isCollapsed && <span>New Transaction</span>}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>New Transaction</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
            <ScrollArea className="flex-1">
              <div className="px-2">
                <nav className="flex flex-col gap-2 px-2 py-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/"
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === "/" ? "bg-accent" : "transparent",
                            isCollapsed && "justify-center px-0"
                          )}
                        >
                          <Home className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>Dashboard</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>Dashboard</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/wallets"
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === "/wallets"
                              ? "bg-accent"
                              : "transparent",
                            isCollapsed && "justify-center px-0"
                          )}
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>Wallets</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>Wallets</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/transactions"
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === "/transactions"
                              ? "bg-accent"
                              : "transparent",
                            isCollapsed && "justify-center px-0"
                          )}
                        >
                          <Receipt className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>Transactions</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>Transactions</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/budgets"
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === "/budgets"
                              ? "bg-accent"
                              : "transparent",
                            isCollapsed && "justify-center px-0"
                          )}
                        >
                          <LineChart className="mr-2 h-4 w-4" />
                          {!isCollapsed && <span>Budgets</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>Budgets</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </nav>

                {!isCollapsed && (
                  <>
                    <Separator />
                    <div className="py-4 px-2">
                      <h4 className="px-3 text-sm font-medium">Wallets</h4>
                      <div className="space-y-1 pt-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal gap-2"
                          size="sm"
                        >
                          <Wallet className="h-4 w-4 text-blue-500" />
                          <span>Checking</span>
                          <span className="ml-auto">$2,456</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal gap-2"
                          size="sm"
                        >
                          <Wallet className="h-4 w-4 text-purple-500" />
                          <span>Savings</span>
                          <span className="ml-auto">$12,456</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal gap-2"
                          size="sm"
                        >
                          <Wallet className="h-4 w-4 text-green-500" />
                          <span>Investment</span>
                          <span className="ml-auto">$24,456</span>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="py-4 px-2">
                      <h4 className="px-3 text-sm font-medium">Quick Pages</h4>
                      <div className="space-y-1 pt-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal gap-2"
                          size="sm"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Monthly Goals</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal gap-2"
                          size="sm"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Savings Plan</span>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="ml-auto"
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-all",
                    isCollapsed ? "rotate-180" : ""
                  )}
                />
                <span className="sr-only">
                  {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                </span>
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6 md:py-8 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
