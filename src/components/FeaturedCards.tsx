"use client";
import React, { useState } from 'react';
import { ArrowUpRight, Brain, Heart, Leaf, Monitor, Sparkles, Calendar } from 'lucide-react';

const services = [
  {
    title: 'Individual Therapy',
    desc: 'One-on-one sessions tailored to your unique story, goals, and pace. A space that\'s entirely yours.',
    icon: Brain,
    color: 'teal',
    featured: true
  },
  {
    title: 'Couples Therapy',
    desc: 'Reconnect, communicate, and build a stronger foundation together.',
    icon: Heart,
    color: 'rose'
  },
  {
    title: 'Trauma Recovery',
    desc: 'EMDR and somatic approaches for gentle, effective healing.',
    icon: Leaf,
    color: 'emerald'
  },
  {
    title: 'Virtual Sessions',
    desc: 'Same quality care, from wherever feels comfortable to you.',
    icon: Monitor,
    color: 'sky'
  },
  {
    title: 'Anxiety & Depression',
    desc: 'Evidence-based techniques that actually work in real life.',
    icon: Sparkles,
    color: 'amber'
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Evening and weekend slots available. Life doesn\'t pause—neither do we.',
    icon: Calendar,
    color: 'violet'
  }
];

const colorVariants: Record<string, { bg: string; border: string; icon: string; hover: string }> = {
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/40', border: 'border-teal-200/50 dark:border-teal-700/50', icon: 'text-teal-600 dark:text-teal-300', hover: 'hover:border-teal-300 dark:hover:border-teal-600' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-900/40', border: 'border-rose-200/50 dark:border-rose-700/50', icon: 'text-rose-600 dark:text-rose-300', hover: 'hover:border-rose-300 dark:hover:border-rose-600' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/40', border: 'border-emerald-200/50 dark:border-emerald-700/50', icon: 'text-emerald-600 dark:text-emerald-300', hover: 'hover:border-emerald-300 dark:hover:border-emerald-600' },
  sky: { bg: 'bg-sky-50 dark:bg-sky-900/40', border: 'border-sky-200/50 dark:border-sky-700/50', icon: 'text-sky-600 dark:text-sky-300', hover: 'hover:border-sky-300 dark:hover:border-sky-600' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/40', border: 'border-amber-200/50 dark:border-amber-700/50', icon: 'text-amber-600 dark:text-amber-300', hover: 'hover:border-amber-300 dark:hover:border-amber-600' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-900/40', border: 'border-violet-200/50 dark:border-violet-700/50', icon: 'text-violet-600 dark:text-violet-300', hover: 'hover:border-violet-300 dark:hover:border-violet-600' }
};

export default function FeaturedCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/30 via-transparent to-amber-100/30 dark:from-teal-900/10 dark:to-amber-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">Our services</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Therapy designed
              <br />
              <span className="font-serif italic font-normal text-muted-foreground">around your life</span>
            </h2>
          </div>
          <div className="lg:flex items-end justify-end hidden">
            <p className="text-muted-foreground max-w-sm text-right leading-relaxed">
              Each service is delivered with the same commitment: your growth, your pace, your way.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => {
            const colors = colorVariants[service.color];
            const Icon = service.icon;
            const isHovered = hoveredCard === i;
            
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 cursor-pointer
                  ${service.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
                  ${colors.bg} ${colors.border} ${colors.hover}
                  ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-sm'}
                `}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${colors.bg} border ${colors.border}`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>

                {/* Content */}
                <div className={`${service.featured ? 'lg:space-y-6' : ''}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                    <ArrowUpRight className={`w-4 h-4 text-muted-foreground transition-all duration-300 flex-shrink-0 mt-1 ${isHovered ? 'translate-x-0.5 -translate-y-0.5 opacity-100' : 'opacity-0'}`} />
                  </div>
                  <p className={`text-muted-foreground leading-relaxed ${service.featured ? 'text-base' : 'text-sm'}`}>
                    {service.desc}
                  </p>
                </div>

                {/* Featured tag */}
                {service.featured && (
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-teal-500 text-white text-[10px] font-semibold uppercase tracking-wide">
                    Most popular
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
