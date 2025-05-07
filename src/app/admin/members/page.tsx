"use client";

import { useAdminMembers, useDeleteMember, useCancelSubscription } from "@/hooks/use-admin-auth";
import { Member } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { 
  Ban, 
  CalendarRange, 
  Check, 
  ChevronsUpDown, 
  ExternalLink, 
  FilterX, 
  MoreHorizontal, 
  Search, 
  SlidersHorizontal, 
  Trash, 
  XCircle 
} from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const PLAN_OPTIONS = [
  { value: "", label: "All Plans" },
  { value: "7 Days", label: "7 Days" },
  { value: "1 Month", label: "1 Month" },
  { value: "3 Months", label: "3 Months" },
  { value: "1 Year", label: "1 Year" },
  { value: "-", label: "No Plan" },
];

export default function MembersPage() {
  const { data, isLoading, isError } = useAdminMembers();
  const members = data?.members || [];
  const deleteMember = useDeleteMember();
  const cancelSubscription = useCancelSubscription();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [planCommandOpen, setPlanCommandOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "cancel";
    memberId: number | null;
    memberName: string;
  }>({
    isOpen: false,
    type: "delete",
    memberId: null,
    memberName: "",
  });

  // Filter members based on all filters
  const filteredMembers = useMemo(() => {
    return members.filter((member: Member) => {
      // Text search filter
      const matchesSearch = 
        member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Plan filter
      const matchesPlan = selectedPlan === "" || member.plan === selectedPlan;
      
      // Date range filter
      let matchesDateRange = true;
      if (dateRange.from || dateRange.to) {
        const joinDate = new Date(member.join_date);
        if (dateRange.from && isValid(joinDate)) {
          matchesDateRange = matchesDateRange && isAfter(joinDate, dateRange.from);
        }
        if (dateRange.to && isValid(joinDate)) {
          matchesDateRange = matchesDateRange && isBefore(joinDate, dateRange.to);
        }
      }
      
      return matchesSearch && matchesPlan && matchesDateRange;
    });
  }, [members, searchTerm, dateRange, selectedPlan]);

  const handleAction = (type: "delete" | "cancel", member: Member) => {
    setConfirmDialog({
      isOpen: true,
      type,
      memberId: member.id,
      memberName: member.full_name,
    });
  };

  const confirmAction = () => {
    if (!confirmDialog.memberId) return;
    
    if (confirmDialog.type === "delete") {
      deleteMember.mutate(confirmDialog.memberId);
    } else {
      cancelSubscription.mutate(confirmDialog.memberId);
    }
    
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setSelectedPlan("");
  };

  const hasActiveFilters = !!selectedPlan || !!dateRange.from || !!dateRange.to;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <p className="text-muted-foreground">
          View and manage your gym members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
          <CardDescription>
            View all members and manage their accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              {/* Plan Filter */}
              <Popover open={planCommandOpen} onOpenChange={setPlanCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={planCommandOpen}
                    className="w-full sm:w-[180px] justify-between"
                  >
                    {selectedPlan
                      ? PLAN_OPTIONS.find((plan) => plan.value === selectedPlan)?.label
                      : "Filter by plan"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search plans..." />
                    <CommandEmpty>No plan found.</CommandEmpty>
                    <CommandGroup>
                      {PLAN_OPTIONS.map((plan) => (
                        <CommandItem
                          key={plan.value}
                          value={plan.value}
                          onSelect={(currentValue) => {
                            setSelectedPlan(currentValue === selectedPlan ? "" : currentValue);
                            setPlanCommandOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedPlan === plan.value ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {plan.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <CalendarRange className="mr-2 h-4 w-4" />
                    <span>Date Range</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset filters">
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedPlan && (
                <Badge variant="secondary" className="rounded-md">
                  Plan: {selectedPlan === "-" ? "No Plan" : selectedPlan}
                  <button
                    className="ml-1 rounded-full outline-none focus:ring-2"
                    onClick={() => setSelectedPlan("")}
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {dateRange.from && (
                <Badge variant="secondary" className="rounded-md">
                  From: {format(dateRange.from, "PP")}
                  <button
                    className="ml-1 rounded-full outline-none focus:ring-2"
                    onClick={() => setDateRange({ ...dateRange, from: undefined })}
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {dateRange.to && (
                <Badge variant="secondary" className="rounded-md">
                  To: {format(dateRange.to, "PP")}
                  <button
                    className="ml-1 rounded-full outline-none focus:ring-2"
                    onClick={() => setDateRange({ ...dateRange, to: undefined })}
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <XCircle className="h-12 w-12 text-destructive opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Failed to load members</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                There was an error loading the members list. Please try again.
              </p>
            </div>
          ) : filteredMembers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member: Member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.full_name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        {member.plan !== "-" ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {member.plan}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No Plan</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {member.join_date !== "-"
                          ? new Date(member.join_date).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/members/${member.id}`}>
                                <div className="flex w-full items-center">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Details
                                </div>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            {member.plan !== "-" && (
                              <DropdownMenuItem
                                onClick={() => handleAction("cancel", member)}
                                className="text-amber-500 focus:text-amber-500"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Cancel Subscription
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem
                              onClick={() => handleAction("delete", member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">
                {hasActiveFilters 
                  ? "No members match your filters" 
                  : searchTerm 
                    ? "No members found matching your search" 
                    : "No members found"}
              </p>
              {hasActiveFilters && (
                <Button variant="ghost" className="mt-2" onClick={resetFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

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
                ? `Are you sure you want to delete ${confirmDialog.memberName}? This action cannot be undone.`
                : `Are you sure you want to cancel the subscription for ${confirmDialog.memberName}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={confirmDialog.type === "delete" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {confirmDialog.type === "delete" ? "Delete" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
