import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PricingSection from '@/components/PricingSection';
import { Skeleton } from '@/components/ui/skeleton';

const Pricing = () => {
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
              <Skeleton className="h-12 w-80 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <Skeleton className="h-96 w-full rounded-lg" />
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
        <PricingSection />
      </main>
    </div>
  );
};

export default Pricing;