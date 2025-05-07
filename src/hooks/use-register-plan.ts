"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "./use-toast";
import { authApi, PlanRegistrationData } from "@/lib/api";
import { useAuthModal } from "./use-auth-modal";

export const useRegisterPlan = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { openModal } = useAuthModal();

  return useMutation({
    mutationFn: (planData: Omit<PlanRegistrationData, "user_id">) => {
      if (!user) {
        throw new Error("You must be logged in to register for a plan");
      }
      
      const data: PlanRegistrationData = {
        ...planData,
        user_id: user.id,
      };
      
      return authApi.registerPlan(data);
    },
    onSuccess: () => {
      toast({
        title: "Plan Registered Successfully!",
        description: "Your subscription has been confirmed.",
      });
    },
    onError: (error: Error) => {
      if (error.message === "You must be logged in to register for a plan") {
        openModal(false);
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan.",
          variant: "default",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
};
