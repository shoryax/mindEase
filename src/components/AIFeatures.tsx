"use client";
import React, { useState } from "react";
import { ArrowUpRight, Heart, Stethoscope, Brain, Camera, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AIFeatures() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-rose-400/8 via-pink-300/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/8 via-cyan-300/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-rose-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-rose-600 dark:text-rose-400">AI-powered</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Meet your AI
              <br />
              <span className="font-serif italic font-normal text-muted-foreground">health companions</span>
            </h2>
          </div>
          <div className="lg:flex items-end justify-end hidden">
            <p className="text-muted-foreground max-w-sm text-right leading-relaxed">
              Two intelligent tools — one for your mind, one for your medicine cabinet.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">

          {/* MyHealthPal */}
          <Link href="/healthpal">
            <div
              onMouseEnter={() => setHovered("healthpal")}
              onMouseLeave={() => setHovered(null)}
              className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden
                bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/40 dark:to-pink-900/40
                border-rose-200/50 dark:border-rose-700/50
                ${hovered === "healthpal" ? "shadow-2xl shadow-rose-500/15 scale-[1.02] border-rose-300 dark:border-rose-600" : "shadow-sm"}
              `}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30">
                  <Heart className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-semibold text-foreground">MyHealthPal</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-rose-500 text-white rounded-full">New</span>
                    </div>
                    <p className="text-sm text-rose-600 dark:text-rose-300 font-medium">AI Therapist & Sentiment Analyst</p>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 text-rose-400 transition-all duration-300 flex-shrink-0 mt-1 ${hovered === "healthpal" ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-40"}`} />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Share your thoughts freely. Our NLP model detects your emotional state, identifies what you're feeling,
                  and responds like a compassionate therapist — available 24/7, no appointments needed.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: Brain, label: "Sentiment Analysis" },
                    { icon: MessageCircle, label: "Emotion Detection" },
                    { icon: Sparkles, label: "CBT-Informed" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-rose-200/50 dark:border-rose-700/50 text-foreground/70 font-medium">
                      <Icon className="w-3 h-3 text-rose-500" />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Mock UI preview */}
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-rose-200/40 dark:border-rose-700/40">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-foreground">HealthPal is listening...</span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["😔 Anxious", "😤 Overwhelmed", "💭 Reflective"].map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* AI Doctor */}
          <Link href="/ai-doctor">
            <div
              onMouseEnter={() => setHovered("aidoctor")}
              onMouseLeave={() => setHovered(null)}
              className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden
                bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40
                border-blue-200/50 dark:border-blue-700/50
                ${hovered === "aidoctor" ? "shadow-2xl shadow-blue-500/15 scale-[1.02] border-blue-300 dark:border-blue-600" : "shadow-sm"}
              `}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-semibold text-foreground">AI Doctor</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-blue-500 text-white rounded-full">New</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Medicine Vision Analyzer</p>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 text-blue-400 transition-all duration-300 flex-shrink-0 mt-1 ${hovered === "aidoctor" ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-40"}`} />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Point your camera at any medicine packaging. Powered by GPT-4o vision, it instantly identifies the medication,
                  explains its uses, dosage, side effects, and warnings — like having a doctor in your pocket.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: Camera, label: "Live Camera" },
                    { icon: Stethoscope, label: "GPT-4o Vision" },
                    { icon: Sparkles, label: "Instant Analysis" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-blue-200/50 dark:border-blue-700/50 text-foreground/70 font-medium">
                      <Icon className="w-3 h-3 text-blue-500" />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Mock UI preview */}
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-blue-200/40 dark:border-blue-700/40">
                  <div className="flex items-center gap-2 mb-3">
                    <Camera className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-foreground">Scanning medicine...</span>
                    <div className="ml-auto h-1.5 w-20 rounded-full bg-blue-100 dark:bg-blue-900/50 overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {["✓ Name identified", "✓ Dosage extracted", "⚠ 2 warnings found"].map((line, i) => (
                      <p key={i} className="text-[11px] text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
