import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, Target, Users } from 'lucide-react';

const founders = [
  {
    name: 'Zaid',
    role: 'Co-Founder & EU Specialist',
    initials: 'ZK',
    description: 'Expert in European university applications and visa processes. Helped 200+ students secure admissions.',
    specialties: ['Germany Applications', 'EU Visa Process', 'APS Certification']
  },
  {
    name: 'Saurabh', 
    role: 'Co-Founder & Strategy Lead',
    initials: 'SM',
    description: 'Specializes in English-speaking countries and strategic planning. Former international student turned consultant.',
    specialties: ['USA/UK Applications', 'Strategic Planning', 'Scholarship Guidance']
  },
  {
    name: 'Vivian',
    role: 'Co-Founder & Operations Head',
    initials: 'VL',
    description: 'Operations and student success specialist. Ensures every student receives personalized attention and support.',
    specialties: ['Student Success', 'Operations', 'Pre-departure Support']
  }
];

const values = [
  {
    icon: Heart,
    title: 'Empathy First',
    description: 'We understand the struggles because we\'ve been there. Every decision is made with genuine care for student success.'
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We don\'t just provide services - we deliver results. Our success is measured by your acceptance letters.'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'You\'re not just a client, you\'re part of our community. We support each other through the entire journey.'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About Study and Settle Abroad
          </h2>
          
          <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card">
            <p className="text-lg leading-relaxed text-foreground">
              We once dreamed of studying and living abroad. Coming from different backgrounds, we faced the same struggles — overpriced consultancies, little real support, and the burden of figuring everything out on our own. We know how overwhelming the process feels and exactly what kind of help students need. That's why we created SaSa: not to sell dreams, but to guide you step by step until they become real — so you're ready and confident to live them yourself.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-shadow duration-300 border-border">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet the Founders */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Meet Our Founders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={`/placeholder-${founder.name.toLowerCase()}.jpg`} />
                    <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
                      {founder.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h4 className="text-xl font-bold text-foreground mb-1">
                    {founder.name}
                  </h4>
                  <p className="text-primary font-medium mb-4">
                    {founder.role}
                  </p>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {founder.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {founder.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-hero-text mb-8">
            Our Impact So Far
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-hero-text mb-2">500+</div>
              <div className="text-hero-subtitle">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hero-text mb-2">15+</div>
              <div className="text-hero-subtitle">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hero-text mb-2">95%</div>
              <div className="text-hero-subtitle">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hero-text mb-2">2+</div>
              <div className="text-hero-subtitle">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;