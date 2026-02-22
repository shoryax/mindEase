"use client";
import React, { useState, useEffect } from "react";
import { Brain, Loader2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import NotLoggedIn from "../../components/NotLoggedIn";

const DISTORTION_COLORS: Record<string, string> = {
  catastrophizing: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "all-or-nothing thinking": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "mind reading": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "fortune telling": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  overgeneralization: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const getDistortionColor = (d: string) => {
  const lower = d.toLowerCase();
  for (const key of Object.keys(DISTORTION_COLORS)) {
    if (lower.includes(key)) return DISTORTION_COLORS[key];
  }
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
};

interface ReframeEntry {
  id: string;
  original: string;
  distortions: string[];
  reframe: string;
  created_at: string;
}

export default function CBTPage() {
  const { user, loading } = useUser();
  const [thought, setThought] = useState("");
  const [result, setResult] = useState<{ distortions: string[]; reframe: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<ReframeEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setHistoryLoading(true);
    supabase
      .from("reframes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setHistory(data);
        setHistoryLoading(false);
      });
  }, [user]);

  const handleReframe = async () => {
    if (!thought.trim()) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/reframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reframe");

      setResult(data);

      if (user) {
        const { data: inserted } = await supabase
          .from("reframes")
          .insert({
            user_id: user.id,
            original: thought,
            distortions: data.distortions,
            reframe: data.reframe,
          })
          .select()
          .single();
        if (inserted) setHistory((prev) => [inserted, ...prev]);
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <NotLoggedIn message="Sign in to access the CBT Coach." />;
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mt-14 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <Brain className="h-4 w-4" />
            CBT Reframing Coach
          </div>
          <h1 className="text-4xl font-light text-foreground mb-2">
            Reframe Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Thoughts
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            Share a negative automatic thought and get a gentle, evidence-based reframe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Input */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 backdrop-blur-sm">
            <h2 className="text-lg font-medium text-foreground mb-4">Your Automatic Thought</h2>
            <textarea
              className="w-full h-40 p-4 rounded-xl bg-background/80 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              placeholder="e.g. I always mess everything up. Nobody likes me. This is going to be a disaster..."
              value={thought}
              onChange={(e) => setThought(e.target.value)}
            />
            <Button
              onClick={handleReframe}
              disabled={isLoading || !thought.trim()}
              className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl py-3 font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Reframing
                  <span className="animate-pulse">...</span>
                </span>
              ) : (
                "Reframe It"
              )}
            </Button>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground/60 text-center">
              AI-generated. Not a substitute for professional therapy.
            </p>
          </div>

          {/* Right: Result */}
          <div className="p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm">
            <h2 className="text-lg font-medium text-foreground mb-4">Reframed Perspective</h2>
            {result ? (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Cognitive Distortions Identified
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.distortions.map((d) => (
                      <span
                        key={d}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${getDistortionColor(d)}`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Balanced Reframe
                  </p>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                    <p className="text-foreground text-sm leading-relaxed">{result.reframe}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-10">
                <div>
                  <Brain className="h-12 w-12 text-emerald-500/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Your reframed thought will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Past Reframes
          </h2>
          {historyLoading ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No past reframes yet. Try one above!</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl border border-border/50 bg-background/50 hover:border-emerald-500/20 transition-colors"
                >
                  <p className="text-sm text-muted-foreground mb-2 italic">"{entry.original}"</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {entry.distortions.map((d) => (
                      <span
                        key={d}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getDistortionColor(d)}`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground">{entry.reframe}</p>
                  <p className="text-xs text-muted-foreground/50 mt-2">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
