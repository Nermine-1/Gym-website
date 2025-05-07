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

  const queryResult = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
    // Don't refetch the current user too often
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setUser(queryResult.data.user);
    } else if (queryResult.isError) {
      // If fetching the current user fails, we assume the user is not logged in
      setUser(null);
    }
  }, [queryResult.isSuccess, queryResult.isError, queryResult.data, setUser]);

  return queryResult;
};
