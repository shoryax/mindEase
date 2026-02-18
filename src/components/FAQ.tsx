"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is MindEase?",
    answer: "MindEase is an AI-powered mental wellness platform. It gives you tools to track your mood, reframe negative thoughts with CBT techniques, talk to an empathetic AI therapist, analyze medicines, and create a calming sound environment — all without needing an appointment.",
    category: "About"
  },
  {
    question: "How does the AI Therapist (HealthPal) work?",
    answer: "HealthPal uses NLP sentiment analysis and large language models to detect your emotional state from what you write. It identifies emotions, their intensity, and responds with empathetic, CBT-informed guidance. It also saves your session history so you can track your patterns over time.",
    category: "Features"
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes. All your data is stored securely in Supabase with Row Level Security enabled — meaning only you can access your own data. We don't sell your data, and your conversations with HealthPal are never used to train models without consent.",
    category: "Privacy"
  },
  {
    question: "What is the CBT Coach?",
    answer: "The CBT (Cognitive Behavioral Therapy) Coach takes a negative thought you're experiencing and identifies the cognitive distortions present — like catastrophizing or all-or-nothing thinking — then offers a balanced, realistic reframe. It's based on established therapeutic techniques.",
    category: "Features"
  },
  {
    question: "Do I need to pay to use MindEase?",
    answer: "MindEase is free to get started. You can access the dashboard, mood tracking, breathing pacer, and sound mixer without any subscription. Some AI-powered features (HealthPal, CBT Coach, AI Doctor, Weekly Digest) require a free account.",
    category: "Pricing"
  },
  {
    question: "Is this a replacement for professional therapy?",
    answer: "No. MindEase is a self-care and mental wellness tool, not a clinical service. It's designed to support your mental health between (or instead of) professional sessions — for everyday stress, anxiety management, and building healthy habits. For serious mental health conditions, please consult a licensed professional.",
    category: "Important"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-300">FAQ</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-6">
                Good questions.
                <br />
                <span className="font-serif italic font-normal text-muted-foreground">straight answers.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Everything you need to know before you begin. Still curious? Reach out anytime.
              </p>
              <a
                href="mailto:hello@mindease.app"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-colors group"
              >
                Contact us
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </div>
          </div>

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
                          ? 'bg-teal-500 text-white'
                          : 'bg-muted text-muted-foreground group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-border/50 mb-4" />
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
