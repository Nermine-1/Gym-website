"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLogout } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const logoutMutation = useLogout();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogout = () => {
    logoutMutation.mutate();
    router.push('/');
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
      
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user.full_name.split(' ').map(name => name[0]).join('')}
            </div>
            <div>
              <CardTitle className="text-2xl">{user.full_name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Member
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Full Name</div>
                  <div className="font-medium">{user.full_name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Email Address</div>
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                  <div className="font-medium">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-border pt-6 flex justify-between flex-wrap gap-4">
          <Button variant="outline" className="flex-1 md:flex-none">
            Edit Profile
          </Button>
          <Button variant="destructive" className="flex-1 md:flex-none" onClick={handleLogout}>
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
