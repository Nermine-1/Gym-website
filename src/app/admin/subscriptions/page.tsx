"use client";

import { useAdminMembers, useCancelSubscription } from "@/hooks/use-admin-auth";
import { Member } from "@/lib/api";
import { PLANS_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Ban, XCircle } from "lucide-react";
import { useState } from "react";

export default function SubscriptionsPage() {
  const { data, isLoading, isError } = useAdminMembers();
  const cancelSubscription = useCancelSubscription();
  
  const [confirmCancel, setConfirmCancel] = useState<{
    isOpen: boolean;
    memberId: number | null;
    memberName: string;
  }>({
    isOpen: false,
    memberId: null,
    memberName: "",
  });

  // Filter only members with active subscriptions
  const activeSubscriptions = data?.members.filter(
    (member) => member.plan !== "-"
  );

  const handleCancelSubscription = (member: Member) => {
    setConfirmCancel({
      isOpen: true,
      memberId: member.id,
      memberName: member.full_name,
    });
  };

  const confirmCancelSubscription = () => {
    if (!confirmCancel.memberId) return;
    
    cancelSubscription.mutate(confirmCancel.memberId);
    setConfirmCancel((prev) => ({ ...prev, isOpen: false }));
  };

  // Get plan color class based on plan name
  const getPlanColor = (planName: string) => {
    const plan = PLANS_DATA.find(p => p.name === planName);
    if (plan?.popular) return "bg-accent/20 text-accent-foreground ring-1 ring-inset ring-accent/30";
    return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage active member subscriptions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>
            View and manage current member subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <XCircle className="h-12 w-12 text-destructive opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Failed to load subscriptions</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                There was an error loading the subscriptions. Please try again.
              </p>
            </div>
          ) : activeSubscriptions && activeSubscriptions.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSubscriptions.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.full_name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPlanColor(member.plan)}`}>
                          {member.plan}
                        </span>
                      </TableCell>
                      <TableCell>
                        {typeof member.price === 'number'
                          ? new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                            }).format(member.price)
                          : member.price}
                      </TableCell>
                      <TableCell>
                        {new Date(member.join_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelSubscription(member)}
                          className="h-8 text-amber-500 border-amber-500 hover:bg-amber-500/10"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No active subscriptions found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog 
        open={confirmCancel.isOpen} 
        onOpenChange={(open) => setConfirmCancel(prev => ({ ...prev, isOpen: open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the subscription for {confirmCancel.memberName}?
              This action will immediately end their current plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelSubscription}
              className="bg-amber-500 hover:bg-amber-600"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
