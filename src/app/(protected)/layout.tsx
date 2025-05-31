import AppShell from "@/components/custom/app-shell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
