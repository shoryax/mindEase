"use client";
import React, { useState } from 'react';

const services = [
  {
    title: '1:1 therapy',
    desc: 'personalized sessions focused entirely on your journey',
    gradient: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
    emoji: '💭'
  },
  {
    title: 'couples work',
    desc: 'rebuild connection and understanding together',
    gradient: 'from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20',
    emoji: '💕'
  },
  {
    title: 'trauma healing',
    desc: 'gentle, evidence-based care for past wounds',
    gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
    emoji: '🌱'
  },
  {
    title: 'online sessions',
    desc: 'therapy from wherever you feel comfortable',
    gradient: 'from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20',
    emoji: '💻'
  },
  {
    title: 'anxiety & mood',
    desc: 'practical tools for managing everyday struggles',
    gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
    emoji: '🧘'
  },
  {
    title: 'flexible times',
    desc: 'evenings & weekends available',
    gradient: 'from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20',
    emoji: '⏰'
  }
];

export default function FeaturedCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-light text-foreground mb-4">what we offer</h2>
          <p className="text-xl text-muted-foreground font-light">therapy that fits your life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-black/10 dark:border-white/10 transition-all duration-300 cursor-pointer ${
                hoveredCard === i ? 'scale-[1.03] border-black/20 dark:border-white/25' : ''
              }`}
            >
              <div className="text-4xl mb-5">{service.emoji}</div>
              <h3 className="text-xl font-light text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
