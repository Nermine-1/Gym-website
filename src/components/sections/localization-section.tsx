"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { CONTACT_INFO, MAP_EMBED_URL, SITE_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const mapVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const detailsCardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } },
};


export function LocalizationSection() {
  return (
    <AnimatedSection id="location" className="bg-background" variants={sectionVariants}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary drop-shadow-sm"
          variants={itemVariants}
        >
          Find Your Legend
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div 
            className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/20"
            variants={mapVariants}
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${SITE_NAME} Location Map`}
            ></iframe>
          </motion.div>
          
          <motion.div variants={detailsCardVariants}>
            <Card className="bg-card/80 backdrop-blur-lg border-primary/20 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ready to start your journey? Find us at the heart of Fitness City. We're excited to welcome you to the {SITE_NAME} family.
                </p>
                {CONTACT_INFO.filter(info => info.displayName === "Address").map((info) => (
                    <a 
                        key={info.text} 
                        href={info.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                        <info.icon className="h-6 w-6 text-accent mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-medium text-foreground">{info.text}</p>
                        </div>
                    </a>
                ))}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Opening Hours:</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li><span className="font-medium text-foreground/80">Mon - Fri:</span> 6:00 AM - 10:00 PM</li>
                    <li><span className="font-medium text-foreground/80">Saturday:</span> 8:00 AM - 8:00 PM</li>
                    <li><span className="font-medium text-foreground/80">Sunday:</span> 8:00 AM - 6:00 PM</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
