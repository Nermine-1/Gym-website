"use client";

import { useAuthModal } from "@/hooks/use-auth-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, UserPlus, LogIn } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSignIn, useSignUp } from "@/hooks/use-auth";

export function AuthModal() {
  const { isOpen, closeModal, isSignIn: initialIsSignIn, toggleView: globalToggleView } = useAuthModal();
  const { toast } = useToast();
  
  // Local state for Tabs component to ensure it's controlled and updates with global state
  const [activeTab, setActiveTab] = useState(initialIsSignIn ? "signin" : "signup");

  // React Query mutations
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  
  // Determine if any mutation is loading
  const isLoading = signInMutation.isPending || signUpMutation.isPending;

  useEffect(() => {
    setActiveTab(initialIsSignIn ? "signin" : "signup");
  }, [initialIsSignIn, isOpen]);


  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (activeTab === "signin") {
      // Get form values for sign in
      const email = (e.currentTarget.querySelector('#email-signin') as HTMLInputElement).value;
      const password = (e.currentTarget.querySelector('#password-signin') as HTMLInputElement).value;
      
      signInMutation.mutate({ email, password });
    } else {
      // Get form values for sign up
      const fullName = (e.currentTarget.querySelector('#name-signup') as HTMLInputElement).value;
      const email = (e.currentTarget.querySelector('#email-signup') as HTMLInputElement).value;
      const password = (e.currentTarget.querySelector('#password-signup') as HTMLInputElement).value;
      
      signUpMutation.mutate({ fullName, email, password });
    }
  };

  const handleTabChange = (value: string) => {
    if ((value === "signin" && activeTab === "signup") || (value === "signup" && activeTab === "signin")) {
      globalToggleView();
    }
    setActiveTab(value);
  };
  
  const currentViewIsSignIn = activeTab === "signin";


  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-background/80 backdrop-blur-xl border-primary/30 shadow-2xl rounded-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="p-6 pb-4 items-center text-center">
            <Dumbbell className="h-12 w-12 text-primary mb-2" />
            <DialogTitle className="text-2xl font-bold text-foreground">
              {currentViewIsSignIn ? "Welcome Back to" : "Join"} {SITE_NAME}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {currentViewIsSignIn ? "Enter your credentials to access your account." : "Create an account to start your fitness journey."}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 mx-6 mb-2" style={{width: 'calc(100% - 48px)'}}>
              <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </TabsTrigger>
            </TabsList>
            
            <motion.div
                key={activeTab} // Key change triggers animation
                initial={{ opacity: 0, x: currentViewIsSignIn ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentViewIsSignIn ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-6 pb-6 pt-2"
              >
              <TabsContent value="signin" className="mt-0 space-y-4">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" type="email" placeholder="you@example.com" required className="bg-background/70 focus:bg-background" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-signin">Password</Label>
                    <Input id="password-signin" type="password" placeholder="••••••••" required className="bg-background/70 focus:bg-background" />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {signInMutation.isPending ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0 space-y-4">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name-signup">Full Name</Label>
                    <Input id="name-signup" placeholder="Your Name" required className="bg-background/70 focus:bg-background"/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="you@example.com" required className="bg-background/70 focus:bg-background"/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" placeholder="Create a strong password" required className="bg-background/70 focus:bg-background"/>
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {signUpMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </motion.div>
          </Tabs>
          
          <div className="p-6 pt-0 text-center text-sm">
            <Button variant="link" onClick={() => handleTabChange(currentViewIsSignIn ? "signup" : "signin")} className="text-primary hover:text-accent">
              {currentViewIsSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
