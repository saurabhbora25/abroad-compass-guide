import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro, MessageCircle } from 'lucide-react';
import ChatbotModal from './ChatbotModal';
import germanyImage from '@/assets/germany-city.jpg';

interface Country {
  name: string;
  tuition: number;
  living: number;
  total: number;
  image: string | any;
  description: string;
}

const countries: Country[] = [
  {
    name: 'Germany',
    tuition: 300,
    living: 11000,
    total: 11300,
    image: germanyImage,
    description: 'Home to world-class engineering and research universities'
  },
  {
    name: 'Hungary',
    tuition: 3000,
    living: 8000,
    total: 11000,
    image: '/placeholder-hungary.jpg',
    description: 'Rich cultural heritage with affordable quality education'
  },
  {
    name: 'Croatia',
    tuition: 2500,
    living: 7500,
    total: 10000,
    image: '/placeholder-croatia.jpg',
    description: 'Beautiful coastal country with growing academic reputation'
  },
  {
    name: 'France',
    tuition: 2770,
    living: 12000,
    total: 14770,
    image: '/placeholder-france.jpg',
    description: 'Prestigious institutions and vibrant cultural life'
  },
  {
    name: 'Denmark',
    tuition: 0,
    living: 15000,
    total: 15000,
    image: '/placeholder-denmark.jpg',
    description: 'Free tuition for EU students, high quality of life'
  }
];

const CountrySection = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsChatbotOpen(true);
  };

  return (
    <section className="py-16 bg-section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Study Destinations in Europe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore affordable European education options with comprehensive cost breakdowns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {countries.map((country) => (
            <Card
              key={country.name}
              className="cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-country-card hover:bg-country-hover border-border group"
              onClick={() => handleCountryClick(country)}
            >
              <CardHeader className="pb-3">
                <div className="relative">
                  <div className="w-full h-32 bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={typeof country.image === 'string' ? country.image : country.image} 
                      alt={`${country.name} landscape`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground text-sm">
                        {country.name} Image
                      </span>
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    EU Country
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {country.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {country.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tuition:</span>
                    <span className="flex items-center font-medium text-foreground">
                      <Euro className="h-4 w-4 mr-1" />
                      {country.tuition.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Living:</span>
                    <span className="flex items-center font-medium text-foreground">
                      <Euro className="h-4 w-4 mr-1" />
                      {country.living.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total per year:</span>
                      <span className="flex items-center font-bold text-lg text-country-cost">
                        <Euro className="h-5 w-5 mr-1" />
                        {country.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-primary group-hover:text-primary-dark transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Click to learn more</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        country={selectedCountry}
      />
    </section>
  );
};

export default CountrySection;