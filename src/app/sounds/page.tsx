"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CloudRain,
  Trees,
  Waves,
  Wind,
  Flame,
  MoonStar,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import { Button } from "@/components/ui/button";

interface Sound {
  id: string;
  name: string;
  file: string;
  icon: React.ComponentType<any>;
  color: string;
}

const SOUNDS: Sound[] = [
  { id: "rain", name: "Rain", file: "/sounds/rain.mp3", icon: CloudRain, color: "from-blue-400 to-cyan-500" },
  { id: "forest", name: "Forest Birds", file: "/sounds/forest.mp3", icon: Trees, color: "from-green-400 to-emerald-500" },
  { id: "ocean", name: "Ocean Waves", file: "/sounds/ocean.mp3", icon: Waves, color: "from-teal-400 to-blue-500" },
  { id: "whitenoise", name: "White Noise", file: "/sounds/whitenoise.mp3", icon: Wind, color: "from-gray-400 to-slate-500" },
  { id: "fireplace", name: "Fireplace", file: "/sounds/fireplace.mp3", icon: Flame, color: "from-orange-400 to-red-500" },
  { id: "crickets", name: "Night Crickets", file: "/sounds/crickets.mp3", icon: MoonStar, color: "from-indigo-400 to-purple-500" },
];

const STORAGE_KEY = "mindfulcare_sound_volumes";

function loadVolumes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveVolumes(volumes: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volumes));
}

export default function SoundsPage() {
  const { user, loading } = useUser();
  const howlsRef = useRef<Record<string, any>>({});
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [howlerLoaded, setHowlerLoaded] = useState(false);
  const [missingFiles, setMissingFiles] = useState(false);

  // Load Howler dynamically (client-only)
  useEffect(() => {
    import("howler").then(() => setHowlerLoaded(true));
  }, []);

  useEffect(() => {
    if (!howlerLoaded) return;
    const saved = loadVolumes();
    const initialVolumes: Record<string, number> = {};
    SOUNDS.forEach((s) => {
      initialVolumes[s.id] = saved[s.id] ?? 0.5;
    });
    setVolumes(initialVolumes);
  }, [howlerLoaded]);

  // Create Howl instances once volumes are ready
  useEffect(() => {
    if (!howlerLoaded || Object.keys(volumes).length === 0) return;
    const { Howl } = require("howler");

    SOUNDS.forEach((s) => {
      if (!howlsRef.current[s.id]) {
        howlsRef.current[s.id] = new Howl({
          src: [s.file],
          loop: true,
          volume: volumes[s.id] ?? 0.5,
          onloaderror: () => setMissingFiles(true),
        });
      }
    });

    return () => {
      Object.values(howlsRef.current).forEach((h: any) => h.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [howlerLoaded]);

  const toggle = (id: string) => {
    const howl = howlsRef.current[id];
    if (!howl) return;
    if (active[id]) {
      howl.pause();
      setActive((prev) => ({ ...prev, [id]: false }));
    } else {
      howl.play();
      setActive((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleVolume = (id: string, value: number) => {
    const howl = howlsRef.current[id];
    if (howl) howl.volume(value);
    setVolumes((prev) => {
      const next = { ...prev, [id]: value };
      saveVolumes(next);
      return next;
    });
  };

  const anyActive = Object.values(active).some(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-light text-foreground mb-4">You're not logged in</h2>
          <p className="mb-6 text-muted-foreground">Please log in to access the Sound Mixer.</p>
          <a href="/signin">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full px-8 py-3">
              Log In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mt-14 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <Music className="h-4 w-4" />
            Ambient Sound Mixer
          </div>
          <h1 className="text-4xl font-light text-foreground mb-2">
            Find Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Calm
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            Layer ambient sounds to create your perfect mindful environment.
          </p>
          {anyActive && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-pulse">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              Now Playing
            </div>
          )}
        </div>

        {missingFiles && (
          <div className="mb-8 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300 text-sm">
            <p className="font-medium mb-2">Sound files not found.</p>
            <p>Please add the following MP3 files to your <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs">public/sounds/</code> directory:</p>
            <ul className="mt-2 list-disc list-inside space-y-0.5 opacity-80">
              {SOUNDS.map((s) => <li key={s.id}><code className="text-xs">{s.file.replace("/sounds/", "")}</code></li>)}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOUNDS.map((sound) => {
            const Icon = sound.icon;
            const isOn = active[sound.id] || false;
            const vol = volumes[sound.id] ?? 0.5;

            return (
              <div
                key={sound.id}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isOn
                    ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 shadow-lg shadow-emerald-500/10"
                    : "border-border/50 bg-background/50 hover:border-emerald-500/20"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sound.color} flex items-center justify-center shadow-md`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">{sound.name}</span>
                  </div>
                  <button
                    onClick={() => toggle(sound.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isOn
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600"
                        : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"
                    }`}
                    aria-label={isOn ? "Pause" : "Play"}
                  >
                    {isOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Volume</span>
                    <span className="text-xs text-muted-foreground">{Math.round(vol * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={vol}
                    onChange={(e) => handleVolume(sound.id, parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-black/10 dark:bg-white/10 cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-10">
          Volume preferences are saved to your browser automatically.
        </p>
      </main>
    </div>
  );
}
