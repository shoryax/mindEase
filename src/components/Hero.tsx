import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import ShinyText from '@/app/shadcn/ShinyText';

const Hero = () =>{
  return (
      <section className="relative z-10 px-6 lg:px-12 pt-20 lg:pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">A safe space for your mind</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-light leading-[0.95] mb-8 tracking-tight">
              healing starts
              <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                with connection
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/60 font-light mb-12 max-w-2xl leading-relaxed">
              Compassionate therapy designed for real people dealing with real challenges. 
              Let's work through it together.
            </p>

            <div className="flex items-center gap-6">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 h-14 text-base border-0">
                Start Your Journey
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-10 h-14 text-base">
                How it Works
              </Button>
            </div>
          </div>
        </div>
        
      </section>
  );
}

export default Hero;