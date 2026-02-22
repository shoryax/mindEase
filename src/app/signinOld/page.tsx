'use client';

import { useState } from 'react';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = '/auth/google';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center">
              <img src="/healthBroken.svg" alt="MindEase" className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-xl font-light text-foreground mb-1">MindEase</h1>
          <p className="text-muted-foreground text-sm">Redirecting to Google...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center">
            <img src="/healthBroken.svg" alt="Logo" className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl font-light text-foreground mb-1">MindEase</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Sign in to continue your mental health journey
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-border text-foreground py-3 px-6 rounded-xl transition-all duration-200"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <p className="text-muted-foreground/50 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
