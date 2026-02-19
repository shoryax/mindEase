'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, MessageCircle, Heart, Brain, Stethoscope, Volume2, Leaf, BarChart2, ArrowRight, Wind } from 'lucide-react';
import Link from 'next/link';

const crisisResources = [
  { name: '988 Suicide & Crisis Lifeline', description: 'Call or text 988 — available 24/7', href: 'tel:988', icon: Phone },
  { name: 'Crisis Text Line', description: 'Text HOME to 741741', href: 'sms:741741', icon: MessageCircle },
];

const appTools = [
  {
    icon: Heart,
    color: 'rose',
    title: 'HealthPal — AI Therapist',
    desc: 'Write what\'s on your mind and receive empathetic, NLP-powered emotional support. Identifies your emotions, sentiment, and responds with personalised guidance.',
    href: '/healthpal',
  },
  {
    icon: Brain,
    color: 'violet',
    title: 'CBT Coach',
    desc: 'Spot cognitive distortions in your thinking — catastrophizing, all-or-nothing, mind reading — and reframe them into balanced, realistic perspectives.',
    href: '/cbt',
  },
  {
    icon: Stethoscope,
    color: 'sky',
    title: 'AI Doctor',
    desc: 'Photograph any medicine to instantly understand its uses, dosage, side effects, and warnings. Powered by GPT-4o Vision.',
    href: '/ai-doctor',
  },
  {
    icon: Wind,
    color: 'teal',
    title: 'Breathing Pacer',
    desc: 'Guided breathing exercises (4-7-8, box breathing) built directly into your dashboard. Proven to calm the nervous system in minutes.',
    href: '/dashboard',
  },
  {
    icon: Volume2,
    color: 'emerald',
    title: 'Ambient Sound Mixer',
    desc: 'Layer rain, forest, ocean and more to create a personalised soundscape for focus, sleep, or winding down.',
    href: '/sounds',
  },
  {
    icon: BarChart2,
    color: 'amber',
    title: 'Weekly Digest',
    desc: 'An AI-written weekly summary of your wellness activity — patterns, insights, and suggestions for the week ahead.',
    href: '/digest',
  },
  {
    icon: Leaf,
    color: 'green',
    title: 'Mood Garden',
    desc: 'A visual garden that grows as you complete activities. Track your consistency and watch progress bloom over time.',
    href: '/dashboard',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
  rose:    { bg: 'bg-rose-50 dark:bg-rose-950/30',     border: 'border-rose-200/50 dark:border-rose-800/30',    icon: 'text-rose-600 dark:text-rose-400',    iconBg: 'bg-rose-100 dark:bg-rose-900/40' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200/50 dark:border-violet-800/30', icon: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-100 dark:bg-violet-900/40' },
  sky:     { bg: 'bg-sky-50 dark:bg-sky-950/30',       border: 'border-sky-200/50 dark:border-sky-800/30',      icon: 'text-sky-600 dark:text-sky-400',      iconBg: 'bg-sky-100 dark:bg-sky-900/40' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-950/30',     border: 'border-teal-200/50 dark:border-teal-800/30',    icon: 'text-teal-600 dark:text-teal-400',    iconBg: 'bg-teal-100 dark:bg-teal-900/40' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200/50 dark:border-emerald-800/30', icon: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/30',   border: 'border-amber-200/50 dark:border-amber-800/30',  icon: 'text-amber-600 dark:text-amber-400',  iconBg: 'bg-amber-100 dark:bg-amber-900/40' },
  green:   { bg: 'bg-green-50 dark:bg-green-950/30',   border: 'border-green-200/50 dark:border-green-800/30',  icon: 'text-green-600 dark:text-green-400',  iconBg: 'bg-green-100 dark:bg-green-900/40' },
};

export default function ResourcesPage() {
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

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Resources</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Everything you need,{' '}
              <span className="font-serif italic font-normal text-muted-foreground">right here</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From AI-powered tools to crisis support — your mental health resources in one place.
            </p>
          </div>

          {/* Crisis */}
          <div className="mb-16">
            <h2 className="text-lg font-semibold text-foreground mb-4">Crisis Support</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              {crisisResources.map((r) => {
                const Icon = r.icon;
                return (
                  <a
                    key={r.name}
                    href={r.href}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{r.name}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* App Tools */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">MindEase Tools</h2>
              <Link href="/signin" className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors">
                Sign in to use all tools <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appTools.map((tool, i) => {
                const Icon = tool.icon;
                const colors = colorMap[tool.color];
                return (
                  <Link
                    key={i}
                    href={tool.href}
                    className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] ${colors.bg} ${colors.border}`}
                  >
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-4 ${colors.iconBg}`}>
                      <Icon className={`w-4 h-4 ${colors.icon}`} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.desc}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.icon} group-hover:gap-2 transition-all`}>
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border border-teal-200/50 dark:border-teal-800/30 text-center">
            <h3 className="font-semibold text-foreground mb-2">All tools. Free to start.</h3>
            <p className="text-sm text-muted-foreground mb-5">Sign in with Google and get access to every MindEase tool instantly.</p>
            <Link href="/signin" className="inline-flex items-center gap-2 text-sm font-semibold bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all">
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
