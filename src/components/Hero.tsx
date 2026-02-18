"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-10 px-6 lg:px-12 pt-8 lg:pt-16 pb-20 lg:pb-32 overflow-hidden">
      {/* Ambient background shapes */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-teal-400/8 via-emerald-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-amber-300/8 via-orange-200/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-teal-500/20 bg-teal-500/5 dark:bg-teal-400/10">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-teal-700 dark:text-teal-300 uppercase">Now accepting new clients</span>
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-semibold leading-[1.05] mb-6 tracking-tight text-foreground">
              Your mind
              <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-500 dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
                deserves care
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Evidence-based therapy that meets you where you are. Build resilience, 
              find clarity, and rediscover your strength—all at your own pace.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button 
                size="lg" 
                className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14 text-[15px] font-medium shadow-lg shadow-foreground/10 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Book a free consult
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
              <button className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-2 py-2">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-current/20 group-hover:border-current/40 group-hover:bg-foreground/5 transition-all duration-300">
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                </span>
                <span className="text-[15px] font-medium">See how it works</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-4">Trusted by leading organizations</p>
              <div className="flex items-center gap-8 opacity-40 dark:opacity-30">
                <span className="text-lg font-semibold tracking-tight">Stanford</span>
                <span className="text-lg font-semibold tracking-tight">Mayo Clinic</span>
                <span className="text-lg font-semibold tracking-tight hidden sm:block">Johns Hopkins</span>
              </div>
            </div>
          </div>

          {/* Right side - Bento visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Main card */}
              <div className="absolute inset-4 sm:inset-8 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/60 dark:to-emerald-900/60 border border-teal-200/50 dark:border-teal-600/40 shadow-2xl shadow-teal-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_50%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 dark:from-black/50 to-transparent" />
                
                {/* Card content */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-sm font-medium">JW</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Dr. Julia Werner</p>
                        <p className="text-xs text-muted-foreground">Licensed Clinical Psychologist</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"Every person has an innate capacity for healing. My role is to help you find it."</p>
                  </div>
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-border/50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">CBT & DBT</p>
                    <p className="text-[10px] text-muted-foreground">Evidence-based</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:-left-4 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-border/50 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">500+ sessions</p>
                    <p className="text-[10px] text-muted-foreground">This month</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-4 sm:-left-8 px-3 py-2 rounded-xl bg-emerald-500 text-white shadow-lg transform -translate-y-1/2 hidden sm:block">
                <p className="text-xs font-medium">Available today ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
