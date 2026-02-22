'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, Heart, Stethoscope, Volume2, Leaf, BarChart2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'AI Therapist — HealthPal',
    desc: 'Share what\'s on your mind and HealthPal uses NLP sentiment analysis to detect your emotional state, identify what you\'re feeling, and respond like a compassionate therapist — available 24/7, no appointments needed.',
    icon: Heart,
    color: 'rose',
    href: '/healthpal',
    badge: 'Most used'
  },
  {
    title: 'CBT Coach',
    desc: 'Write down a negative automatic thought. The CBT Coach identifies cognitive distortions like catastrophizing or all-or-nothing thinking, then offers a balanced, realistic reframe rooted in evidence-based therapy.',
    icon: Brain,
    color: 'violet',
    href: '/cbt',
  },
  {
    title: 'AI Doctor',
    desc: 'Point your camera at any medicine packaging and instantly get a full breakdown — name, uses, dosage, active ingredients, side effects, warnings, and storage info. Powered by GPT-4o Vision.',
    icon: Stethoscope,
    color: 'sky',
    href: '/ai-doctor',
  },
  {
    title: 'Ambient Sound Mixer',
    desc: 'Layer rain, forest, ocean, fireplace, and more to build your perfect focus or wind-down soundscape. Adjust each track independently and save your preferences across sessions.',
    icon: Volume2,
    color: 'emerald',
    href: '/sounds',
  },
  {
    title: 'Mood Garden',
    desc: 'A visual garden that grows as you complete wellness activities on your dashboard. Five growth stages — from seed to blooming — reflect your weekly consistency and keep you motivated.',
    icon: Leaf,
    color: 'teal',
    href: '/dashboard',
  },
  {
    title: 'Weekly Digest',
    desc: 'Every week, an AI-written summary of your wellness journey — which activities you completed, your mood patterns, and personalised suggestions for the week ahead.',
    icon: BarChart2,
    color: 'amber',
    href: '/digest',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
  rose:    { bg: 'bg-rose-50 dark:bg-rose-950/30',    border: 'border-rose-200/50 dark:border-rose-800/30',    icon: 'text-rose-600 dark:text-rose-400',    iconBg: 'bg-rose-100 dark:bg-rose-900/40' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200/50 dark:border-violet-800/30', icon: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-100 dark:bg-violet-900/40' },
  sky:     { bg: 'bg-sky-50 dark:bg-sky-950/30',      border: 'border-sky-200/50 dark:border-sky-800/30',      icon: 'text-sky-600 dark:text-sky-400',      iconBg: 'bg-sky-100 dark:bg-sky-900/40' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200/50 dark:border-emerald-800/30', icon: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-950/30',    border: 'border-teal-200/50 dark:border-teal-800/30',    icon: 'text-teal-600 dark:text-teal-400',    iconBg: 'bg-teal-100 dark:bg-teal-900/40' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/30',  border: 'border-amber-200/50 dark:border-amber-800/30',  icon: 'text-amber-600 dark:text-amber-400',  iconBg: 'bg-amber-100 dark:bg-amber-900/40' },
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
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">What we offer</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Six tools for{' '}
              <span className="font-serif italic font-normal text-muted-foreground">your mental health</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI-powered, always available, and built around you — not around appointments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              const colors = colorMap[tool.color];
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${colors.bg} ${colors.border}`}
                >
                  {tool.badge && (
                    <span className={`absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${colors.iconBg} ${colors.icon}`}>
                      {tool.badge}
                    </span>
                  )}
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${colors.iconBg}`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.icon} group-hover:gap-2 transition-all`}>
                    Try it <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border border-teal-200/50 dark:border-teal-800/30 text-center">
            <p className="text-foreground font-medium mb-1">Ready to begin?</p>
            <p className="text-muted-foreground text-sm mb-5">Sign in with Google to unlock all tools — free, no credit card required.</p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all">
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
