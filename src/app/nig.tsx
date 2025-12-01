"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-light tracking-wider">mindful</div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm hover:text-purple-400 transition-colors">Services</a>
            <a href="#" className="text-sm hover:text-purple-400 transition-colors">About</a>
            <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-6">
              Book a Session
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 lg:pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">A safe space for your mind</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-light leading-[0.95] mb-8 tracking-tight">
              healing starts
              <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                with connection
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/60 font-light mb-12 max-w-2xl leading-relaxed">
              Compassionate therapy designed for real people dealing with real challenges. 
              Let's work through it together.
            </p>

            <div className="flex items-center gap-6">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 h-14 text-base border-0">
                Start Your Journey
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-10 h-14 text-base">
                How it Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '2.5k+', label: 'people helped' },
              { value: '15yr', label: 'experience' },
              { value: '4.9', label: 'avg rating' },
              { value: '100%', label: 'confidential' }
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-5xl lg:text-6xl font-light mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl lg:text-6xl font-light mb-6">what we offer</h2>
            <p className="text-xl text-white/60 max-w-2xl">therapy that fits your life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: '1:1 therapy', 
                desc: 'personalized sessions focused entirely on your journey',
                gradient: 'from-violet-500/20 to-purple-500/20',
                emoji: '💭'
              },
              { 
                title: 'couples work', 
                desc: 'rebuild connection and understanding together',
                gradient: 'from-pink-500/20 to-rose-500/20',
                emoji: '💕'
              },
              { 
                title: 'trauma healing', 
                desc: 'gentle, evidence-based care for past wounds',
                gradient: 'from-amber-500/20 to-orange-500/20',
                emoji: '🌱'
              },
              { 
                title: 'online sessions', 
                desc: 'therapy from wherever you feel comfortable',
                gradient: 'from-cyan-500/20 to-blue-500/20',
                emoji: '💻'
              },
              { 
                title: 'anxiety & mood', 
                desc: 'practical tools for managing everyday struggles',
                gradient: 'from-emerald-500/20 to-teal-500/20',
                emoji: '🧘'
              },
              { 
                title: 'flexible times', 
                desc: 'evenings & weekends available',
                gradient: 'from-indigo-500/20 to-blue-500/20',
                emoji: '⏰'
              }
            ].map((service, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredCard(null)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-white/10 transition-all duration-500 cursor-pointer ${
                  hoveredCard === i ? 'scale-105 border-white/30' : ''
                }`}
              >
                <div className="text-5xl mb-6">{service.emoji}</div>
                <h3 className="text-2xl font-light mb-3">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl lg:text-7xl font-light mb-8 leading-tight">
            ready when
            <br />
            <span className="italic font-serif">you are</span>
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            no pressure. just a conversation to see if we're a good fit.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-16 text-lg">
            Book Free Consultation
          </Button>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/40">
            <span>no commitment</span>
            <span>•</span>
            <span>100% confidential</span>
            <span>•</span>
            <span>insurance accepted</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-light tracking-wider">mindful</div>
          <div className="text-sm text-white/40">© 2024 — all rights reserved</div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">privacy</a>
            <a href="#" className="hover:text-white transition-colors">terms</a>
            <a href="#" className="hover:text-white transition-colors">contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}