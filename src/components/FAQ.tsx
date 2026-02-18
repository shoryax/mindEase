"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What can I expect from the first session?",
    answer: "Your first session is all about getting to know each other. We'll discuss what brings you to therapy, your goals, and answer any questions. There's no pressure—it's simply a conversation to see if we're a good fit.",
    category: "Getting Started"
  },
  {
    question: "How long does therapy typically take?",
    answer: "It varies for everyone. Some people find relief in 8-12 sessions, while others benefit from longer-term support. We'll regularly check in on your progress and adjust our approach as needed.",
    category: "Process"
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross, Cigna, and United Healthcare. We also offer sliding scale fees for those who need it. Your mental health shouldn't depend on your financial situation.",
    category: "Practical"
  },
  {
    question: "What's the difference between in-person and virtual sessions?",
    answer: "Both offer the same quality of care—it's really about what works for you. Virtual sessions are great for busy schedules or if you prefer the comfort of home. In-person sessions can feel more connected for some people.",
    category: "Format"
  },
  {
    question: "Is everything I share confidential?",
    answer: "Absolutely. Everything discussed in therapy is strictly confidential, protected by law. The only exceptions are if there's imminent danger to yourself or others—and we'd always discuss this with you first if possible.",
    category: "Privacy"
  },
  {
    question: "What if I need help between sessions?",
    answer: "We provide resources and coping strategies you can use anytime. For urgent matters, you can reach us via secure messaging. For emergencies, we'll ensure you have appropriate crisis resources.",
    category: "Support"
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left: Header */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">FAQ</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-6">
                Questions?
                <br />
                <span className="font-serif italic font-normal text-muted-foreground">We've got answers</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Everything you need to know about getting started. Can't find what you're looking for? Reach out directly.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-colors group"
              >
                Contact us
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right: FAQ items */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden
                      ${isOpen 
                        ? 'bg-white dark:bg-white/[0.06] border-teal-200 dark:border-teal-600/50 shadow-lg shadow-teal-500/5'
                        : 'bg-white/50 dark:bg-white/[0.03] border-border/50 hover:border-border'}
                    `}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex justify-between items-start w-full p-6 text-left gap-4"
                    >
                      <div className="flex-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-widest mb-2 block transition-colors
                          ${isOpen ? 'text-teal-600 dark:text-teal-300' : 'text-muted-foreground/60'}`}>
                          {faq.category}
                        </span>
                        <h3 className="text-base font-medium text-foreground leading-relaxed">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${isOpen 
                          ? 'bg-teal-500 text-white rotate-0' 
                          : 'bg-muted text-muted-foreground group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-border/50 mb-4" />
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
