"use client";

import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewportOnce?: boolean;
  viewportAmount?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function AnimatedSection({
  children,
  className,
  as: Component = motion.section, // Default to motion.section
  variants = defaultVariants,
  initial = "hidden",
  whileInView = "visible",
  viewportOnce = true,
  viewportAmount = 0.2,
  ...props
}: AnimatedSectionProps) {
  // Ensure Component is a motion component or a regular HTML tag string
  const MotionComponent = typeof Component === 'string' ? motion[Component as keyof typeof motion] || motion.div : Component;


  return (
    <MotionComponent
      className={cn("py-16 md:py-24", className)}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: viewportOnce, amount: viewportAmount }}
      variants={variants}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
