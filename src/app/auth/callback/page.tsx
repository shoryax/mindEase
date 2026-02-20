'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { Suspense } from 'react';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(() => {
        router.replace('/dashboard');
      });
    } else {
      router.replace('/dashboard');
    }
  }, []);

  return null;
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center">
            <img src="/healthBroken.svg" alt="MindEase" className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-xl font-light text-foreground mb-1">MindEase</h1>
        <p className="text-muted-foreground text-sm">Signing you in...</p>
        <Suspense>
          <CallbackHandler />
        </Suspense>
      </div>
    </div>
  );
}
