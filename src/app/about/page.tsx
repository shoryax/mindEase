'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Brain, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    title: 'Emotional support, anytime',
    desc: 'HealthPal listens without judgment. Whether it\'s 2pm or 2am, you can write freely and receive empathetic, CBT-informed responses — no waitlist, no scheduling.'
  },
  {
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    title: 'Science-backed techniques',
    desc: 'Our CBT Coach is grounded in Cognitive Behavioral Therapy — one of the most studied and effective frameworks in mental health. It helps you see your thoughts more clearly.'
  },
  {
    icon: Stethoscope,
    color: 'text-sky-500',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    title: 'Health information, simplified',
    desc: 'The AI Doctor makes medical information accessible. Understand your medications instantly without deciphering a leaflet or waiting for a doctor\'s callback.'
  },
];

export default function AboutPage() {
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

          {/* Hero */}
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">About MindEase</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              Mental wellness{' '}
              <span className="font-serif italic font-normal text-muted-foreground">shouldn't be hard to access</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              MindEase was built on a simple idea: everyone deserves access to quality mental wellness tools, available instantly and powered by AI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We're not a therapy clinic. We're a self-service wellness platform — combining AI emotional support, CBT-based thought reframing, ambient focus tools, and health information in one place. Available 24/7, no appointments, no waitlists.
            </p>
          </div>

          {/* What we believe */}
          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-foreground mb-8">What drives us</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className={`p-7 rounded-2xl border border-border/50 ${p.bg}`}>
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 mb-4`}>
                      <Icon className={`w-5 h-5 ${p.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
            {[
              { value: '100+', label: 'Active users', sub: 'and growing' },
              { value: '3', label: 'AI tools', sub: 'HealthPal, CBT Coach, AI Doctor' },
              { value: '24/7', label: 'Available', sub: 'no appointments needed' },
              { value: 'Free', label: 'To get started', sub: 'no credit card required' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-border/50 text-center">
                <div className="text-3xl font-semibold text-foreground mb-1">{s.value}</div>
                <div className="text-sm font-medium text-foreground mb-0.5">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 mb-12">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <span className="font-semibold">Important:</span> MindEase is a self-care and wellness tool, not a licensed clinical service. It is not a substitute for professional mental health treatment. If you are in crisis, please call 988 or text HOME to 741741.
            </p>
          </div>

          <div className="text-center">
            <Link href="/signin" className="inline-flex items-center gap-2 text-sm font-semibold bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all">
              Start using MindEase <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
