"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do mental health cards work?",
    answer: "Our mental health cards provide quick, accessible support through guided exercises, affirmations, and coping strategies. Each card contains evidence-based techniques you can use anytime, anywhere.",
  },
  {
    question: "Are these cards a replacement for therapy?",
    answer: "No, our cards supplement, not replace, professional mental health care. They're tools for daily wellness support. If you're experiencing serious concerns, please consult a qualified professional.",
  },
  {
    question: "How often should I use the cards?",
    answer: "Use them as often as you need. Many people find daily use helpful for maintaining wellness, while others use them during challenging moments. Listen to your needs.",
  },
  {
    question: "Can I use these cards offline?",
    answer: "Yes! Once accessed, many techniques and exercises can be practiced without an internet connection. We're also working on offline app functionality.",
  },
  {
    question: "What if I'm having a mental health crisis?",
    answer: "If you're experiencing a mental health emergency, please contact emergency services (911) or the 988 Suicide & Crisis Lifeline immediately. Our cards are for ongoing support, not crisis intervention.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Find answers to common questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl overflow-hidden hover:border-black/15 dark:hover:border-white/15 transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-5 text-left"
              >
                <h3 className="text-sm font-light text-foreground pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 border-t border-black/5 dark:border-white/5 pt-3">
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
