"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { COACHES_DATA } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function CoachesSection() {
  return (
    <AnimatedSection id="coaches" className="bg-background" variants={sectionVariants}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary drop-shadow-sm"
          variants={titleVariants}
        >
          Meet Our Legendary Coaches
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COACHES_DATA.map((coach) => (
            <motion.div
              key={coach.id}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="group flex flex-col h-full overflow-hidden bg-card/80 backdrop-blur-lg border-primary/20 shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <div className="aspect-square w-full relative overflow-hidden">
                    <Image
                      src={coach.imageUrl}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{objectFit:"cover"}}
                      className="transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={coach.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                     <CardTitle className="text-2xl font-semibold text-primary-foreground drop-shadow-md">{coach.name}</CardTitle>
                     <CardDescription className="text-sm text-primary-foreground/80 font-medium">{coach.specialization}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-4">{coach.bio}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <UserCircle className="mr-2 h-4 w-4" /> View Profile
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
