import React from "react";

export default function Stats() {
  return (
    <section className="relative z-10 px-6 lg:px-12 pb-22">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '0.6k+', label: 'people helped' },
              { value: '0.7yr', label: 'experience' },
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
  )
};