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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plan } from "@/lib/constants";
import { FormEvent, useState } from "react";

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contactInfo: string) => void;
  plan: Plan | null;
}

export function ContactFormDialog({
  isOpen,
  onClose,
  onSubmit,
  plan,
}: ContactFormDialogProps) {
  const [contactNumber, setContactNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!plan) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!contactNumber.trim()) {
      setError("Please enter your contact number");
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit the form
    onSubmit(contactNumber);
    
    // Reset form
    setContactNumber("");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Almost There!</DialogTitle>
          <DialogDescription>
            Please provide your contact information to complete your subscription to the {plan.name} plan.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                placeholder="+1 (555) 000-0000"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                  setError("");
                }}
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Selected Plan:</span>
              <span>{plan.name}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Price:</span>
              <span>{plan.price}{plan.priceDetails}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Subscribe Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
