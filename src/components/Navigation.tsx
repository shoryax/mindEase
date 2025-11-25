"use client";

import React from 'react';
import { Button } from './ui/button';
import { User, Sun, Moon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useDarkMode } from './DarkModeProvider';

const Navigation = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });
    };

    return (
        <div>
            {/* Navigation */}
            <nav className="relative z-50 px-6 lg:px-12 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-light tracking-wider"></div>
                    <div className="flex items-center gap-8">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg transition-all duration-300 hover:bg-opacity-20 ${isDarkMode
                                ? 'hover:bg-white/20 text-yellow-400'
                                : 'hover:bg-gray-200 text-gray-700'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <a href="#" className="text-sm hover:text-purple-400 transition-colors">Services</a>
                        <a href="#" className="text-sm hover:text-purple-400 transition-colors">About</a>
                        <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-6"
                            onClick={handleSignIn}>
                            <User className="w-4 h-4 mr-2" />
                            Sign In
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;