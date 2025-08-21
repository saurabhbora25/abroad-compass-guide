import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import BookingModal from './BookingModal';

interface PricingTier {
  id: string;
  title: string;
  description: string;
  countries?: string;
  services: string[];
  originalPrice?: string;
  price: string;
  footnote?: string;
  isPopular?: boolean;
  ctaText: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'english-countries',
    title: 'Complete A-Z Support for English Nations',
    description: 'Full guidance for English-speaking destinations',
    countries: 'USA, UK, Ireland, Australia, Canada',
    services: ['Document accumulation to visa help', 'University selection & applications', 'Complete end-to-end support', 'No hidden charges'],
    price: 'FREE',
    footnote: 'We earn from university commissions, ensuring quality assistance at no cost to students',
    ctaText: 'Book Now'
  },
  {
    id: 'eu-documents',
    title: 'Document & Test Preparation',
    description: 'Essential document preparation for EU applications',
    services: ['Document accumulation', 'IELTS/TOEFL preparation guidance', 'APS (Germany) assistance', 'Academic transcript verification', 'Statement of Purpose review'],
    originalPrice: 'INR 12,000',
    price: 'INR 10,000',
    ctaText: 'Book Now'
  },
  {
    id: 'eu-applications',
    title: 'University Selection & Applications',
    description: 'Complete application process management',
    services: ['University shortlisting', 'Application assistance', 'SOP drafting & review', 'Uni-assist help', 'Course selection guidance', 'Acceptance support'],
    originalPrice: 'INR 12,000',
    price: 'INR 10,000',
    ctaText: 'Book Now'
  },
  {
    id: 'eu-visa',
    title: 'Post-Acceptance Support',
    description: 'Visa and immigration assistance',
    services: ['Visa application assistance', 'Immigration guidance', 'Pre-departure support', 'Documentation review', 'Embassy appointment booking'],
    originalPrice: 'INR 12,000',
    price: 'INR 10,000',
    ctaText: 'Book Now'
  },
  {
    id: 'eu-complete',
    title: 'Complete A-Z EU Support',
    description: 'Comprehensive worry-free expert guidance',
    services: ['All services from packages 2, 3, and 4', 'End-to-end EU application support', 'Dedicated consultant', 'Priority support', 'Money-back guarantee'],
    originalPrice: 'INR 30,000',
    price: 'INR 25,000',
    isPopular: true,
    ctaText: 'Book Now'
  }
];

const PricingSection = () => {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsBookingOpen(true);
  };

  return (
    <section id="pricing" className="py-16 bg-section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing, Real Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the service that fits your needs. No hidden costs, no surprises.
          </p>
          <Badge className="mt-4 bg-pricing-accent text-white font-semibold px-4 py-2">
            Limited Time Discount Available
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 ${
                tier.isPopular
                  ? 'border-primary shadow-card ring-2 ring-primary/20'
                  : 'border-border'
              } bg-pricing-card`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1 flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  {tier.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {tier.description}
                </CardDescription>
                {tier.countries && (
                  <div className="text-sm text-primary font-medium">
                    {tier.countries}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  {tier.originalPrice && (
                    <div className="text-sm text-pricing-discount line-through mb-1">
                      {tier.originalPrice}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-foreground">
                    {tier.price}
                  </div>
                  {tier.originalPrice && (
                    <Badge variant="destructive" className="mt-2 text-xs">
                      Limited Time Discount
                    </Badge>
                  )}
                </div>

                {/* Services */}
                <div className="space-y-3">
                  {tier.services.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-pricing-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{service}</span>
                    </div>
                  ))}
                </div>

                {/* Footnote */}
                {tier.footnote && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground italic">
                      {tier.footnote}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  onClick={() => handleBookNow(tier)}
                  className={`w-full font-semibold ${
                    tier.isPopular
                      ? 'bg-primary hover:bg-primary-dark text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  {tier.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which package is right for you?
          </p>
          <Button variant="outline" size="lg">
            Schedule a Free Consultation
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedTier}
      />
    </section>
  );
};

export default PricingSection;