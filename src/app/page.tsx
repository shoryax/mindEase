import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedCards from '@/components/FeaturedCards';
import Testimonials from '@/components/hope';
import FAQ from '@/components/fq';
import Ready from '@/components/Ready';
import Footer from '@/components/Footer';
import HealthChatbot from '@/components/HealthChatbot';

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Hero />
        <Stats />
        <FeaturedCards />
        <Testimonials />
        <FAQ />
        <Ready />
        <Footer />
      </div>
      <HealthChatbot />
    </div>
  );
}
