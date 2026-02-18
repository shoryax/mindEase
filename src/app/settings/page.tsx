"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Shield, Palette, Heart, Globe, Database, Phone, Check, Loader2, Music, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDarkMode } from '@/components/DarkModeProvider';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabaseClient';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useUser();

  // All settings state
  const [emergencyContact, setEmergencyContact] = useState('');
  const [therapistContact, setTherapistContact] = useState('');
  const [dataSharingResearch, setDataSharingResearch] = useState(false);
  const [preferredCopingStrategy, setPreferredCopingStrategy] = useState('breathing');
  const [dailyCheckInReminders, setDailyCheckInReminders] = useState(true);
  const [moodTrackingNotifications, setMoodTrackingNotifications] = useState(true);
  const [crisisResourceAlerts, setCrisisResourceAlerts] = useState(true);
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('UTC');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [automaticBackup, setAutomaticBackup] = useState(true);

  // UI state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [soundPrefs, setSoundPrefs] = useState<Record<string, number>>({});
  const [recentDigests, setRecentDigests] = useState<{ summary: string; week_start: string; created_at: string }[]>([]);

  // Load all settings from Supabase on mount
  useEffect(() => {
    if (!user) return;

    // Load user_settings
    supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        if (data.emergency_contact != null) setEmergencyContact(data.emergency_contact);
        if (data.therapist_contact != null) setTherapistContact(data.therapist_contact);
        if (data.data_sharing_research != null) setDataSharingResearch(data.data_sharing_research);
        if (data.preferred_coping_strategy != null) setPreferredCopingStrategy(data.preferred_coping_strategy);
        if (data.daily_check_in_reminders != null) setDailyCheckInReminders(data.daily_check_in_reminders);
        if (data.mood_tracking_notifications != null) setMoodTrackingNotifications(data.mood_tracking_notifications);
        if (data.crisis_resource_alerts != null) setCrisisResourceAlerts(data.crisis_resource_alerts);
        if (data.language != null) setLanguage(data.language);
        if (data.timezone != null) setTimezone(data.timezone);
        if (data.two_factor_auth != null) setTwoFactorAuth(data.two_factor_auth);
        if (data.automatic_backup != null) setAutomaticBackup(data.automatic_backup);
      });

    // Load sound preferences
    supabase
      .from('sound_preferences')
      .select('preferences')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.preferences) setSoundPrefs(data.preferences as Record<string, number>);
      });

    // Load recent digests
    supabase
      .from('digests')
      .select('summary, week_start, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setRecentDigests(data);
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        emergency_contact: emergencyContact,
        therapist_contact: therapistContact,
        data_sharing_research: dataSharingResearch,
        preferred_coping_strategy: preferredCopingStrategy,
        daily_check_in_reminders: dailyCheckInReminders,
        mood_tracking_notifications: moodTrackingNotifications,
        crisis_resource_alerts: crisisResourceAlerts,
        language,
        timezone,
        two_factor_auth: twoFactorAuth,
        automatic_backup: automaticBackup,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      console.error('Failed to save settings:', error.message);
    }
  };

  const sectionClass = (gradient: string) =>
    `bg-gradient-to-br ${gradient} backdrop-blur-sm border border-border hover:border-foreground/20 transition-all duration-300 rounded-2xl`;

  return (
    <div className="min-h-screen">
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
          <div className="space-y-8">
            <a href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-light">Back to Dashboard</span>
            </a>

            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-3">Settings</h2>
              <p className="text-lg text-muted-foreground font-light">Customize your experience</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              {/* Appearance */}
              <Card className={sectionClass('from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Palette className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Appearance</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Theme & display preferences</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-2">
                    <Label className="text-sm font-light text-foreground/80">Dark Mode</Label>
                    <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                  </div>
                </CardContent>
              </Card>

              {/* Profile & Privacy */}
              <Card className={sectionClass('from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Shield className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Profile & Privacy</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Manage your profile visibility and privacy</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex items-center justify-between py-2">
                    <Label className="text-sm font-light text-foreground/80">Allow Data Sharing for Research</Label>
                    <Switch checked={dataSharingResearch} onCheckedChange={setDataSharingResearch} />
                  </div>
                  <Separator className="my-2 bg-border" />
                  <div className="py-2">
                    <Label className="text-sm font-light mb-2 block text-muted-foreground">Emergency Contact</Label>
                    <Input
                      placeholder="Enter phone number"
                      className="bg-black/5 dark:bg-white/5 border-border text-foreground placeholder:text-muted-foreground"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className={sectionClass('from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Bell className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Notifications</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Control when and how you receive notifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  {[
                    { label: 'Daily Check-in Reminders', value: dailyCheckInReminders, onChange: setDailyCheckInReminders },
                    { label: 'Mood Tracking Notifications', value: moodTrackingNotifications, onChange: setMoodTrackingNotifications },
                    { label: 'Crisis Resource Alerts', value: crisisResourceAlerts, onChange: setCrisisResourceAlerts },
                  ].map((item, i, arr) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-sm font-light text-foreground/80">{item.label}</Label>
                        <Switch checked={item.value} onCheckedChange={item.onChange} />
                      </div>
                      {i < arr.length - 1 && <Separator className="my-2 bg-border" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Wellness Preferences */}
              <Card className={sectionClass('from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Heart className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Wellness Preferences</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Personalize your mental health journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="py-2">
                    <Label className="text-sm font-light mb-2 block text-foreground/80">Preferred Coping Strategy</Label>
                    <Select value={preferredCopingStrategy} onValueChange={setPreferredCopingStrategy}>
                      <SelectTrigger className="bg-black/5 dark:bg-white/5 border-border text-foreground/70">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {['breathing', 'meditation', 'journaling', 'exercise'].map(o => (
                          <SelectItem key={o} value={o} className="text-foreground/70 focus:bg-foreground/5">
                            {o.charAt(0).toUpperCase() + o.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2 bg-border" />
                  <div className="py-2">
                    <Label className="text-sm font-light mb-2 block text-muted-foreground">Therapist Contact</Label>
                    <Input
                      placeholder="Enter therapist name or phone"
                      className="bg-black/5 dark:bg-white/5 border-border text-foreground placeholder:text-muted-foreground"
                      value={therapistContact}
                      onChange={(e) => setTherapistContact(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Location */}
              <Card className={sectionClass('from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Globe className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Language & Location</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Set your language and regional preferences</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="py-2">
                    <Label className="text-sm font-light mb-2 block text-foreground/80">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-black/5 dark:bg-white/5 border-border text-foreground/70">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {['english', 'spanish', 'french', 'german'].map(o => (
                          <SelectItem key={o} value={o} className="text-foreground/70 focus:bg-foreground/5">
                            {o.charAt(0).toUpperCase() + o.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2 bg-border" />
                  <div className="py-2">
                    <Label className="text-sm font-light mb-2 block text-foreground/80">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-black/5 dark:bg-white/5 border-border text-foreground/70">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {['UTC', 'ET', 'PT', 'CT', 'IST'].map(o => (
                          <SelectItem key={o} value={o} className="text-foreground/70 focus:bg-foreground/5">
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Data & Security */}
              <Card className={sectionClass('from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20')}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Database className="h-4 w-4 text-foreground/70" /></div>
                    <div>
                      <CardTitle className="text-base font-light text-foreground">Data & Security</CardTitle>
                      <CardDescription className="text-xs font-light text-muted-foreground">Manage your data and account security</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex items-center justify-between py-2">
                    <Label className="text-sm font-light text-foreground/80">Two-Factor Authentication</Label>
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                  </div>
                  <Separator className="my-2 bg-border" />
                  <div className="flex items-center justify-between py-2">
                    <Label className="text-sm font-light text-foreground/80">Automatic Backup</Label>
                    <Switch checked={automaticBackup} onCheckedChange={setAutomaticBackup} />
                  </div>
                  <Separator className="my-2 bg-border" />
                  <div className="py-2">
                    <Button variant="outline" className="w-full font-light rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground/70 border-border">
                      Export Personal Data
                    </Button>
                  </div>
                  <div className="py-2">
                    <Button variant="outline" className="w-full font-light rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sound Preferences (read-only display) */}
              {Object.keys(soundPrefs).length > 0 && (
                <Card className={sectionClass('from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20') + ' lg:col-span-2'}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><Music className="h-4 w-4 text-foreground/70" /></div>
                      <div>
                        <CardTitle className="text-base font-light text-foreground">Sound Preferences</CardTitle>
                        <CardDescription className="text-xs font-light text-muted-foreground">Your saved ambient sound volumes — adjust them on the Sounds page</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(soundPrefs).map(([id, vol]) => (
                        <div key={id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-light text-foreground/80 capitalize">{id}</span>
                            <span className="text-xs text-muted-foreground">{Math.round((vol as number) * 100)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-500"
                              style={{ width: `${(vol as number) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Digests (read-only display) */}
              {recentDigests.length > 0 && (
                <Card className={sectionClass('from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20') + ' lg:col-span-2'}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl"><BookOpen className="h-4 w-4 text-foreground/70" /></div>
                      <div>
                        <CardTitle className="text-base font-light text-foreground">Recent Digests</CardTitle>
                        <CardDescription className="text-xs font-light text-muted-foreground">Your last {recentDigests.length} AI-generated weekly summaries</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDigests.map((d, i) => (
                        <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/50">
                          <p className="text-xs text-muted-foreground mb-2">
                            Week of {new Date(d.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-sm text-foreground/80 font-light leading-relaxed line-clamp-3">{d.summary}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>

            {/* Crisis Support */}
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500/15 p-2 rounded-xl"><Phone className="h-4 w-4 text-red-500" /></div>
                  <div>
                    <CardTitle className="text-base font-light text-red-600 dark:text-red-300">Crisis Support</CardTitle>
                    <CardDescription className="text-xs font-light text-red-500/60">24/7 emergency resources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="border-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-500/10 font-light rounded-xl text-sm">
                    Crisis Hotline: 988
                  </Button>
                  <Button variant="outline" className="border-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-500/10 font-light rounded-xl text-sm">
                    Text HOME to 741741
                  </Button>
                </div>
                <p className="text-xs text-red-500/50 font-light mt-3">
                  If you're experiencing a mental health emergency, please contact emergency services immediately.
                </p>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-4 pb-8">
              <Button
                size="lg"
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full px-10 h-12 text-sm border-0 font-light disabled:opacity-60"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
                ) : saved ? (
                  <><Check className="w-4 h-4 mr-2" />Saved</>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
