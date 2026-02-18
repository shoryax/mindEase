import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <img src="/healthBroken.svg" alt="Logo" className="w-4 h-4 invert" />
              </div>
              <span className="font-semibold text-foreground">MindEase</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              AI-powered mental wellness tools — available 24/7, no appointments needed.
            </p>
            <a href="mailto:hello@mindease.app" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">hello@mindease.app</span>
            </a>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Tools</h3>
            <ul className="space-y-2.5">
              <li><Link href="/healthpal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Therapist</Link></li>
              <li><Link href="/cbt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">CBT Coach</Link></li>
              <li><Link href="/ai-doctor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Doctor</Link></li>
              <li><Link href="/sounds" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sound Mixer</Link></li>
              <li><Link href="/digest" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Weekly Digest</Link></li>
            </ul>
          </div>

          {/* App */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Account</h3>
            <ul className="space-y-2.5">
              <li><Link href="/signin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 MindEase. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center sm:text-right">
            Not a substitute for professional mental health care. Crisis? Call 988.
          </p>
        </div>
      </div>
    </footer>
  );
}
