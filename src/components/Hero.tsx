import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-24 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-full border border-black/10 dark:border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">A safe space for your mind</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-light leading-[0.95] mb-8 tracking-tight text-foreground">
            healing starts
            <br />
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
              with connection
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground font-light mb-12 max-w-2xl leading-relaxed">
            Compassionate therapy designed for real people dealing with real challenges.
            Let's work through it together.
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 h-14 text-base border-0">
              Start Your Journey
            </Button>
            <Button size="lg" variant="ghost" className="text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full px-10 h-14 text-base">
              How it Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
