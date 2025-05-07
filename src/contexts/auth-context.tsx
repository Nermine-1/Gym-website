import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('gymUser');
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('gymUser');
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('gymUser', JSON.stringify(newUser));
      // Update the query cache with the new user
      queryClient.setQueryData(['currentUser'], { user: newUser });
    } else {
      localStorage.removeItem('gymUser');
      // Invalidate user-related queries when user logs out
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
