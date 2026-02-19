"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function BreathingPacer({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Hold ">("Inhale");
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case "Inhale": return "Hold";
              case "Hold": return "Exhale";
              case "Exhale": return "Hold ";
              default: return "Inhale";
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background/40 backdrop-blur-md rounded-3xl border border-emerald-500/20 shadow-xl overflow-hidden relative">
      <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-emerald-500/10 rounded-full transition-colors">
        <X className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Animated Circle */}
        <div 
          className={`absolute rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20 blur-xl transition-all duration-[4000ms] ease-in-out ${
            phase === "Inhale" ? "scale-150" : phase === "Exhale" ? "scale-75" : "scale-100"
          }`}
        />
        <div 
          className={`relative w-32 h-32 rounded-full border-4 border-emerald-500/30 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            phase === "Inhale" ? "scale-150 shadow-[0_0_60px_rgba(16,185,129,0.3)]" : phase === "Exhale" ? "scale-75 shadow-none" : "scale-100 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          }`}
        >
          <div className="text-center">
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg leading-none">{phase.trim()}</p>
            <p className="text-muted-foreground text-sm mt-1">{counter}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-light text-foreground mb-1">Box Breathing</h3>
        <p className="text-xs text-muted-foreground max-w-[200px]">Follow the circle to regulate your nervous system.</p>
      </div>
    </div>
  );
}
