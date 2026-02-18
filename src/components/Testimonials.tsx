"use client";
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The breathing pacer changed my mornings completely. I do a 4-minute session every day before work and I'm noticeably calmer. Nothing else has stuck like this.",
    author: "Priya M.",
    role: "Software Engineer",
    avatar: "PM",
    rating: 5,
    tag: "Breathing Pacer"
  },
  {
    quote: "HealthPal felt surprisingly real. I typed out everything I was feeling at 2am and it didn't just regurgitate generic advice — it actually got what I was going through.",
    author: "James O.",
    role: "Graduate Student",
    avatar: "JO",
    rating: 5,
    tag: "AI Therapist"
  },
  {
    quote: "The CBT coach helped me see that I was catastrophizing my work situation. Once I saw the distortion labeled out, I could actually reason my way out of it.",
    author: "Ananya K.",
    role: "Product Manager",
    avatar: "AK",
    rating: 5,
    tag: "CBT Coach"
  },
  {
    quote: "I used the AI Doctor to check a medication my grandmother was prescribed. It gave me more context than the leaflet did, and I finally understood her treatment plan.",
    author: "Marco R.",
    role: "Nurse",
    avatar: "MR",
    rating: 5,
    tag: "AI Doctor"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[activeIndex];

  return (
    <section className="relative z-10 py-20 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/20 to-transparent dark:via-teal-950/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">Real stories</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              People who
              <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-300 dark:to-emerald-300">
                showed up for themselves.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Not every journey is dramatic. Sometimes it's just a breathing exercise at 7am, or finally naming what you're feeling at midnight.
            </p>

            <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-border/50 max-w-sm">
              <div>
                <div className="text-4xl font-semibold text-foreground">4.4</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-sm font-medium text-foreground">100+ users</div>
                <div className="text-xs text-muted-foreground">tracking their wellness</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/5 dark:shadow-black/20 border border-border/50">
              <div className="absolute -top-4 -left-2 text-8xl font-serif text-teal-500/15 dark:text-teal-400/10 leading-none select-none">"</div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300">
                  {t.tag}
                </span>
              </div>

              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-medium text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-border hover:border-teal-500/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-center transition-all duration-300"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-border hover:border-teal-500/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-center transition-all duration-300"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/50">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-teal-500' : 'w-1.5 bg-border hover:bg-muted-foreground/30'}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 lg:-right-8 w-32 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 border border-amber-200/50 dark:border-amber-600/30 shadow-lg transform rotate-3 hidden sm:block" />
            <div className="absolute -top-4 -left-4 lg:-left-8 w-24 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-800/30 dark:to-emerald-800/30 border border-teal-200/50 dark:border-teal-600/30 shadow-lg transform -rotate-6 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
