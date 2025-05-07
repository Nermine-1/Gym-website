"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SITE_NAME } from "@/lib/constants";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const authModal = useAuthModal();

  return (
    <AnimatedSection
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background !py-0"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, duration: 0.1 },
        },
      }}
    >
      <div className="absolute inset-0">
        <Image
          src="/gymImages/2.png"
          alt="Modern gym environment"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={80}
          className="opacity-20"
          data-ai-hint="gym background"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>{" "}
        {/* Overlay for better text readability */}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground drop-shadow-md"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          Become Your Own Legend
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-foreground/90 mb-10 max-w-3xl mx-auto drop-shadow-sm"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          Unleash your potential at {SITE_NAME}. State-of-the-art facilities,
          expert trainers, and a community that inspires greatness.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <Button
            size="lg"
            onClick={() => authModal.openModal(false)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <ArrowRight className="h-8 w-8 text-primary rotate-90" />
      </motion.div>
    </AnimatedSection>
  );
}
