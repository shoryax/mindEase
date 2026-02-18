'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedCards from '@/components/FeaturedCards';
import Testimonials from '@/components/hope';
import FAQ from '@/components/FAQ';
import Ready from '@/components/Ready';
import Footer from '@/components/Footer';


export default function Page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-16 lg:pt-20">
        <Hero />
        <Stats />
        <FeaturedCards />
        <Testimonials />
        <FAQ />
        <Ready />
        <Footer />
      </main>
    </div>
  );
}
