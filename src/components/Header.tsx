'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, Sun, Moon, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import { useDarkMode } from './DarkModeProvider';

export default function Header() {
  const { user, loading, profileUrl, displayName, signOut: contextSignOut } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    // If successful, Supabase redirects to data.url automatically
  };

  const handleSignOut = async () => {
    await contextSignOut();
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl mt-4 backdrop-blur-xl rounded-2xl z-50 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
      <div className="px-6">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/healthBroken.svg" alt="Logo" className="w-7 h-7" />
            <span className="text-foreground font-medium text-sm hidden sm:inline">
              Cards for Mental Health
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {user && (
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {!loading && (
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                      />
                    ) : (
                      <User className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground hidden sm:inline">{displayName}</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 backdrop-blur-xl bg-background/95 border border-border rounded-xl overflow-hidden shadow-2xl">
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-4 py-1.5 rounded-full border border-border transition-all"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
