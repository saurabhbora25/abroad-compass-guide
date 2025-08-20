import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, CheckCircle } from 'lucide-react';

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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: PricingTier | null;
}

const countries = [
  'Germany', 'Hungary', 'Croatia', 'France', 'Denmark', 'USA', 'UK', 'Ireland', 'Australia', 'Canada', 'Other'
];

const educationLevels = [
  "Bachelor's", "Master's", 'PhD', 'Other'
];

const BookingModal = ({ isOpen, onClose, selectedService }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryChoice: '',
    educationLevel: '',
    preferredService: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Set preferred service when modal opens
  useState(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        preferredService: selectedService.title
      }));
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Consultation Booked!",
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      countryChoice: '',
      educationLevel: '',
      preferredService: selectedService?.title || '',
      comments: ''
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center">
            {isSubmitted ? (
              <>
                <CheckCircle className="h-6 w-6 mr-2 text-pricing-accent" />
                Consultation Booked!
              </>
            ) : (
              <>
                <CalendarDays className="h-6 w-6 mr-2 text-primary" />
                Book Consultation
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-pricing-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Thank you, {formData.fullName}!
              </h3>
              <p className="text-muted-foreground">
                We've received your consultation request for {formData.preferredService}.
                Our team will contact you within 24 hours to schedule your session.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-foreground mb-2">What's Next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Check your email for confirmation</li>
                <li>• Our consultant will call you to schedule</li>
                <li>• Prepare any questions about studying abroad</li>
                <li>• We'll create your personalized action plan</li>
              </ul>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedService && (
              <div className="bg-primary/10 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-primary">
                  Selected Service: {selectedService.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedService.price}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryChoice" className="text-foreground">
                Country of Choice
              </Label>
              <Select
                value={formData.countryChoice}
                onValueChange={(value) => handleInputChange('countryChoice', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationLevel" className="text-foreground">
                Level of Education
              </Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(value) => handleInputChange('educationLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments" className="text-foreground">
                Additional Comments
              </Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Any specific questions or requirements?"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.fullName || !formData.email || !formData.phone}
                className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                {isSubmitting ? 'Booking...' : 'Book Consultation'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;