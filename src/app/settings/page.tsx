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

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [therapistContact, setTherapistContact] = useState('');

  const settingsSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme & display preferences',
      gradient: 'from-violet-500/20 to-purple-500/20',
      settings: [
        { type: 'switch', label: 'Dark Mode', value: isDarkMode, onChange: () => setIsDarkMode(!isDarkMode) }
      ]
    },
    {
      id: 'profile',
      title: 'Profile & Privacy',
      icon: Shield,
      description: 'Manage your profile visibility and privacy settings',
      gradient: 'from-pink-500/20 to-rose-500/20',
      settings: [
        { type: 'switch', label: 'Allow Data Sharing for Research', value: true },
        { type: 'input', label: 'Emergency Contact', placeholder: 'Enter phone number', value: emergencyContact, onChange: (e) => setEmergencyContact(e.target.value) }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications & Reminders',
      icon: Bell,
      description: 'Control when and how you receive notifications',
      gradient: 'from-amber-500/20 to-orange-500/20',
      settings: [
        { type: 'switch', label: 'Daily Check-in Reminders', value: dailyReminders, onChange: () => setDailyReminders(!dailyReminders) },
        { type: 'switch', label: 'Mood Tracking Notifications', value: true },
        { type: 'switch', label: 'Crisis Resource Alerts', value: true },
        { type: 'switch', label: 'Community Activity Updates', value: false },
        { type: 'switch', label: 'Medication Reminders', value: false }
      ]
    },
    {
      id: 'wellness',
      title: 'Wellness Preferences',
      icon: Heart,
      description: 'Personalize your mental health journey',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      settings: [
        { type: 'select', label: 'Preferred Coping Strategies', options: ['breathing', 'meditation', 'journaling', 'exercise'] },
        { type: 'input', label: 'Therapist Contact', placeholder: 'Enter therapist info', value: therapistContact, onChange: (e) => setTherapistContact(e.target.value) },
        { type: 'switch', label: 'Therapy Session Reminders', value: false },
        { type: 'select', label: 'Crisis Support Level', options: ['minimal', 'moderate', 'intensive'] }
      ]
    },
    {
      id: 'location',
      title: 'Language & Location',
      icon: Globe,
      description: 'Set your language and regional preferences',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      settings: [
        { type: 'select', label: 'Language', options: ['english', 'spanish', 'french', 'german', 'chinese'] },
        { type: 'select', label: 'Timezone', options: ['ET', 'PT', 'CT', 'JT'] },
        { type: 'switch', label: 'Show Local Resources', value: true },
        { type: 'select', label: 'Cultural Considerations', options: ['Western', 'Eastern', 'Multicultural'] }
      ]
    },
    {
      id: 'data',
      title: 'Data & Security',
      icon: Database,
      description: 'Manage your data and account security',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      settings: [
        { type: 'switch', label: 'Two-Factor Authentication', value: false },
        { type: 'switch', label: 'Automatic Backup', value: true },
        { type: 'button', label: 'Export Personal Data', action: 'export' },
        { type: 'button', label: 'Delete Account', action: 'delete', variant: 'destructive' }
      ]
    },
  ];

  const renderSetting = (setting, index) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div key={index} className="flex items-center justify-between py-2">
            <Label htmlFor={`setting-${index}`} className="text-sm font-light text-white/90">
              {setting.label}
            </Label>
            <Switch
              id={`setting-${index}`}
              checked={setting.value}
              onCheckedChange={setting.onChange}
            />
          </div>
        );
      case 'select':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-light mb-2 block text-white/90">{setting.label}</Label>
            <Select defaultValue={setting.value || setting.options?.[0]}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {setting.options?.map((option) => (
                  <SelectItem key={option} value={option} className="text-white/80 focus:bg-white/10">
                    {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'input':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-light mb-2 block text-white/70">{setting.label}</Label>
            <Input
              placeholder={setting.placeholder}
              className="bg-white/5 border-white/10 text-white/80 placeholder:text-white/40"
              value={setting.value}
              onChange={setting.onChange}
            />
          </div>
        );
      case 'button':
        return (
          <div key={index} className="py-2">
            <Button
              variant={setting.variant || 'outline'}
              className={`w-full font-light ${setting.variant === 'destructive'
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
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
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
          <div className="space-y-8">
            <a href="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-light">Back to Home</span>
            </a>
            <div className="text-center mb-12">
              <h2 className="text-5xl lg:text-6xl font-light mb-4">App Settings</h2>
              <p className="text-xl text-white/60 font-light">Customize your mental health journey</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {settingsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card
                    key={section.id}
                    className={`bg-gradient-to-br ${section.gradient} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-3xl`}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/10 p-2 rounded-xl">
                          <IconComponent className="h-5 w-5 text-white/80" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-light text-white">{section.title}</CardTitle>
                          <CardDescription className="text-sm font-light text-white/60">
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
                              <Separator className="my-3 bg-white/10" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Crisis Support Card */}
            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-3xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500/20 p-2 rounded-xl">
                    <Phone className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-light text-red-300">Crisis Support</CardTitle>
                    <CardDescription className="font-light text-red-400/80">
                      24/7 emergency resources and contacts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 font-light rounded-full">
                      Crisis Hotline: 988
                    </Button>
                    <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 font-light rounded-full">
                      Text HOME to 741741
                    </Button>
                  </div>
                  <p className="text-sm text-red-400/80 font-light">
                    If you're experiencing a mental health emergency, please contact emergency services immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex flex-col items-center gap-4 pt-6">
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-full px-12 h-14 text-base border-0 font-light"
              >
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}