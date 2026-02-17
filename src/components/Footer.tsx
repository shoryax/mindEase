import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 mt-16">
      <div className="w-[97%] mx-auto bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/healthBroken.svg" alt="Logo" className="w-5 h-5" />
                <span className="text-lg font-medium text-foreground">Cards for Mental Health</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
                Supporting mental wellness through thoughtfully designed resources and tools.
                Your journey to better mental health starts here.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground text-sm">support@cardsformentalhealth.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground text-sm">1-800-MENTAL-H</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground text-sm">Supporting globally</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cards</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Resources</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Crisis Support</a></li>
                <li><a href="https://www.google.com/maps/search/psychologists+near+me" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Find a Therapist</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Cards for Mental Health. Made with love for mental wellness.
            </p>
            <p className="text-muted-foreground/50 text-xs mt-2">
              If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
