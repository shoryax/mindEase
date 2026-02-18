'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Contact</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
                Let&apos;s{' '}
                <span className="font-serif italic font-normal text-muted-foreground">talk</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Have a question or ready to book your first session? Reach out and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <a href="mailto:hello@mindease.app" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-border/50 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40 transition-colors">
                    <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email us</p>
                    <p className="text-sm text-muted-foreground">hello@mindease.app</p>
                  </div>
                </a>
                <a href="tel:+18005551234" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-border/50 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40 transition-colors">
                    <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Call us</p>
                    <p className="text-sm text-muted-foreground">1-800-555-1234</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-border/50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">Virtual & in-person available</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-border/50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 8am-8pm, Sat 9am-5pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20">
              <h2 className="text-xl font-semibold text-foreground mb-6">Book a free consultation</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input type="text" placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Tell us a bit about what you're looking for..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all resize-none" />
                </div>
                <button type="submit" className="w-full bg-foreground text-background py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10">
                  Send message
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  We&apos;ll get back to you within 24 hours. Your information is always confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
