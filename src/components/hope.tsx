"use client";
import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "These cards have become my daily companions. They remind me that it's okay to not be okay, and that healing is a journey.",
      author: "Sarah M.",
      role: "College Student"
    },
    {
      quote: "As a therapist, I recommend these cards to many of my clients. They're beautifully designed and genuinely helpful.",
      author: "Dr. James Wilson",
      role: "Licensed Therapist"
    },
    {
      quote: "The breathing technique cards helped me through my most anxious moments. I keep them in my purse wherever I go.",
      author: "Maria L.",
      role: "Working Parent"
    }
  ];

  return (
    <>
    <section className="relative z-10 py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-light text-white mb-6">
            Stories of Hope
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            Real experiences from people who have found comfort and strength
          </p>
        </div>
        {/* Infinite horizontal scrolling testimonials */}
        <div className="relative">
          <div className="overflow-hidden py-2">
            <div className="flex gap-6 animate-scroll-track">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30 w-[320px] flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white/80 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-white/40 text-sm mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <style jsx>{`
      @keyframes scrollTestimonial {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      /* The track contains two duplicated sets, so -50% completes one set */
      .animate-scroll-track {
        width: fit-content;
        animation: scrollTestimonial 25s linear infinite;
      }
      /* Pause on hover for readability */
      .animate-scroll-track:hover {
        animation-play-state: paused;
      }
    `}</style>
    </>
  );
}