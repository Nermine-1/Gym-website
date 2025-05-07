"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  useAdminMemberDetails, 
  useCancelSubscription, 
  useDeleteMember 
} from "@/hooks/use-admin-auth";
import { Member } from "@/lib/api";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Ban, ChevronLeft, Trash, XCircle } from "lucide-react";

export default function MemberDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const memberId = parseInt(params.id as string);
  
  const { data, isLoading, isError } = useAdminMemberDetails(memberId);
  const deleteMember = useDeleteMember();
  const cancelSubscription = useCancelSubscription();
  
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "cancel";
  }>({
    isOpen: false,
    type: "delete",
  });
  
  const member = data?.member;
  
  const handleBack = () => {
    router.back();
  };
  
  const handleAction = (type: "delete" | "cancel") => {
    setConfirmDialog({
      isOpen: true,
      type,
    });
  };
  
  const confirmAction = () => {
    if (confirmDialog.type === "delete") {
      deleteMember.mutate(memberId, {
        onSuccess: () => {
          toast({
            title: "Member Deleted",
            description: "The member has been deleted successfully",
          });
          router.push("/admin/members");
        }
      });
    } else {
      cancelSubscription.mutate(memberId, {
        onSuccess: () => {
          toast({
            title: "Subscription Cancelled",
            description: "The subscription has been cancelled successfully",
          });
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      });
    }
  };
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <XCircle className="h-12 w-12 text-destructive opacity-50" />
        <h3 className="mt-4 text-lg font-medium">Failed to load member details</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          There was an error loading the member details. Please try again.
        </p>
        <Button className="mt-4" size="sm" onClick={handleBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="mb-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isLoading ? <Skeleton className="h-9 w-40" /> : member?.full_name}
          </h1>
          <p className="text-muted-foreground">
            {isLoading ? <Skeleton className="h-5 w-64 mt-1" /> : `Member details and activity`}
          </p>
        </div>
        
        <div className="flex gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </>
          ) : (
            <>
              {member?.plan !== "-" && (
                <Button 
                  variant="outline" 
                  onClick={() => handleAction("cancel")}
                  className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Subscription
                </Button>
              )}
              <Button 
                variant="destructive"
                onClick={() => handleAction("delete")}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Member
              </Button>
            </>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : member ? (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Member Information</CardTitle>
                <CardDescription>
                  Basic details about the member
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Full Name</div>
                  <div className="font-medium">{member.full_name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                  <div className="font-medium">{member.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Join Date</div>
                  <div className="font-medium">
                    {member.join_date !== "-" 
                      ? format(new Date(member.join_date), "PPP") 
                      : "Not available"}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Member ID</div>
                  <div className="font-medium">#{member.id}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Member's contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Email Address</div>
                  <div className="font-medium">{member.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Phone Number</div>
                  <div className="font-medium">{member.phone || "Not provided"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>
                  Information about the member's subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Current Plan</div>
                  <div className="font-medium">
                    {member.plan !== "-" ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {member.plan}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No active plan</span>
                    )}
                  </div>
                </div>
                
                {member.plan !== "-" && (
                  <>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Price</div>
                      <div className="font-medium">
                        {typeof member.price === 'number'
                          ? new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                            }).format(member.price)
                          : member.price}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Start Date</div>
                      <div className="font-medium">
                        {member.join_date !== "-" 
                          ? format(new Date(member.join_date), "PPP") 
                          : "Not available"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                      <div className="font-medium">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              {member.plan !== "-" && (
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction("cancel")}
                    className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Cancel Subscription
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Recent activity for this member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <p className="text-muted-foreground">No activity logs available yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <XCircle className="h-12 w-12 text-destructive opacity-50" />
          <h3 className="mt-4 text-lg font-medium">Member not found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The requested member does not exist or has been deleted.
          </p>
          <Button className="mt-4" onClick={handleBack}>
            Back to Members
          </Button>
        </div>
      )}
      
      <AlertDialog 
        open={confirmDialog.isOpen} 
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, isOpen: open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === "delete" 
                ? "Delete Member" 
                : "Cancel Subscription"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === "delete" 
                ? `Are you sure you want to delete this member? This action cannot be undone.`
                : `Are you sure you want to cancel this member's subscription? This action will immediately end their current plan.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={confirmDialog.type === "delete" 
                ? "bg-destructive hover:bg-destructive/90" 
                : "bg-amber-500 hover:bg-amber-600"}
            >
              {confirmDialog.type === "delete" ? "Delete" : "Cancel Subscription"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
