"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export interface AdminUser {
  username: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  setAdmin: (admin: AdminUser | null) => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: null,
  isLoading: true,
  setAdmin: () => {},
  isAuthenticated: false,
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdminState] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check for admin in localStorage on initial load
    const storedAdmin = localStorage.getItem('gymAdmin');
    if (storedAdmin) {
      try {
        setAdminState(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('gymAdmin');
      }
    }
    setIsLoading(false);
  }, []);

  const setAdmin = (newAdmin: AdminUser | null) => {
    setAdminState(newAdmin);
    if (newAdmin) {
      localStorage.setItem('gymAdmin', JSON.stringify(newAdmin));
      // Refresh admin-related queries when admin logs in
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminMembers'] });
    } else {
      localStorage.removeItem('gymAdmin');
      // Clear admin-related queries when admin logs out
      queryClient.removeQueries({ queryKey: ['adminStats'] });
      queryClient.removeQueries({ queryKey: ['adminMembers'] });
    }
  };

  return (
    <AdminAuthContext.Provider 
      value={{ 
        admin, 
        isLoading, 
        setAdmin, 
        isAuthenticated: !!admin 
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
