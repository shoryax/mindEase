"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Palette, Heart, Globe, Database, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDarkMode } from '@/components/DarkModeProvider';

interface SettingItem {
  type: 'switch' | 'select' | 'input' | 'button';
  label: string;
  value?: boolean | string;
  onChange?: (val: any) => void;
  options?: string[];
  placeholder?: string;
  action?: string;
  variant?: string;
}

interface SettingsSection {
  id: string;
  title: string;
  icon: typeof Palette;
  description: string;
  gradient: string;
  settings: SettingItem[];
}

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [dailyReminders, setDailyReminders] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [therapistContact, setTherapistContact] = useState('');

  const settingsSections: SettingsSection[] = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme & display preferences',
      gradient: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
      settings: [
        { type: 'switch', label: 'Dark Mode', value: isDarkMode, onChange: toggleDarkMode }
      ]
    },
    {
      id: 'profile',
      title: 'Profile & Privacy',
      icon: Shield,
      description: 'Manage your profile visibility and privacy',
      gradient: 'from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20',
      settings: [
        { type: 'switch', label: 'Allow Data Sharing for Research', value: true },
        { type: 'input', label: 'Emergency Contact', placeholder: 'Enter phone number', value: emergencyContact, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmergencyContact(e.target.value) }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Control when and how you receive notifications',
      gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
      settings: [
        { type: 'switch', label: 'Daily Check-in Reminders', value: dailyReminders, onChange: () => setDailyReminders(!dailyReminders) },
        { type: 'switch', label: 'Mood Tracking Notifications', value: true },
        { type: 'switch', label: 'Crisis Resource Alerts', value: true },
      ]
    },
    {
      id: 'wellness',
      title: 'Wellness Preferences',
      icon: Heart,
      description: 'Personalize your mental health journey',
      gradient: 'from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20',
      settings: [
        { type: 'select', label: 'Preferred Coping Strategies', options: ['breathing', 'meditation', 'journaling', 'exercise'] },
        { type: 'input', label: 'Therapist Contact', placeholder: 'Enter therapist info', value: therapistContact, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTherapistContact(e.target.value) },
      ]
    },
    {
      id: 'location',
      title: 'Language & Location',
      icon: Globe,
      description: 'Set your language and regional preferences',
      gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
      settings: [
        { type: 'select', label: 'Language', options: ['english', 'spanish', 'french', 'german'] },
        { type: 'select', label: 'Timezone', options: ['ET', 'PT', 'CT', 'JT'] },
      ]
    },
    {
      id: 'data',
      title: 'Data & Security',
      icon: Database,
      description: 'Manage your data and account security',
      gradient: 'from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20',
      settings: [
        { type: 'switch', label: 'Two-Factor Authentication', value: false },
        { type: 'switch', label: 'Automatic Backup', value: true },
        { type: 'button', label: 'Export Personal Data', action: 'export' },
        { type: 'button', label: 'Delete Account', action: 'delete', variant: 'destructive' }
      ]
    },
  ];

  const renderSetting = (setting: SettingItem, index: number) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div key={index} className="flex items-center justify-between py-2">
            <Label htmlFor={`setting-${index}`} className="text-sm font-light text-foreground/80">
              {setting.label}
            </Label>
            <Switch
              id={`setting-${index}`}
              checked={setting.value as boolean}
              onCheckedChange={setting.onChange}
            />
          </div>
        );
      case 'select':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-light mb-2 block text-foreground/80">{setting.label}</Label>
            <Select defaultValue={setting.options?.[0]}>
              <SelectTrigger className="bg-black/5 dark:bg-white/5 border-border text-foreground/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {setting.options?.map(option => (
                  <SelectItem key={option} value={option} className="text-foreground/70 focus:bg-foreground/5">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'input':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-light mb-2 block text-muted-foreground">{setting.label}</Label>
            <Input
              placeholder={setting.placeholder}
              className="bg-black/5 dark:bg-white/5 border-border text-foreground placeholder:text-muted-foreground"
              value={setting.value as string}
              onChange={setting.onChange}
            />
          </div>
        );
      case 'button':
        return (
          <div key={index} className="py-2">
            <Button
              variant="outline"
              className={`w-full font-light rounded-xl ${
                setting.variant === 'destructive'
                  ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground/70 border-border'
              }`}
            >
              {setting.label}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

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
              {settingsSections.map(section => {
                const IconComponent = section.icon;
                return (
                  <Card
                    key={section.id}
                    className={`bg-gradient-to-br ${section.gradient} backdrop-blur-sm border border-border hover:border-foreground/20 transition-all duration-300 rounded-2xl`}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-black/5 dark:bg-white/10 p-2 rounded-xl">
                          <IconComponent className="h-4 w-4 text-foreground/70" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-light text-foreground">{section.title}</CardTitle>
                          <CardDescription className="text-xs font-light text-muted-foreground">
                            {section.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {section.settings.map((setting, index) => (
                          <div key={index}>
                            {renderSetting(setting, index)}
                            {index < section.settings.length - 1 && (
                              <Separator className="my-2 bg-border" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500/15 p-2 rounded-xl">
                    <Phone className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-light text-red-600 dark:text-red-300">Crisis Support</CardTitle>
                    <CardDescription className="text-xs font-light text-red-500/60">
                      24/7 emergency resources
                    </CardDescription>
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

            <div className="flex justify-center pt-4 pb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 h-12 text-sm border-0 font-light"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
