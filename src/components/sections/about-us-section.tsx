"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ABOUT_US_CONTENT } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const textBlockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function AboutUsSection() {
  return (
    <AnimatedSection
      id="about"
      className="bg-secondary/30"
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary drop-shadow-sm"
          variants={itemVariants}
        >
          {ABOUT_US_CONTENT.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6 text-lg text-foreground/80"
            variants={textBlockVariants}
          >
            {ABOUT_US_CONTENT.paragraphs.map((paragraph, index) => (
              <motion.p key={index} variants={itemVariants}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            <Image
              src="/gymImages/5.png"
              alt="Spacious gym interior"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transform hover:scale-105 transition-transform duration-500"
              data-ai-hint="gym interior"
            />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_US_CONTENT.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="h-full bg-background/70 backdrop-blur-md border-primary/20 hover:shadow-primary/20 shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <feature.icon className="h-10 w-10 text-accent shrink-0" />
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
