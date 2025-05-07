import AdminProtectedLayout from "@/components/admin/protected-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}
