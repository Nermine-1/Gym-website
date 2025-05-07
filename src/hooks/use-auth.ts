import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi, SignInData, SignUpData } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useAuthModal } from "./use-auth-modal";
import { useToast } from "./use-toast";

export const useSignUp = () => {
  const { toast } = useToast();
  const { closeModal, toggleView: globalToggleView } = useAuthModal();

  return useMutation({
    mutationFn: (data: SignUpData) => authApi.signup(data),
    onSuccess: () => {
      toast({
        title: "Account Created!",
        description: "Your account is ready. Please sign in.",
      });
      closeModal();
      globalToggleView(); // Switch to sign-in view
    },
    onError: (error: Error) => {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useSignIn = () => {
  const { toast } = useToast();
  const { closeModal } = useAuthModal();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: SignInData) => authApi.login(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast({
        title: "Signed In Successfully!",
        description: "Welcome back!",
      });
      closeModal();
    },
    onError: (error: Error) => {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useLogout = () => {
  const { toast } = useToast();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setUser(null);
      toast({
        title: "Logged Out Successfully",
        description: "You have been logged out of your account.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
      // Even if server logout fails, we still clear local state
      setUser(null);
    },
  });
};
export const useCurrentUser = () => {
  const { setUser } = useAuth();

  return {};
};
