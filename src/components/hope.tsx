"use client";
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "After years of feeling stuck, I finally found a therapist who truly listens. The approach is gentle yet transformative. I've never felt more understood.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    avatar: "SM",
    rating: 5,
    highlight: "finally found a therapist who truly listens"
  },
  {
    quote: "The virtual sessions fit perfectly into my busy schedule. Same quality care, but I can attend from anywhere. It's been life-changing for my anxiety.",
    author: "Dr. James Chen",
    role: "Physician",
    avatar: "JC",
    rating: 5,
    highlight: "life-changing for my anxiety"
  },
  {
    quote: "What sets this apart is the evidence-based approach. No fluff, just real techniques that work. I've recommended it to all my colleagues.",
    author: "Maria Rodriguez",
    role: "University Professor",
    avatar: "MR",
    rating: 5,
    highlight: "real techniques that work"
  },
  {
    quote: "The couples therapy saved our marriage. We learned to communicate in ways we never thought possible. Forever grateful.",
    author: "Thomas & Emily Baker",
    role: "Married 12 years",
    avatar: "TB",
    rating: 5,
    highlight: "saved our marriage"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative z-10 py-20 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/30 to-transparent dark:via-teal-950/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Testimonials</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              Stories of
              <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">transformation</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Real words from real people. Every journey is different, but the destination is the same: a healthier, happier you.
            </p>

            {/* Rating summary */}
            <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-border/50 max-w-sm">
              <div>
                <div className="text-4xl font-semibold text-foreground">4.9</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-sm font-medium text-foreground">500+ reviews</div>
                <div className="text-xs text-muted-foreground">on Google & Psychology Today</div>
              </div>
            </div>
          </div>

          {/* Right: Testimonial cards */}
          <div className="relative">
            {/* Main testimonial */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/5 dark:shadow-black/20 border border-border/50">
              {/* Quote mark */}
              <div className="absolute -top-4 -left-2 text-8xl font-serif text-teal-500/20 dark:text-teal-400/10 leading-none select-none">"</div>
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-medium text-sm">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonials[activeIndex].author}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-border hover:border-teal-500/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-center transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-border hover:border-teal-500/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-center transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/50">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-teal-500' : 'w-1.5 bg-border hover:bg-muted-foreground/30'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative floating cards */}
            <div className="absolute -bottom-4 -right-4 lg:-right-8 w-32 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200/50 dark:border-amber-700/30 shadow-lg transform rotate-3 hidden sm:block" />
            <div className="absolute -top-4 -left-4 lg:-left-8 w-24 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 border border-teal-200/50 dark:border-teal-700/30 shadow-lg transform -rotate-6 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
