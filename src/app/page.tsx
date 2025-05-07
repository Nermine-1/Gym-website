import { HeroSection } from "@/components/sections/hero-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { CoachesSection } from "@/components/sections/coaches-section";
import { PlanningSection } from "@/components/sections/planning-section";
import { LocalizationSection } from "@/components/sections/localization-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <CoachesSection />
      <PlanningSection />
      <LocalizationSection />
      <ContactSection />
      {/* The "Get Started" functionality is primarily handled by the Sign Up button in Navbar and Hero, leading to the AuthModal. */}
    </>
  );
}
