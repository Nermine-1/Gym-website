import AdminProtectedLayout from "@/components/admin/protected-layout";

export default function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}
