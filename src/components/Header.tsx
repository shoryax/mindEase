'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import { useDarkMode } from './DarkModeProvider';

export default function Header() {
  const { user, loading, profileUrl, displayName, signOut: contextSignOut } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Sign in error:', error.message);
      router.push('/signin');
    }
  };

  const handleSignOut = async () => {
    await contextSignOut();
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link href={user ? '/dashboard' : '/'} className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-shadow">
              <img src="/healthBroken.svg" alt="Logo" className="w-4.5 h-4.5 invert" />
            </div>
            <span className="text-foreground font-semibold text-base hidden sm:inline tracking-tight">
              MindfulCare
            </span>
          </Link>

          {!user && (
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                Services
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                About
              </Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                Resources
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                Contact
              </Link>
            </nav>
          )}

          {user && (
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                Dashboard
              </Link>
            </nav>
          )}

          <nav className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>

            {!loading && (
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-border/50 transition-all"
                  >
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-medium">
                        {displayName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground hidden sm:inline">{displayName}</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-sm font-medium text-foreground">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">View your profile</p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="text-sm font-medium bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full transition-all shadow-lg shadow-foreground/10"
                >
                  Get started
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
