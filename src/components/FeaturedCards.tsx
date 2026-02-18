"use client";
import React, { useState } from 'react';
import { ArrowUpRight, Brain, Heart, Stethoscope, Volume2, Leaf, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'CBT Coach',
    desc: 'Identify cognitive distortions in your thinking and reframe them into balanced, realistic perspectives — guided by AI.',
    icon: Brain,
    color: 'violet',
    href: '/cbt',
    featured: true,
    tag: 'AI-powered'
  },
  {
    title: 'AI Therapist',
    desc: 'Share what\'s on your mind. HealthPal detects your emotions and responds like a compassionate guide, 24/7.',
    icon: Heart,
    color: 'rose',
    href: '/healthpal'
  },
  {
    title: 'AI Doctor',
    desc: 'Point your camera at any medicine packaging and instantly understand what it is, how it works, and its side effects.',
    icon: Stethoscope,
    color: 'sky',
    href: '/ai-doctor'
  },
  {
    title: 'Sound Mixer',
    desc: 'Layer ambient sounds — rain, forest, fire — to build a soundscape for focus, sleep, or calm.',
    icon: Volume2,
    color: 'emerald',
    href: '/sounds'
  },
  {
    title: 'Mood Garden',
    desc: 'Watch a virtual garden grow as you complete wellness activities. Consistency has never looked this beautiful.',
    icon: Leaf,
    color: 'teal',
    href: '/dashboard'
  },
  {
    title: 'Weekly Digest',
    desc: 'An AI-written summary of your week — patterns, wins, and personalized suggestions for the week ahead.',
    icon: BarChart2,
    color: 'amber',
    href: '/digest'
  }
];

const colorVariants: Record<string, { bg: string; border: string; icon: string; iconBg: string; hover: string }> = {
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-900/30',
    border: 'border-violet-200/50 dark:border-violet-700/40',
    icon: 'text-violet-600 dark:text-violet-300',
    iconBg: 'bg-violet-100 dark:bg-violet-900/50',
    hover: 'hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-violet-500/10'
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200/50 dark:border-rose-700/40',
    icon: 'text-rose-600 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    hover: 'hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-rose-500/10'
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-900/30',
    border: 'border-sky-200/50 dark:border-sky-700/40',
    icon: 'text-sky-600 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-900/50',
    hover: 'hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-sky-500/10'
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    border: 'border-emerald-200/50 dark:border-emerald-700/40',
    icon: 'text-emerald-600 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    hover: 'hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-emerald-500/10'
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    border: 'border-teal-200/50 dark:border-teal-700/40',
    icon: 'text-teal-600 dark:text-teal-300',
    iconBg: 'bg-teal-100 dark:bg-teal-900/50',
    hover: 'hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-teal-500/10'
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200/50 dark:border-amber-700/40',
    icon: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    hover: 'hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-amber-500/10'
  }
};

export default function FeaturedCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/20 via-transparent to-violet-100/20 dark:from-teal-900/10 dark:to-violet-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">Everything you need</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Six tools.
              <br />
              <span className="font-serif italic font-normal text-muted-foreground">one wellness space.</span>
            </h2>
          </div>
          <div className="lg:flex items-end justify-end hidden">
            <p className="text-muted-foreground max-w-sm text-right leading-relaxed">
              Everything from emotional support to medicine analysis — built for real life, not just good days.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {features.map((feature, i) => {
            const colors = colorVariants[feature.color];
            const Icon = feature.icon;
            const isHovered = hoveredCard === i;

            return (
              <Link
                key={i}
                href={feature.href}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 cursor-pointer block
                  ${feature.featured ? 'md:col-span-2 lg:col-span-1' : ''}
                  ${colors.bg} ${colors.border} ${colors.hover}
                  ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-sm'}
                `}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${colors.iconBg}`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <ArrowUpRight className={`w-4 h-4 text-muted-foreground transition-all duration-300 flex-shrink-0 mt-1 ${isHovered ? 'translate-x-0.5 -translate-y-0.5 opacity-100' : 'opacity-0'}`} />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>

                {feature.tag && (
                  <div className={`absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${colors.iconBg} ${colors.icon}`}>
                    {feature.tag}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
