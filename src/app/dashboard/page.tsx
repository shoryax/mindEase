"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Search, Moon, Sun, Sunrise, Sunset, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import ActivityCard, { type Activity } from "./ActivityCard";
import QuickActions from "./QuickActions";
import SearchBar from "./SearchBar";
import StatsCards from "./StatsCards";
import HealthChatbot from "../../components/HealthChatbot";
import BreathingPacer from "../../components/BreathingPacer";
import MoodGarden from "../../components/MoodGarden";
import CommunityPulse from "../../components/CommunityPulse";
import { activities as rawActivities, dailyGoal, quotes } from "../../../data/data";

const activities: Activity[] = rawActivities.map((a: any) => ({
  ...a,
  isFavorite: false,
}));

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return { greeting: "Good night", icon: Moon, message: "Time for rest and reflection" };
  if (hour < 12) return { greeting: "Good morning", icon: Sunrise, message: "Start your day mindfully" };
  if (hour < 17) return { greeting: "Good afternoon", icon: Sun, message: "Take a mindful break" };
  if (hour < 21) return { greeting: "Good evening", icon: Sunset, message: "Wind down peacefully" };
  return { greeting: "Good night", icon: Moon, message: "Prepare for restful sleep" };
};

export default function MentalWellnessDashboard() {
  const { user, loading, displayName } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [doneToday, setDoneToday] = useState(0);
  const [weeklyCompleted, setWeeklyCompleted] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);

  const incrementCount = useCallback(async (activity: Activity) => {
    if (!user) return;
    const newCount = doneToday + 1;

    const { error } = await supabase
      .from('userStats')
      .insert({
        user_id: user.id,
        done_today: newCount,
        activity_id: activity.id,
        category: activity.category,
        created_at: new Date().toISOString()
      });

    if (!error) {
      setDoneToday(newCount);
      setWeeklyCompleted(prev => prev + 1);
    }
  }, [user, doneToday]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  }, []);

  const enrichedActivities = activities.map(a => ({
    ...a,
    isFavorite: favorites.includes(a.id),
  }));

  const filteredActivities = enrichedActivities.filter(activity => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? activity.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

      const { data: todayEntries } = await supabase
        .from('userStats')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startOfDay)
        .lt('created_at', endOfDay);

      setDoneToday(todayEntries?.length || 0);

      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const { data: weekEntries } = await supabase
        .from('userStats')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startOfWeek.toISOString());

      setWeeklyCompleted(weekEntries?.length || 0);

      const { data: favData } = await supabase
        .from("dataTable")
        .select("activity_id")
        .eq("user_id", user.id);

      if (favData) {
        setFavorites(favData.map((item: any) => item.activity_id));
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!user || favorites.length === 0) return;

    const syncFavorites = async () => {
      await supabase.from("user_favorites").delete().eq("user_id", user.id);
      await supabase.from("user_favorites").insert(
        favorites.map(activityId => ({
          user_id: user.id,
          activity_id: activityId,
        }))
      );
    };

    syncFavorites();
  }, [favorites, user]);

  const { greeting, icon: GreetingIcon, message } = getTimeBasedGreeting();
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your space...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-light text-foreground mb-4">You're not logged in</h2>
          <p className="mb-6 text-muted-foreground">Please log in to access your dashboard.</p>
          <a href="/signin">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full px-8 py-3">
              Log In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const favoriteActivities = enrichedActivities.filter(a => favorites.includes(a.id));

  return (
    <div>
      <Header />
      <main className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mt-10 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GreetingIcon className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-light text-muted-foreground">{greeting}, {displayName}</span>
          </div>
          <h2 className="text-4xl font-light text-foreground mb-2">
            What would you like to
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {" "}focus on{" "}
            </span>
            today?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-light">{message}</p>

          <div className="max-w-2xl mx-auto mb-10 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 backdrop-blur-sm">
            <p className="text-lg font-serif italic text-foreground/80 mb-2 leading-relaxed">
              "{quote.text}"
            </p>
            <p className="text-sm font-light text-muted-foreground">— {quote.author}</p>
          </div>

          <div className="flex flex-col items-center my-5 gap-6">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setShowBreathing(!showBreathing)} 
                variant="outline"
                className="rounded-full px-6 py-2 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              >
                {showBreathing ? "Close Pacer" : "Launch Breathing Pacer"}
              </Button>
            </div>
            {showBreathing && (
              <div className="mb-10 w-full max-w-md animate-in fade-in zoom-in duration-300">
                <BreathingPacer onClose={() => setShowBreathing(false)} />
              </div>
            )}
          </div>

          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <QuickActions selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>

        <StatsCards completedToday={doneToday} dailyGoal={dailyGoal} weeklyCompleted={weeklyCompleted} />

        <div className="mb-8">
          <MoodGarden weeklyCompleted={weeklyCompleted} />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-light text-foreground">
              {selectedCategory ? `${selectedCategory} Activities` : "Recommended for You"}
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onToggleFavorite={toggleFavorite}
                userId={user.id}
                incrementCount={() => incrementCount(activity)}
              />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">No activities found</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>

        {favoriteActivities.length > 0 && !selectedCategory && (
          <div className="mb-8">
            <h3 className="text-2xl font-light text-foreground mb-6">Your Favorites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteActivities.slice(0, 3).map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggleFavorite={toggleFavorite}
                  userId={user.id}
                  incrementCount={() => incrementCount(activity)}
                />
              ))}
            </div>
          </div>
        )}
        <div className="mb-8">
          <CommunityPulse />
        </div>
      </main>
      <HealthChatbot />
    </div>
  );
}
