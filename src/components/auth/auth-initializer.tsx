'use client';

import { useCurrentUser } from '@/hooks/use-auth';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  // This component will attempt to fetch the current user data on initial load
  useCurrentUser();
  
  return <>{children}</>;
}
