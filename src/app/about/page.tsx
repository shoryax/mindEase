'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [user, loading, router]);

  if (loading || user) return null;

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">About us</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
                We believe in{' '}
                <span className="font-serif italic font-normal text-muted-foreground">real care</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                MindEase was built on a simple idea: everyone deserves access to quality mental wellness tools, available instantly and powered by AI.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team of licensed therapists brings decades of combined experience across a wide range of specializations. We stay current with the latest research and therapeutic approaches so that our clients always receive the best possible care.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re dealing with anxiety, navigating a life transition, or simply want someone to talk to, we&apos;re here. No judgment, no rush, just genuine support.
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-border/50">
                <h3 className="text-3xl font-semibold text-foreground mb-1">2,500+</h3>
                <p className="text-sm text-muted-foreground mb-3">clients helped since 2019</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  From college students to executives, we&apos;ve supported people from all walks of life on their mental health journeys.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-border/50">
                <h3 className="text-3xl font-semibold text-foreground mb-1">98%</h3>
                <p className="text-sm text-muted-foreground mb-3">reported improvement</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our clients consistently report significant improvement in their wellbeing within the first few months of therapy.
                </p>
              </div>
              <div className="text-center pt-4">
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group">
                  Get in touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
