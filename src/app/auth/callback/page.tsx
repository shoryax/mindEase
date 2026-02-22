'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Signing you in...');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('Authentication failed. Redirecting...');
      setTimeout(() => router.replace('/signin'), 1500);
      return;
    }

    if (!code) {
      router.replace('/signin');
      return;
    }

    async function finishAuth() {
      try {
        // Exchange Google code for id_token (server-side keeps secret safe)
        const res = await fetch(`/api/auth/exchange?code=${encodeURIComponent(code!)}`);
        const data = await res.json();

        if (!res.ok || !data.id_token) {
          setStatus('Authentication failed. Redirecting...');
          setTimeout(() => router.replace('/signin'), 1500);
          return;
        }

        // Sign into Supabase with the Google ID token
        const { error: supabaseError } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: data.id_token,
        });

        if (supabaseError) {
          setStatus('Authentication failed. Redirecting...');
          setTimeout(() => router.replace('/signin'), 1500);
          return;
        }

        router.replace('/dashboard');
      } catch {
        setStatus('Something went wrong. Redirecting...');
        setTimeout(() => router.replace('/signin'), 1500);
      }
    }

    finishAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CallbackInner />
    </Suspense>
  );
}
