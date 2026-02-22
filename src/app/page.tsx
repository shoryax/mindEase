import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import AIFeatures from '@/components/AIFeatures';
import FeaturedCards from '@/components/FeaturedCards';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Ready from '@/components/Ready';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-24">
        <Hero />
        <Stats />
        <AIFeatures />
        <FeaturedCards />
        <Testimonials />
        <FAQ />
        <Ready />
        <Footer />
      </main>
    </div>
  );
}
