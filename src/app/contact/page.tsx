'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, ArrowRight, Heart, Brain, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { icon: Heart, label: 'Talk to HealthPal', desc: 'AI therapist, available now', href: '/healthpal', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30', border: 'border-rose-200/50 dark:border-rose-800/30' },
  { icon: Brain, label: 'Try CBT Coach', desc: 'Reframe a negative thought', href: '/cbt', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200/50 dark:border-violet-800/30' },
  { icon: Stethoscope, label: 'Use AI Doctor', desc: 'Scan any medicine instantly', href: '/ai-doctor', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/30', border: 'border-sky-200/50 dark:border-sky-800/30' },
];

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

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Contact</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Get in{' '}
              <span className="font-serif italic font-normal text-muted-foreground">touch</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question, found a bug, or want to share feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left */}
            <div className="space-y-10">
              {/* Email */}
              <div>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">Email us</h2>
                <a
                  href="mailto:hello@mindease.app"
                  className="group inline-flex items-center gap-4 p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/30 hover:border-teal-300 dark:hover:border-teal-700 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">hello@mindease.app</p>
                    <p className="text-xs text-muted-foreground">We reply within 24 hours</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Quick access */}
              <div>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">Or jump straight in</h2>
                <div className="space-y-3">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${link.bg} ${link.border}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/60 dark:bg-white/10 flex items-center justify-center">
                          <Icon className={`w-4 h-4 ${link.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{link.label}</p>
                          <p className="text-xs text-muted-foreground">{link.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Crisis note */}
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <span className="font-semibold">In crisis?</span> Please don't wait for an email reply. Call or text <span className="font-semibold">988</span>, or text <span className="font-semibold">HOME</span> to <span className="font-semibold">741741</span> for immediate support.
                </p>
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20">
              <h2 className="text-xl font-semibold text-foreground mb-2">Send a message</h2>
              <p className="text-sm text-muted-foreground mb-6">Feature request, bug report, or just want to say hi — we read everything.</p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">What's on your mind?</label>
                  <textarea
                    rows={4}
                    placeholder="I found a bug with the sound mixer... / I'd love a feature that... / HealthPal really helped me today..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10"
                >
                  Send message
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  We'll get back to you within 24 hours.
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
