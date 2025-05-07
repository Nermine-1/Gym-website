import AdminProtectedLayout from "@/components/admin/protected-layout";

export default function MemberDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}
