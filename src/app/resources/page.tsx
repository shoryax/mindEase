'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowUpRight, Phone, MessageCircle, BookOpen } from 'lucide-react';

const crisisResources = [
  { name: '988 Suicide & Crisis Lifeline', description: 'Call or text 988, available 24/7', href: 'tel:988', icon: Phone },
  { name: 'Crisis Text Line', description: 'Text HOME to 741741', href: 'sms:741741', icon: MessageCircle },
  { name: 'Find a Therapist Near You', description: 'Search verified mental health professionals in your area', href: 'https://www.google.com/maps/search/psychologists+near+me', icon: ArrowUpRight },
];

const articles = [
  { title: 'Understanding Anxiety', desc: 'Learn about the different types of anxiety disorders and evidence-based coping strategies.' },
  { title: 'Building Healthy Habits', desc: 'Small, consistent changes that make a real difference in your mental wellbeing.' },
  { title: 'When to Seek Help', desc: 'How to know when it\'s time to talk to a professional, and what to expect.' },
  { title: 'Mindfulness for Beginners', desc: 'Practical mindfulness exercises you can start today, no experience required.' },
];

export default function ResourcesPage() {
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
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">Resources</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Help when you{' '}
              <span className="font-serif italic font-normal text-muted-foreground">need it</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crisis support, educational content, and tools to support your mental health journey.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-xl font-semibold text-foreground mb-6">Crisis Support</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {crisisResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.name}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700 transition-all"
                  >
                    <Icon className="w-5 h-5 text-red-600 dark:text-red-400 mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Mental Health Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {articles.map((article) => (
                <div key={article.title} className="group p-6 rounded-2xl border border-border/50 hover:border-border bg-white/50 dark:bg-white/[0.02] transition-all cursor-pointer">
                  <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{article.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
