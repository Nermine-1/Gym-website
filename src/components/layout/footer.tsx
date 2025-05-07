"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 text-secondary-foreground border-t border-border/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="lg:col-span-2 xl:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <Dumbbell className="h-8 w-8" />
              <span>{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Forge your legend with state-of-the-art equipment, expert trainers, and a motivating community.
            </p>
          </div>

          <div className="xl:col-start-3">
            <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.Icon className="h-5 w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/60" />

        <div className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
