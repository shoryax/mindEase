"use client";
import { Quote } from 'lucide-react';

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

export default function Testimonials() {
  return (
    <>
      <section className="relative z-10 py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-light text-foreground mb-4">
              Stories of Hope
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Real experiences from people who have found comfort and strength
            </p>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="flex gap-6 animate-scroll-track">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="group p-7 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 w-[320px] flex-shrink-0"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-5 border border-black/10 dark:border-white/10">
                    <Quote className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-5 italic leading-relaxed text-sm">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-black/10 dark:border-white/10 pt-4">
                    <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes scrollTestimonial {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-track {
          width: fit-content;
          animation: scrollTestimonial 25s linear infinite;
        }
        .animate-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
