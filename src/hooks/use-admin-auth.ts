"use client";

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi, AdminSignInData } from '@/lib/api';
import { useAdminAuth } from '@/contexts/admin-auth-context';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

export const useAdminLogin = () => {
  const { toast } = useToast();
  const { setAdmin } = useAdminAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: AdminSignInData) => adminApi.login(data),
    onSuccess: (data) => {
      // Set admin in context
      setAdmin({ username: data.admin_username });
      
      toast({
        title: 'Admin Logged In',
        description: 'Welcome to the admin dashboard!',
      });
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: 'Admin Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useAdminLogout = () => {
  const { toast } = useToast();
  const { setAdmin } = useAdminAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: () => adminApi.logout(),
    onSuccess: () => {
      // Clear admin from context
      setAdmin(null);
      
      toast({
        title: 'Admin Logged Out',
        description: 'You have been logged out successfully.',
      });
      
      // Redirect to admin login
      router.push('/admin/login');
    },
    onError: (error: Error) => {
      toast({
        title: 'Logout Failed',
        description: error.message,
        variant: 'destructive',
      });
      
      // Even if server logout fails, we still clear local state
      setAdmin(null);
      router.push('/admin/login');
    },
  });
};

export const useAdminDashboardStats = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();

  return useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminApi.getDashboardStats(),
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error: Error) => {
      const isAuthError = error.message.includes('Unauthorized');
      
      toast({
        title: isAuthError ? 'Session Expired' : 'Error',
        description: isAuthError 
          ? 'Your session has expired. Please log in again.' 
          : `Failed to load dashboard stats: ${error.message}`,
        variant: 'destructive',
      });
      
      if (isAuthError) {
        router.push('/admin/login');
      }
    },
  });
};

export const useAdminMembers = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();

  return useQuery({
    queryKey: ['adminMembers'],
    queryFn: () => adminApi.getAllMembers(),
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
    onError: (error: Error) => {
      const isAuthError = error.message.includes('Unauthorized');
      
      toast({
        title: isAuthError ? 'Session Expired' : 'Error',
        description: isAuthError 
          ? 'Your session has expired. Please log in again.' 
          : `Failed to load members: ${error.message}`,
        variant: 'destructive',
      });
      
      if (isAuthError) {
        router.push('/admin/login');
      }
    },
  });
};

export const useDeleteMember = () => {
  const { toast } = useToast();
  const queryClient = useAdminQueryInvalidation();
  
  return useMutation({
    mutationFn: (memberId: number) => adminApi.deleteMember(memberId),
    onSuccess: () => {
      toast({
        title: 'Member Deleted',
        description: 'The member has been deleted successfully.',
      });
      
      // Refresh queries
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminMembers'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete member: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export const useCancelSubscription = () => {
  const { toast } = useToast();
  const queryClient = useAdminQueryInvalidation();
  
  return useMutation({
    mutationFn: (memberId: number) => adminApi.cancelSubscription(memberId),
    onSuccess: () => {
      toast({
        title: 'Subscription Cancelled',
        description: 'The subscription has been cancelled successfully.',
      });
      
      // Refresh queries
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminMembers'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to cancel subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export const useAdminMemberDetails = (memberId: number) => {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();

  return useQuery({
    queryKey: ['adminMemberDetails', memberId],
    queryFn: () => adminApi.getMemberDetails(memberId),
    enabled: isAuthenticated && !!memberId,
    retry: 1,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Helper to avoid code duplication
const useAdminQueryInvalidation = () => {
  const queryClient = useQueryClient();
  return queryClient;
};
