"use client";
import React, { useState } from 'react';

const FeaturedCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl lg:text-6xl font-light mb-6">what we offer</h2>
          <p className="text-xl max-w-2xl">therapy that fits your life</p>
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
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-white/10 transition-all duration-500 cursor-pointer ${hoveredCard === i ? 'scale-105 border-white/30' : ''
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
  );
};

export default FeaturedCards;