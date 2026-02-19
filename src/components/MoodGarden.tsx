"use client";
import React from "react";

interface MoodGardenProps {
  weeklyCompleted: number;
}

type Stage = {
  name: string;
  next: number | null;
  motivational: string;
};

const STAGES: Stage[] = [
  { name: "Seed", next: 1, motivational: "Every journey begins with a single step." },
  { name: "Sprout", next: 4, motivational: "You're growing! Keep nurturing yourself." },
  { name: "Sapling", next: 8, motivational: "Roots are forming. Stay consistent!" },
  { name: "Young Plant", next: 13, motivational: "Blossoming beautifully. You're thriving!" },
  { name: "Blooming", next: null, motivational: "In full bloom — you're doing amazing!" },
];

function getStage(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
}

// Stage 0: Seed
function Seed() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transition-all duration-700">
      {/* Soil */}
      <ellipse cx="100" cy="170" rx="60" ry="12" fill="#8B6914" opacity="0.4" />
      {/* Seed */}
      <ellipse cx="100" cy="158" rx="12" ry="8" fill="#A0522D" />
      <ellipse cx="100" cy="155" rx="6" ry="4" fill="#C68642" opacity="0.6" />
    </svg>
  );
}

// Stage 1: Sprout
function Sprout() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transition-all duration-700">
      <ellipse cx="100" cy="170" rx="60" ry="12" fill="#8B6914" opacity="0.4" />
      {/* Stem */}
      <line x1="100" y1="165" x2="100" y2="130" stroke="#4a7c3f" strokeWidth="4" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M100 148 Q80 138 78 125 Q90 128 100 140" fill="#5fa84a" opacity="0.9" />
      {/* Right leaf */}
      <path d="M100 148 Q120 138 122 125 Q110 128 100 140" fill="#6bbf56" opacity="0.9" />
    </svg>
  );
}

// Stage 2: Sapling
function Sapling() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transition-all duration-700">
      <ellipse cx="100" cy="172" rx="60" ry="12" fill="#8B6914" opacity="0.4" />
      {/* Stem */}
      <line x1="100" y1="170" x2="100" y2="110" stroke="#4a7c3f" strokeWidth="5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M100 155 Q72 140 70 120 Q88 124 100 142" fill="#5fa84a" />
      <path d="M100 155 Q128 140 130 120 Q112 124 100 142" fill="#6bbf56" />
      <path d="M100 130 Q76 115 74 98 Q90 103 100 120" fill="#5fa84a" />
      <path d="M100 130 Q124 115 126 98 Q110 103 100 120" fill="#6bbf56" />
    </svg>
  );
}

// Stage 3: Young Plant
function YoungPlant() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transition-all duration-700">
      <ellipse cx="100" cy="174" rx="65" ry="12" fill="#8B6914" opacity="0.4" />
      {/* Trunk */}
      <rect x="96" y="120" width="8" height="54" rx="4" fill="#6B4F2A" />
      {/* Branches */}
      <line x1="100" y1="145" x2="72" y2="125" stroke="#5a7c3f" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="145" x2="128" y2="125" stroke="#5a7c3f" strokeWidth="4" strokeLinecap="round" />
      {/* Leaf clusters */}
      <circle cx="72" cy="118" r="16" fill="#5fa84a" opacity="0.85" />
      <circle cx="128" cy="118" r="16" fill="#6bbf56" opacity="0.85" />
      <circle cx="100" cy="108" r="20" fill="#4a9e40" opacity="0.9" />
      {/* Buds */}
      <circle cx="60" cy="108" r="6" fill="#e8d44d" opacity="0.8" />
      <circle cx="140" cy="108" r="6" fill="#e8d44d" opacity="0.8" />
    </svg>
  );
}

// Stage 4: Blooming
function Blooming() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transition-all duration-700">
      <ellipse cx="100" cy="176" rx="68" ry="12" fill="#8B6914" opacity="0.4" />
      {/* Trunk */}
      <rect x="96" y="118" width="8" height="58" rx="4" fill="#6B4F2A" />
      {/* Branches */}
      <line x1="100" y1="148" x2="65" y2="122" stroke="#5a7c3f" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="148" x2="135" y2="122" stroke="#5a7c3f" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="135" x2="100" y2="108" stroke="#5a7c3f" strokeWidth="3" strokeLinecap="round" />
      {/* Leaf clusters */}
      <circle cx="60" cy="115" r="20" fill="#4a9e40" opacity="0.9" />
      <circle cx="140" cy="115" r="20" fill="#5ab84a" opacity="0.9" />
      <circle cx="100" cy="102" r="24" fill="#3d9135" opacity="0.9" />
      {/* Flowers */}
      {/* Flower 1 */}
      <circle cx="50" cy="100" r="7" fill="#ff7eb3" opacity="0.9" />
      <circle cx="50" cy="100" r="3" fill="#fff3b0" />
      {/* Flower 2 */}
      <circle cx="150" cy="100" r="7" fill="#ff9f7e" opacity="0.9" />
      <circle cx="150" cy="100" r="3" fill="#fff3b0" />
      {/* Flower 3 */}
      <circle cx="100" cy="82" r="9" fill="#c77dff" opacity="0.9" />
      <circle cx="100" cy="82" r="4" fill="#fff3b0" />
      {/* Flower 4 */}
      <circle cx="75" cy="90" r="6" fill="#ffd166" opacity="0.9" />
      <circle cx="75" cy="90" r="2.5" fill="#fff3b0" />
      {/* Flower 5 */}
      <circle cx="125" cy="90" r="6" fill="#06d6a0" opacity="0.9" />
      <circle cx="125" cy="90" r="2.5" fill="#fff3b0" />
    </svg>
  );
}

const STAGE_COMPONENTS = [Seed, Sprout, Sapling, YoungPlant, Blooming];

export default function MoodGarden({ weeklyCompleted }: MoodGardenProps) {
  const stageIndex = getStage(weeklyCompleted);
  const stage = STAGES[stageIndex];
  const StageComponent = STAGE_COMPONENTS[stageIndex];
  const progressToNext = stage.next
    ? Math.min((weeklyCompleted / stage.next) * 100, 100)
    : 100;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🌱</span>
        <h3 className="text-lg font-medium text-foreground">Your Mood Garden</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Plant */}
        <div className="w-32 h-32 flex-shrink-0">
          <StageComponent />
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">{stage.name}</span>
            <span className="text-xs text-muted-foreground">{weeklyCompleted} activities this week</span>
          </div>

          {stage.next && (
            <>
              <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mb-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-700"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {stage.next - weeklyCompleted} more to reach next stage
              </p>
            </>
          )}

          <p className="text-sm text-muted-foreground italic">{stage.motivational}</p>
        </div>
      </div>
    </div>
  );
}
