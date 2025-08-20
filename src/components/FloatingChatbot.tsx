import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const commonQuestions = [
    {
      question: "What countries do you help with?",
      answer: "We specialize in European countries (Germany, Hungary, Croatia, France, Denmark) and English-speaking countries (USA, UK, Ireland, Australia, Canada)."
    },
    {
      question: "How much do your services cost?",
      answer: "English-speaking countries support is FREE! EU services range from INR 10,000-25,000 with current discounts. Check our pricing section for details."
    },
    {
      question: "How long does the application process take?",
      answer: "Typically 3-6 months from application to visa approval. We recommend starting 8-12 months before your intended start date."
    },
    {
      question: "Do you guarantee admission?",
      answer: "While we can't guarantee admission, our students have a 95% success rate due to our personalized guidance and university matching."
    }
  ];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary-dark text-primary-foreground shadow-elevated hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chatbot Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
              How can we help you?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground">
                👋 Hi! I'm here to help answer your questions about studying abroad. 
                Choose a common question below or book a consultation for personalized guidance.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Common Questions:</h3>
              {commonQuestions.map((item, index) => (
                <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors border-border">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm text-foreground">
                        {item.question}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Need personalized guidance?
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                onClick={() => {
                  setIsOpen(false);
                  // Scroll to pricing section
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbot;