"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plan } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

interface PlanConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

export function PlanConfirmationDialog({
  isOpen,
  onClose,
  plan,
}: PlanConfirmationDialogProps) {
  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">
            Subscription Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center">
            You have successfully subscribed to the {plan.name} plan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border border-muted rounded-lg p-4 bg-muted/30">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Plan:</span>
            <span>{plan.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Price:</span>
            <span>
              {plan.price}
              {plan.priceDetails}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Start Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div>
            <span>
              Make sure to visit us to complete your payment and get started
              with your plan.
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
