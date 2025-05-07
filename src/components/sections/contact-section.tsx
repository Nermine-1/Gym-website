"use client";

import React, { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONTACT_INFO } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const detailsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
  },
};

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <AnimatedSection
      id="contact"
      className="bg-secondary/30"
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary drop-shadow-sm"
          variants={itemVariants}
        >
          Get In Touch
        </motion.h2>

        <div className="flex items-center justify-center gap-8">
          <motion.div className="space-y-6" variants={detailsVariants}>
            <h3 className="text-2xl font-semibold text-foreground">
              Our Contact Details
            </h3>
            <p className="text-muted-foreground">
              Feel free to reach out through any of these channels. We're always
              happy to help!
            </p>
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <motion.a
                  key={info.text}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/70 backdrop-blur-md border border-primary/10 shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.text}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {info.displayName || "Info"}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
