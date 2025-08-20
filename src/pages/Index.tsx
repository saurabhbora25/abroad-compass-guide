import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CountrySection from '@/components/CountrySection';
import PricingSection from '@/components/PricingSection';
import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import FloatingChatbot from '@/components/FloatingChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CountrySection />
        <PricingSection />
        <AboutSection />
        <BlogSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-hero-bg text-hero-text py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Study and Settle Abroad</h3>
              <p className="text-hero-subtitle mb-4 max-w-md">
                We don't sell promises, we guide you to make your dreams of studying abroad real.
              </p>
              <div className="flex space-x-4">
                <div className="text-hero-subtitle text-sm">
                  📧 contact@studyandsettle.com
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-hero-subtitle text-sm">
                <li><a href="#home" className="hover:text-hero-text transition-colors">Home</a></li>
                <li><a href="#pricing" className="hover:text-hero-text transition-colors">Pricing</a></li>
                <li><a href="#blog" className="hover:text-hero-text transition-colors">Blog</a></li>
                <li><a href="#about" className="hover:text-hero-text transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-hero-subtitle text-sm">
                <li>English Countries Support</li>
                <li>EU Document Assistance</li>
                <li>University Applications</li>
                <li>Visa & Immigration</li>
                <li>Complete A-Z Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-hero-subtitle/20 mt-8 pt-8 text-center">
            <p className="text-hero-subtitle text-sm">
              © 2024 Study and Settle Abroad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
};

export default Index;