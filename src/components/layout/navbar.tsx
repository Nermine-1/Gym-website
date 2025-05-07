"use client";

import Link from "next/link";
import { Dumbbell, Menu, LogOut, User } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLogout } from "@/hooks/use-auth";

export function Navbar() {
  const authModal = useAuthModal();
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const logoutMutation = useLogout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-accent transition-colors">
          <Dumbbell className="h-8 w-8" />
          <span>{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.full_name.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => authModal.openModal(true)} className="border-primary text-primary hover:bg-primary/10">
                Sign In
              </Button>
              <Button onClick={() => authModal.openModal(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background/90 backdrop-blur-md p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <Dumbbell className="h-8 w-8" />
                    <span>{SITE_NAME}</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {NAV_LINKS.map((link) => (
                     <SheetClose asChild key={link.href}>
                        <Link
                        href={link.href}
                        className="text-lg text-foreground/80 hover:text-primary hover:bg-muted/50 p-3 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-6 border-t border-border flex flex-col gap-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.full_name.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link href="/profile">
                          <Button variant="outline" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={handleLogout} className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={() => { authModal.openModal(true); setIsMobileMenuOpen(false); }} className="w-full border-primary text-primary hover:bg-primary/10">
                          Sign In
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button onClick={() => { authModal.openModal(false); setIsMobileMenuOpen(false); }} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          Sign Up
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
