"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";
import { TrendingUp, Sparkles } from "lucide-react";

interface StatsCardsProps {
  completedToday: number;
  dailyGoal: number;
  weeklyCompleted: number;
}

export default function StatsCards({ completedToday, dailyGoal, weeklyCompleted }: StatsCardsProps) {
  const progressPercentage = Math.floor((completedToday / dailyGoal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-border rounded-2xl hover:border-foreground/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-sm font-light text-muted-foreground">Daily Progress</p>
            <p className="text-3xl font-light text-foreground">
              {completedToday}<span className="text-muted-foreground">/{dailyGoal}</span>
            </p>
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
              activities completed
            </span>
            <CircularProgress value={progressPercentage} size={64} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-border rounded-2xl hover:border-foreground/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground">This Week</p>
              <p className="text-2xl font-light text-foreground">{weeklyCompleted}</p>
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 mt-1">
                keep going
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-border rounded-2xl hover:border-foreground/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
              <Sparkles className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground">Streak</p>
              <p className="text-2xl font-light text-foreground">0 days</p>
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/20 mt-1">
                Keep it up!
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
