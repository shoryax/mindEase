"use client";
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 2547, suffix: '+', label: 'Lives touched', sublabel: 'Clients helped since 2019' },
  { value: 98, suffix: '%', label: 'Success rate', sublabel: 'Reported improvement' },
  { value: 4.9, suffix: '', label: 'Client rating', sublabel: 'Average review score' },
  { value: 12, suffix: '+', label: 'Specializations', sublabel: 'Areas of expertise' }
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="tabular-nums">
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">By the numbers</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-medium text-foreground">Real impact, real results</h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 border border-black/[0.06] dark:border-white/[0.12] hover:border-teal-500/30 dark:hover:border-teal-300/30 transition-all duration-500 hover:shadow-lg hover:shadow-teal-500/5"
            >
              {/* Decorative corner */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="text-4xl lg:text-5xl font-semibold text-foreground mb-1 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
