import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import { Skeleton } from '@/components/ui/skeleton';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 animate-pulse">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-full max-w-4xl mx-auto mb-2" />
              <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-8 w-20 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <main className="pt-20">
        <AboutSection />
      </main>
    </div>
  );
};

export default About;