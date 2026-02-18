"use client";
import { Button } from "./ui/button";
import { ArrowRight, Calendar, Shield, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function Ready() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1),transparent_50%)]" />
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          {/* Content */}
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
                Ready to take the
                <br />
                <span className="font-serif italic font-normal opacity-90">first step?</span>
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
                No pressure, no commitment. Just a free 15-minute call to see if we're a good fit for your journey.
              </p>

              <Button 
                size="lg" 
                className="group bg-white text-teal-700 hover:bg-white/95 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-black/10 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Book free consultation
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>

              {/* Trust badges */}
              <div className="mt-12 pt-10 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium">No commitment</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">100% confidential</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Insurance accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full border-2 border-white/10" />
          <div className="absolute top-1/2 right-8 w-3 h-3 rounded-full bg-white/20" />
          <div className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
