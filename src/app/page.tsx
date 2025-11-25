import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedCards from '@/components/FeaturedCards';
import Categories from '@/components/Categories';
import Ready from '@/components/Ready';
import Testimonials from '@/components/hope';
import Footer from '@/components/Footer';
import FAQ from '@/components/fq';
import HealthChatbot from '@/components/HealthChatbot';
import './globals.css';

const Page = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <FeaturedCards />
      <Testimonials />
      <FAQ />
      <Ready />
      <Footer />
      <HealthChatbot />
    </div>
  );
};

export default Page;