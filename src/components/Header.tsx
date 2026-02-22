'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Settings, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import { useDarkMode } from './DarkModeProvider';

export default function Header() {
  const { user, loading, profileUrl, displayName, signOut: contextSignOut } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleSignOut = async () => {
    await contextSignOut();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const loggedOutLinks = [
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  const loggedInLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/healthpal', label: 'HealthPal' },
    { href: '/ai-doctor', label: 'AI Doctor' },
    { href: '/cbt', label: 'CBT' },
    { href: '/sounds', label: 'Sounds' },
    { href: '/digest', label: 'Digest' },
  ];

  const navLinks = user ? loggedInLinks : loggedOutLinks;

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-500 w-full max-w-fit ${
            scrolled
              ? 'bg-background/95 backdrop-blur-2xl border border-border/80 shadow-2xl shadow-black/10 dark:shadow-black/40'
              : 'bg-background/75 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5'
          }`}
        >
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-shadow">
              <img src="/healthBroken.svg" alt="Logo" className="w-3.5 h-3.5 invert" />
            </div>
            <span className="text-foreground font-semibold text-sm tracking-tight">MindEase</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-border/60 flex-shrink-0" />

          {/* Desktop nav */}
          {!user && (
            <nav className="hidden lg:flex items-center gap-0.5">
              {loggedOutLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                  {label}
                </Link>
              ))}
            </nav>
          )}
          {user && (
            <nav className="hidden lg:flex items-center gap-0.5">
              {loggedInLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium">
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-4 bg-border/60 flex-shrink-0" />

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {/* Logged in — avatar + desktop dropdown */}
            {!loading && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                  {profileUrl ? (
                    <img src={profileUrl} alt="Profile" className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-medium">
                      {displayName?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                  <ChevronDown className="h-3 w-3 text-muted-foreground hidden lg:block" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-900 border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
                    <div className="px-4 py-3 border-b border-border/50">
                      <p className="text-sm font-medium text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">Your account</p>
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
            )}

            {/* Logged out — get started (desktop) + hamburger (mobile) */}
            {!loading && !user && (
              <>
                <Link
                  href="/signin"
                  className="hidden lg:inline-flex text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-full transition-all shadow-md shadow-foreground/10"
                >
                  Get started
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </>
            )}

            {/* Logged in — hamburger on mobile */}
            {!loading && user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute top-20 left-4 right-4 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Nav links */}
            <nav className="p-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-border/60 mx-4" />

            {/* Bottom actions */}
            <div className="p-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    {profileUrl ? (
                      <img src={profileUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-medium">
                        {displayName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">Your account</p>
                    </div>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mx-2 my-1 bg-foreground text-background hover:bg-foreground/90 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  Get started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
