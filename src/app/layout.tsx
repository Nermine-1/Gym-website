"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import AuthInitializer from "@/components/auth/auth-initializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-background">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthInitializer>
              <Navbar />
              <main className="flex-grow pt-20">{children}</main>
              <Footer />
              <AuthModal /> <Toaster />
            </AuthInitializer>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
