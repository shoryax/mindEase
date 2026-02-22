"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Loader2, RefreshCw, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import NotLoggedIn from "../../components/NotLoggedIn";

interface DayCount {
  day: string;
  count: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

interface WeekStats {
  totalActivities: number;
  dailyCounts: DayCount[];
  categoryCounts: CategoryCount[];
  mostActiveDay: string;
  topCategory: string;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DigestPage() {
  const { user, loading } = useUser();
  const [weekStats, setWeekStats] = useState<WeekStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    if (!user) return;
    setStatsLoading(true);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const { data: rows } = await supabase
      .from("userStats")
      .select("created_at, category")
      .eq("user_id", user.id)
      .gte("created_at", sevenDaysAgo.toISOString());

    if (!rows) {
      setStatsLoading(false);
      return;
    }

    // Build daily counts
    const dailyMap: Record<string, number> = {};
    const categoryMap: Record<string, number> = {};

    rows.forEach((row: any) => {
      const d = new Date(row.created_at);
      const dayLabel = DAY_LABELS[d.getDay()];
      dailyMap[dayLabel] = (dailyMap[dayLabel] || 0) + 1;
      const cat = row.category || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const dailyCounts: DayCount[] = DAY_LABELS.map((day) => ({
      day,
      count: dailyMap[day] || 0,
    }));

    const categoryCounts: CategoryCount[] = Object.entries(categoryMap)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    const mostActiveDay =
      dailyCounts.reduce((a, b) => (b.count > a.count ? b : a), dailyCounts[0])?.day || "—";
    const topCategory = categoryCounts[0]?.category || "—";

    setWeekStats({
      totalActivities: rows.length,
      dailyCounts,
      categoryCounts,
      mostActiveDay,
      topCategory,
    });
    setStatsLoading(false);
  };

  useEffect(() => {
    fetchStats();
    if (!user) return;
    // Load this week's saved digest
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    supabase
      .from("digests")
      .select("summary")
      .eq("user_id", user.id)
      .gte("created_at", startOfWeek.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data?.summary) setSummary(data.summary);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const generateDigest = async () => {
    if (!weekStats) return;
    setGenerating(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekStats }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setSummary(data.summary);
      // Save to Supabase
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      await supabase.from("digests").insert({
        user_id: user!.id,
        summary: data.summary,
        week_stats: weekStats,
        week_start: weekStart.toISOString().split("T")[0],
      });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setGenerating(false);
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
    return <NotLoggedIn message="Sign in to view your Weekly Digest." />;
  }

  return (
    <div>
      <Header />
      <main className="max-w-5xl mt-14 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Weekly Digest
          </div>
          <h1 className="text-4xl font-light text-foreground mb-2">
            Your Week in{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Wellness
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            A personalized look at your last 7 days of mental wellness activities.
          </p>
        </div>

        {statsLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : weekStats ? (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Activities", value: weekStats.totalActivities },
                { label: "Most Active Day", value: weekStats.mostActiveDay },
                { label: "Top Category", value: weekStats.topCategory },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl border border-border/50 bg-background/50 text-center"
                >
                  <p className="text-2xl font-light text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="p-6 rounded-2xl border border-border/50 bg-background/50 mb-8">
              <h2 className="text-base font-medium text-foreground mb-4">Daily Activity</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekStats.dailyCounts} barCategoryGap="30%">
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12, fill: "currentColor" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: "currentColor" }}
                      axisLine={false}
                      tickLine={false}
                      width={24}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {weekStats.dailyCounts.map((entry, i) => (
                        <Cell
                          key={entry.day}
                          fill={entry.count > 0 ? "#10b981" : "#e5e7eb"}
                          opacity={entry.count > 0 ? 1 : 0.4}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category breakdown */}
            {weekStats.categoryCounts.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/50 bg-background/50 mb-8">
                <h2 className="text-base font-medium text-foreground mb-4">Category Breakdown</h2>
                <div className="space-y-3">
                  {weekStats.categoryCounts.map((c) => {
                    const pct = Math.round((c.count / weekStats.totalActivities) * 100);
                    return (
                      <div key={c.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{c.category}</span>
                          <span className="text-muted-foreground">{c.count} ({pct}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Generate Digest */}
            <div className="text-center mb-6">
              <Button
                onClick={generateDigest}
                disabled={generating}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full px-8 py-3 font-medium"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating
                    <span className="animate-pulse">...</span>
                  </span>
                ) : summary ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Digest
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Digest
                  </span>
                )}
              </Button>
              {error && (
                <p className="text-red-500 text-sm mt-3">{error}</p>
              )}
            </div>

            {summary && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-base font-medium text-foreground">Your Personal Digest</h2>
                </div>
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {summary}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No activity data found for the past 7 days.</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Complete some activities on your dashboard first!</p>
          </div>
        )}
      </main>
    </div>
  );
}
