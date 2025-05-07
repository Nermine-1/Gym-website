import AdminProtectedLayout from "@/components/admin/protected-layout";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}
