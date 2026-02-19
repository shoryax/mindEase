"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Leaf, Heart, Moon, BookOpen, Zap } from "lucide-react";

const quickActions = [
  { icon: Brain, label: "Meditation", category: "meditation" },
  { icon: Leaf, label: "Breathing", category: "breathing" },
  { icon: Heart, label: "Mindfulness", category: "mindfulness" },
  { icon: Moon, label: "Sleep", category: "sleep" },
  { icon: BookOpen, label: "Journaling", category: "journal" },
  { icon: Zap, label: "Exercise", category: "exercise" },
];

interface QuickActionsProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function QuickActions({ selectedCategory, setSelectedCategory }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {quickActions.map(action => (
        <Button
          key={action.category}
          variant="outline"
          className={`rounded-full border transition-all duration-200 ${
            selectedCategory === action.category
              ? "bg-foreground/10 border-foreground/20 text-foreground"
              : "bg-black/5 dark:bg-white/5 border-border text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground"
          }`}
          onClick={() =>
            setSelectedCategory(selectedCategory === action.category ? null : action.category)
          }
        >
          <action.icon className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
