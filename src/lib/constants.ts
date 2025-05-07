import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  Users,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  UserCircle,
  CalendarDays,
  MapPinIcon,
  Mail,
  Phone,
} from "lucide-react";

export const SITE_NAME = "Legends Gym";

export const NAV_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#coaches", label: "Coaches" },
  { href: "#planning", label: "Planning" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export interface Coach {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  bio: string;
  aiHint: string;
}

export const COACHES_DATA: Coach[] = [
  {
    id: "1",
    name: "Sarah 'Flex' Miller",
    specialization: "Strength & Conditioning",
    imageUrl: "/coaches/images1.jpg",
    aiHint: "woman bodybuilder",
    bio: "With over 10 years of experience, Sarah helps you build raw power and endurance. Get ready to lift heavier and push harder.",
  },
  {
    id: "2",
    name: "Alex 'The Titan' Stone",
    specialization: "Yoga & Flexibility",
    imageUrl: "/coaches/images2.jpg",
    aiHint: "male yoga",
    bio: "Alex brings a calming yet challenging approach to yoga, improving your flexibility, balance, and mental focus.",
  },
  {
    id: "3",
    name: "Mike 'Cardio King' Chen",
    specialization: "HIIT & Endurance",
    imageUrl: "/coaches/images3.jpg",
    aiHint: "man running",
    bio: "Mike's high-energy HIIT sessions are designed to torch calories, boost your cardiovascular health, and keep you motivated.",
  },
  {
    id: "4",
    name: "Jacob 'Iron' Lee",
    specialization: "Bodybuilding & Sculpting",
    imageUrl: "/coaches/images4.jpg",
    aiHint: "man fitness",
    bio: "Jacob is an expert in muscle hypertrophy and physique transformation. Sculpt your dream body under his guidance.",
  },
];

export interface Plan {
  id: string;
  name: string;
  price: string;
  priceDetails?: string;
  features: string[];
  icon: LucideIcon;
  popular?: boolean;
  cta: string;
}

export const PLANS_DATA: Plan[] = [
  {
    id: "1",
    name: "Starter Pack",
    price: "60DT",
    priceDetails: "/month",
    features: [
      "Access to all gym equipment",
      "Locker room access",
      "Basic fitness assessment",
      "Online workout examples",
    ],
    icon: Dumbbell,
    cta: "Choose Plan",
  },
  {
    id: "2",
    name: "Legend Tier",
    price: "100DT",
    priceDetails: "/month",
    features: [
      "All Starter Pack benefits",
      "Unlimited group classes",
      "Personalized workout plan",
      "Monthly progress tracking",
      "Access to sauna",
    ],
    icon: Users,
    popular: true,
    cta: "Become a Legend",
  },
  {
    id: "3",
    name: "Mythic Pro",
    price: "160DT",
    priceDetails: "/month",
    features: [
      "All Legend Tier benefits",
      "2x Personal training sessions/month",
      "Nutritional guidance",
      "Premium gym merchandise discount",
      "Guest passes (2/month)",
    ],
    icon: ShieldCheck,
    cta: "Go Pro",
  },
];

export const FOOTER_LINKS = {
  company: [
    { href: "#about", label: "About Us" },
    { href: "#coaches", label: "Our Team" },
    { href: "#planning", label: "Membership" },
    // { href: "/blog", label: "Blog (Coming Soon)"}, // Commented out as not requested
  ],
  support: [
    { href: "#contact", label: "Contact Us" },
    // { href: "/faq", label: "FAQ" }, // Commented out as not requested
    // { href: "/terms", label: "Terms of Service" }, // Commented out as not requested
    // { href: "/privacy", label: "Privacy Policy" }, // Commented out as not requested
  ],
  connect: [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ],
};

export const gymAddress = "Bou hjar, Tunis, Tunisia";
export const gymPhoneNumber = "+216 90 000 000";
export const gymEmail = "info@legendsgym.com";
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3233.6124023251004!2d10.596869576237287!3d35.85850657021468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sisitcom!5e0!3m2!1sfr!2stn!4v1744222953632!5m2!1sfr!2stn";

export const ABOUT_US_CONTENT = {
  title: "Forging Legends, One Rep at a Time",
  paragraphs: [
    "Welcome to Legends Gym, where we believe that everyone has the potential to become a legend. Our state-of-the-art facility, expert trainers, and supportive community are all here to help you achieve your fitness goals, no matter how ambitious.",
    "Founded on the principles of dedication, perseverance, and excellence, Legends Gym is more than just a place to work out. It's a place where you transform, grow stronger, and unlock your true potential. We offer a wide range of equipment, classes, and personalized programs tailored to your needs.",
    "Join us and become part of a legacy of strength, health, and legendary achievements.",
  ],
  features: [
    {
      icon: Dumbbell,
      title: "Modern Equipment",
      description: "Top-tier machines and free weights.",
    },
    {
      icon: UserCircle,
      title: "Expert Coaches",
      description: "Certified professionals to guide you.",
    },
    {
      icon: CalendarDays,
      title: "Flexible Schedules",
      description: "Classes and open gym hours to fit your life.",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Supportive and motivating atmosphere.",
    },
  ],
};

export const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    text: gymAddress,
    href: `https://maps.google.com/?q=${encodeURIComponent(gymAddress)}`,
    displayName: "Address",
  },
  {
    icon: Phone,
    text: gymPhoneNumber,
    href: `tel:${gymPhoneNumber}`,
    displayName: "Phone",
  },
  {
    icon: Mail,
    text: gymEmail,
    href: `mailto:${gymEmail}`,
    displayName: "Email",
  },
];
