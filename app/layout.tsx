import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StructuredData from './structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shakebuddin Mohammed - Full-Stack Engineer × Creative Technologist',
  description: 'Building the future with AI-powered systems, immersive 3D experiences, and distributed architectures.',
  keywords: [
    'Shakebuddin Mohammed',
    'Shakeb Mohammed',
    'Full Stack Engineer',
    'Creative Technologist',
    'AI Developer',
    '3D Web Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Supabase Developer',
    'Three.js Developer',
    'Portfolio',
    'Software Engineer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Distributed Systems',
    'Machine Learning',
    'Artificial Intelligence'
  ],
  authors: [{ name: 'Shakebuddin Mohammed' }],
  creator: 'Shakebuddin Mohammed',
  publisher: 'Shakebuddin Mohammed',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shakeb.tech',
    title: 'Shakebuddin Mohammed - Full-Stack Engineer × Creative Technologist',
    description: 'Building the future with AI-powered systems, immersive 3D experiences, and distributed architectures.',
    siteName: 'Shakebuddin Mohammed Portfolio',
    images: [
      {
        url: 'https://shakeb.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shakebuddin Mohammed - Full-Stack Engineer × Creative Technologist',
      },
    ],
  },
  alternates: {
    canonical: 'https://shakeb.tech',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
