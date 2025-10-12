'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import EducationSection from '@/components/Education';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamically import Three.js background (no SSR)
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative">
      <ThreeBackground />
      <Navigation />
      <Hero />
      <Projects />
      <EducationSection />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
