'use client';

import Link from 'next/link';

interface NotLoggedInProps {
  message?: string;
}

export default function NotLoggedIn({ message = "Sign in to continue your mental health journey" }: NotLoggedInProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <img src="/healthBroken.svg" alt="MindEase" className="w-7 h-7 invert" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">You're not signed in</h2>
        <p className="text-muted-foreground text-sm mb-6">{message}</p>
        <Link
          href="/signin"
          className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 px-8 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
