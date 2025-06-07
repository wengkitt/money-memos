import { ModeToggle } from "@/components/ui/mode-toggle";
import { auth } from "@/lib/auth";
import { ScrollText, Wallet } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50">
        <div className="mx-auto px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary icon-glow" />
            <h1 className="text-xl font-bold text-glow">Money Memos</h1>
          </Link>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-4 md:py-0 px-10">
        <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Money Memos
          </p>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built with ❤️ by Weng Kitt
          </p>
        </div>
      </footer>
    </div>
  );
}
