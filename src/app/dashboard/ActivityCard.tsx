import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Leaf, Moon, BookOpen, Zap, Play, Star, Clock, X } from "lucide-react";

export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  tags: string[];
  difficulty: string;
  isFavorite: boolean;
  category: string;
  link?: string;
}

interface ActivityCardProps {
  activity: Activity;
  onToggleFavorite: (id: string) => void;
  userId: string;
  incrementCount(): void;
}

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    meditation: "from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20",
    breathing: "from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20",
    mindfulness: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
    sleep: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
    journal: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
    exercise: "from-lime-500/10 to-emerald-500/10 dark:from-lime-500/20 dark:to-emerald-500/20",
  };
  return gradients[category] || "from-gray-500/10 to-slate-500/10 dark:from-gray-500/20 dark:to-slate-500/20";
};

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20",
    advanced: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
  };
  return colors[difficulty] || "bg-gray-500/10 text-gray-600 dark:text-gray-300 border-gray-500/20";
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, typeof Heart> = {
    meditation: Brain,
    breathing: Leaf,
    mindfulness: Heart,
    sleep: Moon,
    journal: BookOpen,
    exercise: Zap,
  };
  return icons[category] || Heart;
};

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] || "";
}

export default function ActivityCard({ activity, userId, onToggleFavorite, incrementCount }: ActivityCardProps) {
  const [showModal, setShowModal] = useState(false);
  const Icon = getCategoryIcon(activity.category);

  const handleStart = () => {
    if (!userId) return;
    incrementCount();
    setShowModal(true);
  };

  return (
    <>
      <Card className={`rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br ${getCategoryGradient(activity.category)} backdrop-blur-sm hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full min-h-[320px]`}>
        <CardContent className="p-6 flex flex-col gap-3 flex-grow">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
              <Icon className="h-5 w-5 text-foreground/70" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => onToggleFavorite(activity.id)}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  activity.isFavorite
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground hover:text-amber-400"
                }`}
              />
            </Button>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-foreground text-lg leading-tight mb-1">{activity.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
              {activity.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{activity.duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-2">
              {activity.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-black/5 dark:bg-white/10 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button
              size="sm"
              className="bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-full px-4 border border-border"
              onClick={handleStart}
            >
              <Play className="h-3.5 w-3.5 mr-1.5" />
              Start
            </Button>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowModal(false)}>
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-full max-w-3xl mx-4" onClick={e => e.stopPropagation()}>
            {activity.link ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-foreground">{activity.title}</h4>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(activity.link)}?autoplay=1&rel=0`}
                    title={activity.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Play className="h-6 w-6 text-foreground/70" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">Activity Started!</h4>
                <p className="text-muted-foreground mb-6">You have started: <span className="text-foreground font-medium">{activity.title}</span></p>
                <Button
                  className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-foreground rounded-full px-6 border border-border"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
