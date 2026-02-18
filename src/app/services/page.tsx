'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, Heart, Leaf, Monitor, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Individual Therapy',
    desc: 'One-on-one sessions tailored to your unique story, goals, and pace. We use CBT, DBT, and psychodynamic approaches based on what works best for you.',
    icon: Brain,
    color: 'teal',
  },
  {
    title: 'Couples Therapy',
    desc: 'Reconnect, communicate, and build a stronger foundation together. We help partners understand each other and develop healthier patterns.',
    icon: Heart,
    color: 'rose',
  },
  {
    title: 'Trauma Recovery',
    desc: 'EMDR and somatic experiencing for gentle, effective healing. We create a safe space to process difficult experiences at your own pace.',
    icon: Leaf,
    color: 'emerald',
  },
  {
    title: 'Virtual Sessions',
    desc: 'Same quality care from wherever feels comfortable to you. All you need is a private space and a stable internet connection.',
    icon: Monitor,
    color: 'sky',
  },
  {
    title: 'Anxiety & Depression',
    desc: 'Evidence-based techniques that actually work in real life. Learn practical tools to manage symptoms and build lasting resilience.',
    icon: Sparkles,
    color: 'amber',
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Evening and weekend slots available. Life doesn\'t pause for therapy, so we make sure therapy fits into your life.',
    icon: Calendar,
    color: 'violet',
  },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  teal: { bg: 'bg-teal-50 dark:bg-teal-950/30', icon: 'text-teal-600 dark:text-teal-400' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/30', icon: 'text-rose-600 dark:text-rose-400' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', icon: 'text-emerald-600 dark:text-emerald-400' },
  sky: { bg: 'bg-sky-50 dark:bg-sky-950/30', icon: 'text-sky-600 dark:text-sky-400' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/30', icon: 'text-amber-600 dark:text-amber-400' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950/30', icon: 'text-violet-600 dark:text-violet-400' },
};

export default function ServicesPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [user, loading, router]);

  if (loading || user) return null;

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Our services</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Therapy designed{' '}
              <span className="font-serif italic font-normal text-muted-foreground">around you</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every service is delivered with the same commitment: your growth, your pace, your way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const colors = colorMap[service.color];
              return (
                <div key={i} className={`p-8 rounded-2xl border border-border/50 hover:border-border transition-all duration-300 ${colors.bg}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} border border-border/50 mb-5`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all">
              Book a free consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
