"use client";

import { useAdminDashboardStats } from "@/hooks/use-admin-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, CreditCard, DollarSign, CalendarClock } from "lucide-react";
import {
  RevenueByPlanChart,
  MembershipDistributionChart,
  MonthlyRevenueChart,
} from "@/components/admin/dashboard-charts";
import { useMemo } from "react";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useAdminDashboardStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for Revenue by Plan chart
  const revenueByPlanData = useMemo(() => {
    if (!stats) return [];

    // This would normally come from the backend
    // For this example, we'll create some sample data
    return [
      { plan: "7 Days", value: 10000 },
      { plan: "1 Month", value: 35000 },
      { plan: "3 Months", value: 42000 },
      { plan: "1 Year", value: 63000 },
    ];
  }, [stats]);

  // Prepare data for Membership Distribution chart
  const membershipDistributionData = useMemo(() => {
    if (!stats) return [];

    // This would normally come from the backend
    // For this example, we'll create some sample data
    return [
      { plan: "7 Days", value: 35 },
      { plan: "1 Month", value: 50 },
      { plan: "3 Months", value: 20 },
      { plan: "1 Year", value: 15 },
    ];
  }, [stats]);

  // Prepare data for Monthly Revenue chart
  const monthlyRevenueData = useMemo(() => {
    if (!stats) return [];

    // This would normally come from the backend
    // For this example, we'll create some sample data
    return [
      { month: "Jan", revenue: 15000 },
      { month: "Feb", revenue: 18000 },
      { month: "Mar", revenue: 22000 },
      { month: "Apr", revenue: 25000 },
      { month: "May", revenue: 30000 },
      { month: "Jun", revenue: 28000 },
    ];
  }, [stats]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your gym's performance and metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Members Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : isError ? (
              <p className="text-destructive text-sm">Error loading data</p>
            ) : (
              <div className="text-2xl font-bold">
                {stats?.total_members || 0}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Subscriptions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : isError ? (
              <p className="text-destructive text-sm">Error loading data</p>
            ) : (
              <div className="text-2xl font-bold">
                {stats?.active_subscriptions || 0}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : isError ? (
              <p className="text-destructive text-sm">Error loading data</p>
            ) : (
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.total_revenue || 0)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Revenue Per User */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Avg. Revenue Per Member
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : isError ? (
              <p className="text-destructive text-sm">Error loading data</p>
            ) : (
              <div className="text-2xl font-bold">
                {stats?.active_subscriptions
                  ? formatCurrency(
                      stats.total_revenue / stats.active_subscriptions
                    )
                  : formatCurrency(0)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Visualization Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <MembershipDistributionChart data={membershipDistributionData} />
        <RevenueByPlanChart data={revenueByPlanData} />
      </div>

      <MonthlyRevenueChart data={monthlyRevenueData} />

      {/* Recent Registrations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
          <CardDescription>
            Latest members who have subscribed to a plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <p className="text-destructive">
              Error loading recent registrations
            </p>
          ) : stats?.recent_registrations &&
            stats.recent_registrations.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
                <div>Name</div>
                <div>Plan</div>
                <div>Date</div>
                <div>Amount</div>
              </div>
              <div className="space-y-2">
                {stats.recent_registrations.map((registration, index) => (
                  <div key={index} className="grid grid-cols-4 text-sm">
                    <div className="font-medium">{registration.full_name}</div>
                    <div>{registration.plan}</div>
                    <div>
                      {new Date(registration.date).toLocaleDateString()}
                    </div>
                    <div>{formatCurrency(registration.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No recent registrations found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
