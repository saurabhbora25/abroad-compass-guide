import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-hero-text mb-6 leading-tight">
            Want to study abroad? We can help.
          </h1>
          <p className="text-xl md:text-2xl text-hero-subtitle mb-8 leading-relaxed">
            Thinking about building a life overseas? We don't sell promises, we guide you to make it real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('pricing')}
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-3"
            >
              Explore Services
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              className="border-hero-subtitle text-hero-subtitle hover:bg-hero-subtitle hover:text-hero-bg font-semibold px-8 py-3"
            >
              Learn About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;