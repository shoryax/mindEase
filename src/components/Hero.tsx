"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Heart, Sparkles, Wind } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-10 px-6 lg:px-12 pt-8 lg:pt-16 pb-20 lg:pb-32 overflow-hidden">
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-teal-400/8 via-emerald-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-violet-300/6 via-indigo-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-400/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium tracking-wide text-emerald-700 dark:text-emerald-300 uppercase">
                AI-powered wellness, available now
              </span>
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-semibold leading-[1.05] mb-6 tracking-tight text-foreground">
              Your mental health,
              <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-500 dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
                right here.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              AI-powered tools for mood tracking, CBT reframing, guided breathing, and emotional support —
              all in one place. No appointments. No waitlists. Available 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/signin">
                <Button
                  size="lg"
                  className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14 text-[15px] font-medium shadow-lg shadow-foreground/10 transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get started — it's free
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
              </Link>
              <Link
                href="/signin"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
              >
                <span className="text-[15px] font-medium">Already a member?</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {[
                { icon: Brain, label: "CBT Coach", color: "text-violet-600 dark:text-violet-300", bg: "bg-violet-50 dark:bg-violet-900/20 border-violet-200/60 dark:border-violet-700/40" },
                { icon: Heart, label: "AI Therapist", color: "text-rose-600 dark:text-rose-300", bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-200/60 dark:border-rose-700/40" },
                { icon: Wind, label: "Breathing Pacer", color: "text-sky-600 dark:text-sky-300", bg: "bg-sky-50 dark:bg-sky-900/20 border-sky-200/60 dark:border-sky-700/40" },
                { icon: Sparkles, label: "Weekly Digest", color: "text-amber-600 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-700/40" },
              ].map(({ icon: Icon, label, color, bg }) => (
                <span key={label} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${bg} ${color}`}>
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — App preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none space-y-3">
              {/* Mood Garden card */}
              <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/60 dark:to-emerald-900/60 border border-teal-200/50 dark:border-teal-600/40 shadow-xl shadow-teal-500/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-widest">Mood Garden</span>
                  <span className="text-xs text-muted-foreground">Week 3 · Blooming</span>
                </div>
                <div className="flex items-end justify-center gap-4 py-3">
                  {[
                    { emoji: "🌱", h: 16 },
                    { emoji: "🌿", h: 28 },
                    { emoji: "🌸", h: 40 },
                    { emoji: "🌺", h: 52 },
                    { emoji: "🌼", h: 64 },
                  ].map(({ emoji, h }, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-xl">{emoji}</span>
                      <div className="w-2 rounded-full bg-gradient-to-t from-emerald-400 to-teal-300" style={{ height: h }} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-1000" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">12 activities this week · 3 away from next stage</p>
              </div>

              {/* Two mini cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/40 dark:to-pink-900/40 border border-rose-200/40 dark:border-rose-700/40 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-foreground">HealthPal</span>
                    <div className="ml-auto flex gap-0.5">
                      {[0, 150, 300].map(d => (
                        <div key={d} className="w-1 h-1 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">"I feel overwhelmed with work today..."</p>
                  <div className="flex gap-1 flex-wrap">
                    {["😰 Anxious", "💭 Reflective"].map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/40 dark:to-cyan-900/40 border border-sky-200/40 dark:border-sky-700/40 p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-sky-300/60 flex items-center justify-center mb-2 animate-pulse">
                    <Wind className="w-5 h-5 text-sky-500" />
                  </div>
                  <p className="text-[11px] font-medium text-sky-700 dark:text-sky-300">Breathe in...</p>
                  <p className="text-[10px] text-muted-foreground">4-7-8 pattern</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 sm:-right-8 top-6 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-border/50 transform rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Weekly Digest</p>
                    <p className="text-[10px] text-muted-foreground">AI summary ready ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
