"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { PLANS_DATA } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useRegisterPlan } from "@/hooks/use-register-plan";
import { useAuth } from "@/contexts/auth-context";
import { PlanConfirmationDialog } from "@/components/plan-confirmation-dialog";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { motion } from "framer-motion";
import { useState } from "react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


export function PlanningSection() {
  const authModal = useAuthModal();
  const { user } = useAuth();
  const registerPlan = useRegisterPlan();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS_DATA[0] | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePlanSelection = (plan: typeof PLANS_DATA[0]) => {
    if (!user) {
      // If not logged in, open auth modal
      authModal.openModal(false);
      return;
    }
    
    // Set the selected plan and show contact form
    setSelectedPlan(plan);
    setShowContactForm(true);
  };

  const handleContactFormSubmit = async (contactInfo: string) => {
    if (!selectedPlan || !user) return;
    
    try {
      setLoading(selectedPlan.id);
      setShowContactForm(false);
      
      // Extract the numeric value from the price string (e.g., "60DT" -> 60)
      const priceValue = parseInt(selectedPlan.price.replace(/\D/g, ""));
      
      // Get current date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split('T')[0];
      
      await registerPlan.mutateAsync({
        name: user.full_name,
        email: user.email,
        contact: contactInfo,
        date: currentDate,
        plan: selectedPlan.name,
        price: priceValue,
      });
      
      // Show confirmation dialog
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <AnimatedSection id="planning" className="bg-secondary/30" variants={sectionVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary drop-shadow-sm"
            variants={titleVariants}
          >
            Choose Your Path to Legend
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            We offer flexible plans to suit every fitness journey. Find the perfect fit and start your transformation today.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PLANS_DATA.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className="flex"
              >
                <Card 
                  className={cn(
                    "flex flex-col w-full bg-card/80 backdrop-blur-lg border-primary/20 shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105",
                    plan.popular && "border-accent ring-2 ring-accent shadow-accent/40"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 -right-3.5 bg-accent text-accent-foreground px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1 transform rotate-6">
                      <Star className="h-3 w-3" /> Popular
                    </div>
                  )}
                  <CardHeader className="items-center text-center pb-4 pt-8">
                    <plan.icon className={cn("h-12 w-12 mb-4", plan.popular ? "text-accent" : "text-primary")} />
                    <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                      {plan.priceDetails && <span className="text-muted-foreground ml-1">{plan.priceDetails}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handlePlanSelection(plan)}
                      disabled={loading === plan.id || registerPlan.isPending}
                      className={cn(
                        "w-full text-lg py-6",
                        plan.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      )}
                    >
                      {loading === plan.id ? "Processing..." : plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <ContactFormDialog 
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        onSubmit={handleContactFormSubmit}
        plan={selectedPlan}
      />

      <PlanConfirmationDialog 
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        plan={selectedPlan}
      />
    </>
  );
}
