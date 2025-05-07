"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { useAdminLogout } from "@/hooks/use-admin-auth";
import { Dumbbell, Users, LayoutDashboard, LogOut, Database } from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/admin/members",
    icon: Users,
  },
  {
    title: "Subscriptions",
    href: "/admin/subscriptions", 
    icon: Database,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const adminLogout = useAdminLogout();

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-muted/40 p-4 w-64">
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <Dumbbell className="h-6 w-6 text-primary" />
          <div className="font-bold text-lg text-primary">{SITE_NAME} Admin</div>
        </div>
        <div className="py-2">
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start text-muted-foreground"
        onClick={() => adminLogout.mutate()}
        disabled={adminLogout.isPending}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {adminLogout.isPending ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
}
