import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Legends Gym: Forge your legend with state-of-the-art equipment, expert trainers, and a motivating community.',
  keywords: ['gym', 'fitness', 'legends', 'workout', 'health', 'training', 'exercise'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: 'Forge your legend with state-of-the-art equipment, expert trainers, and a motivating community.',
    url: 'https://legends-gym-example.com', // Replace with actual URL
    siteName: SITE_NAME,
    images: [
      {
        url: 'https://picsum.photos/seed/ogimage/1200/630', 
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} promotional image`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Forge your legend with state-of-the-art equipment, expert trainers, and a motivating community.',
    // site: '@legendsgym', // Replace with your Twitter handle
    // creator: '@creatorhandle', // Replace with creator's Twitter handle
    images: ['https://picsum.photos/seed/twitterog/1200/600'], 
  },
  icons: {
    icon: '/favicon.ico', // Assuming you will add a favicon later
    // apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest',
};
