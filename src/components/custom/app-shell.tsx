"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/client";
import {
  LineChart,
  LogOut,
  PiggyBank,
  Receipt,
  ScrollText,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex flex-1">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center justify-between pt-3">
                <p className="flex items-center gap-2 font-semibold">
                  <ScrollText className="h-6 w-6" />
                  <span>Money Memos</span>
                </p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/"}
                      tooltip="Dashboard"
                    >
                      <Link href="/dashboard">
                        <LineChart className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/wallets"}
                      tooltip="Wallets"
                    >
                      <Link href="/wallets">
                        <Wallet className="h-4 w-4" />
                        <span>Wallets</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/transactions"}
                      tooltip="Transactions"
                    >
                      <Link href="/transactions">
                        <Receipt className="h-4 w-4" />
                        <span>Transactions</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/budgets"}
                      tooltip="Budgets"
                    >
                      <Link href="/budgets">
                        <PiggyBank className="h-4 w-4" />
                        <span>Budgets</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>Wallets</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="default">
                      <Wallet className="h-4 w-4 text-blue-500" />
                      <span>Checking</span>
                      <SidebarMenuBadge>$2,456</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="default">
                      <Wallet className="h-4 w-4 text-purple-500" />
                      <span>Savings</span>
                      <SidebarMenuBadge>$12,456</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="default">
                      <Wallet className="h-4 w-4 text-green-500" />
                      <span>Investment</span>
                      <SidebarMenuBadge>$24,456</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="default" onClick={handleSignOut}>
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 overflow-auto">
            <header className="flex items-center justify-between px-4 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="ml-auto" />
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
              </div>
            </header>
            <main className="px-5">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
