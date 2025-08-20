import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Euro, GraduationCap, Home, FileText, Calendar } from 'lucide-react';

interface Country {
  name: string;
  tuition: number;
  living: number;
  total: number;
  image: string;
  description: string;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: Country | null;
}

const countryInfo: Record<string, any> = {
  Germany: {
    requirements: ['IELTS 6.0 or TOEFL 80', 'APS Certificate', 'Academic Transcripts', 'Statement of Purpose'],
    universities: ['Technical University of Munich', 'University of Heidelberg', 'RWTH Aachen'],
    intake: 'September & March',
    workRights: '20 hours/week during studies',
    language: 'English & German programs available'
  },
  Hungary: {
    requirements: ['IELTS 5.5 or TOEFL 72', 'Academic Transcripts', 'Statement of Purpose', 'Passport'],
    universities: ['University of Debrecen', 'Semmelweis University', 'Budapest University of Technology'],
    intake: 'September & February',
    workRights: '24 hours/week during studies',
    language: 'English programs available'
  },
  Croatia: {
    requirements: ['IELTS 6.0 or TOEFL 78', 'Academic Transcripts', 'Statement of Purpose', 'Passport'],
    universities: ['University of Zagreb', 'University of Split', 'University of Rijeka'],
    intake: 'September & February',
    workRights: '20 hours/week during studies',
    language: 'English & Croatian programs'
  },
  France: {
    requirements: ['IELTS 6.0 or TOEFL 80', 'Academic Transcripts', 'Statement of Purpose', 'Campus France Application'],
    universities: ['Sorbonne University', 'École Normale Supérieure', 'HEC Paris'],
    intake: 'September & January',
    workRights: '20 hours/week during studies',
    language: 'English & French programs'
  },
  Denmark: {
    requirements: ['IELTS 6.5 or TOEFL 88', 'Academic Transcripts', 'Statement of Purpose', 'Passport'],
    universities: ['University of Copenhagen', 'Technical University of Denmark', 'Aarhus University'],
    intake: 'September & February',
    workRights: '20 hours/week during studies',
    language: 'English programs available'
  }
};

const ChatbotModal = ({ isOpen, onClose, country }: ChatbotModalProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!country) return null;

  const info = countryInfo[country.name];

  const handleBookCall = () => {
    setShowBookingForm(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center">
            <GraduationCap className="h-6 w-6 mr-2 text-primary" />
            Study in {country.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cost Overview */}
          <div className="bg-gradient-card p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 text-foreground">Annual Cost Breakdown</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tuition:</span>
                <span className="flex items-center font-semibold text-foreground">
                  <Euro className="h-4 w-4 mr-1" />
                  {country.tuition.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Living:</span>
                <span className="flex items-center font-semibold text-foreground">
                  <Euro className="h-4 w-4 mr-1" />
                  {country.living.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="border-t mt-3 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Total Annual Cost:</span>
                <span className="flex items-center font-bold text-xl text-primary">
                  <Euro className="h-5 w-5 mr-1" />
                  {country.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Requirements
            </h3>
            <div className="flex flex-wrap gap-2">
              {info.requirements.map((req: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* University Examples */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              Top Universities
            </h3>
            <ul className="space-y-2">
              {info.universities.map((uni: string, index: number) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  {uni}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <h4 className="font-medium text-foreground mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Intake Periods
              </h4>
              <p className="text-sm text-muted-foreground">{info.intake}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <h4 className="font-medium text-foreground mb-1 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Work Rights
              </h4>
              <p className="text-sm text-muted-foreground">{info.workRights}</p>
            </div>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-medium text-foreground mb-1">Language Requirements</h4>
            <p className="text-sm text-muted-foreground">{info.language}</p>
          </div>

          {/* CTA */}
          <div className="border-t pt-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Ready to start your journey to {country.name}?
              </p>
              <Button 
                onClick={handleBookCall}
                size="lg"
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8"
              >
                Book a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;