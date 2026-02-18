import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <img src="/healthBroken.svg" alt="Logo" className="w-4 h-4 invert" />
              </div>
              <span className="font-semibold text-foreground">MindfulCare</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              Evidence-based therapy for lasting change. Virtual and in-person sessions available.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@mindfulcare.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+18005551234" className="text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Services</h3>
            <ul className="space-y-2.5">
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Individual Therapy</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Couples Therapy</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trauma Recovery</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Virtual Sessions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li>
                <a href="https://www.google.com/maps/search/psychologists+near+me" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Find a Therapist <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + Crisis */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">HIPAA Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 MindfulCare. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center sm:text-right">
            Crisis? Call 988 or text HOME to 741741.
          </p>
        </div>
      </div>
    </footer>
  );
}
