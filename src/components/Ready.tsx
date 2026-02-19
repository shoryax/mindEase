"use client";
import { Button } from "./ui/button";
import { ArrowRight, Lock, Zap, Clock } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Ready() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1),transparent_50%)]" />

          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Free to start
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
                Your wellness journey
                <br />
                <span className="font-serif italic font-normal opacity-90">starts right now.</span>
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
                No therapist required. No waitlist. No credit card. Just you, showing up for yourself.
              </p>

              <Link href="/signin">
                <Button
                  size="lg"
                  className="group bg-white text-teal-700 hover:bg-white/95 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-black/10 transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Create your free account
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
              </Link>

              <div className="mt-12 pt-10 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                  <div className="flex items-center gap-3 text-white/80">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm font-medium">Private & secure</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-medium">AI-powered 24/7</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">No appointments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-8 left-8 w-20 h-20 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full border-2 border-white/10" />
          <div className="absolute top-1/2 right-8 w-3 h-3 rounded-full bg-white/20" />
          <div className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
