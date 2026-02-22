"use client";
import React, { useState, useRef, useEffect } from "react";
import { Loader2, Send, Heart, Sparkles, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import NotLoggedIn from "../../components/NotLoggedIn";

interface HealthPalResult {
  sentiment: "positive" | "negative" | "neutral";
  emotions: string[];
  intensity: "low" | "medium" | "high";
  response: string;
  suggestion: string;
}

interface Session {
  id: string;
  message: string;
  result: HealthPalResult;
  created_at: string;
}

const SENTIMENT_CONFIG = {
  positive: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", dot: "bg-emerald-500" },
  negative: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", dot: "bg-red-500" },
  neutral: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", dot: "bg-blue-500" },
};

const INTENSITY_CONFIG = {
  low: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
};

const EMOTION_COLORS = [
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
];

export default function HealthPalPage() {
  const { user, loading } = useUser();
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<HealthPalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [dots, setDots] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typing animation
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Load session history
  useEffect(() => {
    if (!user) return;
    supabase
      .from("healthpal_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => { if (data) setSessions(data); });
  }, [user]);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/healthpal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);

      if (user) {
        const { data: inserted } = await supabase
          .from("healthpal_sessions")
          .insert({ user_id: user.id, message, result: data })
          .select()
          .single();
        if (inserted) setSessions((prev) => [inserted, ...prev]);
      }
      setMessage("");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <NotLoggedIn message="Sign in to use HealthPal." />;
  }

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium">
            <Heart className="h-4 w-4" />
            MyHealthPal — AI Therapist
          </div>
          <h1 className="text-4xl font-light text-foreground mb-2">
            Share what's on{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">your mind</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            Powered by NLP sentiment analysis and empathetic AI. Speak freely — this is your space.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10">
            <h2 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-rose-500" />
              How are you feeling today?
            </h2>
            <textarea
              ref={textareaRef}
              className="w-full h-44 p-4 rounded-xl bg-background/80 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all"
              placeholder="Share anything — stress, anxiety, a difficult situation, or just how your day is going. I'm here to listen without judgment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground/50">⌘ + Enter to send</p>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !message.trim()}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl px-5 py-2 font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing{dots}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send
                  </span>
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground/50 text-center">
              AI-powered support. Not a substitute for professional therapy.
            </p>
          </div>

          {/* Result */}
          <div className="p-6 rounded-2xl border border-border/50 bg-background/50">
            <h2 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-rose-500" />
              Analysis & Response
            </h2>
            {result ? (
              <div className="space-y-5">
                {/* Sentiment + Intensity */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium capitalize ${SENTIMENT_CONFIG[result.sentiment].color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${SENTIMENT_CONFIG[result.sentiment].dot}`} />
                    {result.sentiment} sentiment
                  </span>
                  <span className={`text-xs font-medium capitalize ${INTENSITY_CONFIG[result.intensity]}`}>
                    {result.intensity} intensity
                  </span>
                </div>

                {/* Emotions */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Emotions detected</p>
                  <div className="flex flex-wrap gap-2">
                    {result.emotions.map((e, i) => (
                      <span key={e} className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${EMOTION_COLORS[i % EMOTION_COLORS.length]}`}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Therapist response */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Therapist response</p>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                    <p className="text-sm text-foreground leading-relaxed">{result.response}</p>
                  </div>
                </div>

                {/* Suggestion */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Try this</p>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">{result.suggestion}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center py-12 text-center">
                <div>
                  <Heart className="h-12 w-12 text-rose-400/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Your analysis will appear here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Session History */}
        {sessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-foreground mb-5">Past Sessions</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {sessions.map((s) => (
                <div key={s.id} className="p-5 rounded-2xl border border-border/50 bg-background/50 hover:border-rose-500/20 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-sm text-muted-foreground italic line-clamp-2">"{s.message}"</p>
                    <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium capitalize ${SENTIMENT_CONFIG[s.result?.sentiment ?? "neutral"].color}`}>
                      {s.result?.sentiment}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {s.result?.emotions?.map((e: string, i: number) => (
                      <span key={e} className={`text-xs px-2 py-0.5 rounded-full capitalize ${EMOTION_COLORS[i % EMOTION_COLORS.length]}`}>{e}</span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">{s.result?.response}</p>
                  <p className="text-xs text-muted-foreground/50 mt-2">{new Date(s.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
