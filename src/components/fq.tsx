"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do mental health cards work?",
      answer:
        "Our mental health cards are designed to provide quick, accessible support through guided exercises, affirmations, and coping strategies. Each card contains evidence-based techniques that you can use anytime, anywhere.",
    },
    {
      question: "Are these cards a replacement for therapy?",
      answer:
        "No, our cards are meant to supplement, not replace, professional mental health care. They're tools for daily wellness support. If you're experiencing serious mental health concerns, please consult with a qualified mental health professional.",
    },
    {
      question: "How often should I use the cards?",
      answer:
        "You can use the cards as often as you need them. Many people find daily use helpful for maintaining mental wellness, while others use them during challenging moments. Listen to your needs and use them at your own pace.",
    },
    {
      question: "Can I use these cards offline?",
      answer:
        "Yes! Once you've accessed the cards, many of the techniques and exercises can be practiced without an internet connection. We're also working on offline functionality for the app.",
    },
    {
      question: "Are the cards suitable for all ages?",
      answer:
        "Our cards are designed primarily for adults and teens (13+). Some content may not be appropriate for younger children. We recommend parental guidance for users under 16.",
    },
    {
      question: "What if I'm having a mental health crisis?",
      answer:
        "If you're experiencing a mental health emergency, please contact emergency services (911) or a crisis hotline immediately. Our cards are for ongoing support, not crisis intervention.",
    },
  ];

  return (
    <section className="relative z-10 py-22 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-light text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/60 font-light">
            Find answers to common questions about our mental health resources
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <h3 className="text-lg font-light text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 border-t border-white/10 pt-4">
                  <p className="text-white/70 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/60 mb-6 font-light">
            Still have questions? We're here to help.
          </p>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-8 py-3 rounded-full font-light text-white transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}