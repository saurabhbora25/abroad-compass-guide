import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BlogSection from '@/components/BlogSection';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
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
              <Skeleton className="h-12 w-72 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full animate-fade-in" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <Skeleton className="h-48 w-full rounded-t-lg mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                  <Skeleton className="h-32 w-full rounded-lg" />
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
        <BlogSection />
      </main>
    </div>
  );
};

export default Blog;