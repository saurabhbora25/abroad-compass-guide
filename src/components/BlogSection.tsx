import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';

const featuredArticles = [
  {
    id: 1,
    title: 'Complete Guide to Studying in Germany 2024',
    excerpt: 'Everything you need to know about German universities, from application requirements to living costs and work opportunities.',
    category: 'Country Guides',
    readTime: '8 min read',
    author: 'Zaid',
    date: 'Dec 15, 2024',
    image: '/placeholder-germany-blog.jpg'
  },
  {
    id: 2,
    title: 'IELTS vs TOEFL: Which Test Should You Take?',
    excerpt: 'A comprehensive comparison of the two most popular English proficiency tests for international students.',
    category: 'Application Process',
    readTime: '5 min read',
    author: 'Saurabh',
    date: 'Dec 12, 2024',
    image: '/placeholder-test-blog.jpg'
  },
  {
    id: 3,
    title: 'Student Life in European Cities: What to Expect',
    excerpt: 'Real experiences from international students living and studying in major European cities.',
    category: 'Student Life',
    readTime: '6 min read',
    author: 'Vivian',
    date: 'Dec 10, 2024',
    image: '/placeholder-student-life.jpg'
  }
];

const faqItems = [
  {
    question: 'How much does it cost to study in Europe?',
    answer: 'Costs vary significantly by country. Germany offers very low tuition (€300/year) while living costs range from €7,500-15,000 annually depending on the city.'
  },
  {
    question: 'Do I need to know the local language?',
    answer: 'Many European universities offer programs taught entirely in English. However, learning the local language can enhance your experience and job prospects.'
  },
  {
    question: 'Can I work while studying in Europe?',
    answer: 'Yes! Most EU countries allow international students to work 20-24 hours per week during studies, helping offset living expenses.'
  },
  {
    question: 'How long does the application process take?',
    answer: 'Typically 3-6 months from application to visa approval. We recommend starting at least 8-12 months before your intended start date.'
  },
  {
    question: 'What are the chances of getting accepted?',
    answer: 'With proper guidance and preparation, our students have a 95% acceptance rate. We help you choose universities that match your profile.'
  }
];

const categories = [
  { name: 'Country Guides', count: 12, color: 'bg-primary' },
  { name: 'Visa Tips', count: 8, color: 'bg-pricing-accent' },
  { name: 'Student Life', count: 15, color: 'bg-destructive' },
  { name: 'Application Process', count: 10, color: 'bg-secondary' }
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guides, tips, and insights to help you navigate your study abroad journey
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-4 py-2 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <BookOpen className="h-3 w-3 mr-2" />
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Featured Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      {article.title.split(' ').slice(0, 2).join(' ')} Image
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {article.author} • {article.date}
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* FAQ Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-border hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-card p-8 rounded-2xl border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Have More Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our experts are here to help with personalized guidance for your study abroad journey.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;