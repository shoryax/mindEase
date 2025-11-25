"use client";

import React from 'react';
import { Button } from './ui/button';

export default function Navigation() {
    return (
        <div>
            {/* Navigation */}
            <nav className="relative z-50 px-6 lg:px-12 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-light tracking-wider">mindful</div>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-sm hover:text-purple-400 transition-colors">Services</a>
                        <a href="#" className="text-sm hover:text-purple-400 transition-colors">About</a>
                        <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-6">
                            Book a Session
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    )
}