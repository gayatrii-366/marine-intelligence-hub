import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Film, 
  BarChart3, 
  Image, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Waves,
  CheckCircle2
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to Marine Debris Intelligence',
    description: 'This AI-powered platform helps you monitor, detect, and analyze marine debris in real-time. Let\'s take a quick tour of the main features.',
    icon: Waves,
    color: 'text-cyan-400'
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Watch live video feeds with AI-powered debris detection. Objects are tracked in real-time with bounding boxes showing type and confidence levels.',
    icon: Eye,
    color: 'text-emerald-400'
  },
  {
    title: 'Media Feed',
    description: 'Upload your own images or videos to analyze. The AI will process them and detect any marine debris present in your media.',
    icon: Film,
    color: 'text-blue-400'
  },
  {
    title: 'Strategic Insights',
    description: 'View aggregated data and hotspot maps to identify pollution patterns. Perfect for policymakers and cleanup operation planning.',
    icon: BarChart3,
    color: 'text-purple-400'
  },
  {
    title: 'Detected Images',
    description: 'Browse through all captured images with detected debris. Filter and sort to find specific detections quickly.',
    icon: Image,
    color: 'text-orange-400'
  },
  {
    title: 'Image Enhancement',
    description: 'Enhance underwater images for better visibility. Adjust brightness, contrast, and apply AI enhancement for clearer analysis.',
    icon: Sparkles,
    color: 'text-pink-400'
  }
];

interface TutorialDialogProps {
  userId: string;
}

export const TutorialDialog = ({ userId }: TutorialDialogProps) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const tutorialKey = `tutorial_completed_${userId}`;
    const hasCompletedTutorial = localStorage.getItem(tutorialKey);
    
    if (!hasCompletedTutorial) {
      // Small delay to show after page loads
      const timer = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [userId]);

  const handleComplete = () => {
    const tutorialKey = `tutorial_completed_${userId}`;
    localStorage.setItem(tutorialKey, 'true');
    setOpen(false);
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const step = tutorialSteps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className={`p-4 rounded-full bg-secondary ${step.color}`}>
              <StepIcon className="h-8 w-8" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">{step.title}</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 py-4">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'w-6 bg-primary' 
                  : 'w-2 bg-muted hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground"
          >
            Skip
          </Button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
