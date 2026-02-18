"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const CATEGORY_COLORS: Record<string, string> = {
  Meditation: "#10b981",
  Breathing: "#14b8a6",
  Movement: "#3b82f6",
  Journaling: "#8b5cf6",
  Sleep: "#6366f1",
  Mindfulness: "#f59e0b",
  Therapy: "#ec4899",
  Social: "#f97316",
};

const DEFAULT_COLOR = "#64748b";

interface CategoryCount {
  category: string;
  count: number;
}

export default function CommunityPulse() {
  const [data, setData] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const { data: rows, error } = await supabase
        .from("userStats")
        .select("category")
        .gte("created_at", since);

      if (error || !rows) {
        setLoading(false);
        return;
      }

      const counts: Record<string, number> = {};
      rows.forEach((row: any) => {
        const cat = row.category || "Other";
        counts[cat] = (counts[cat] || 0) + 1;
      });

      const chartData = Object.entries(counts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      setData(chartData);
      setTotal(rows.length);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium text-foreground">Community Pulse</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Activity across the community in the last 24 hours
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10">
          <Users className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No community activity in the last 24 hours.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-64 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[entry.category] || DEFAULT_COLOR}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 w-full">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Top Categories — {total} activities
            </p>
            <div className="space-y-2.5">
              {data.slice(0, 6).map((entry) => {
                const pct = Math.round((entry.count / total) * 100);
                const color = CATEGORY_COLORS[entry.category] || DEFAULT_COLOR;
                return (
                  <div key={entry.category}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-sm text-foreground">{entry.category}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{entry.count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
