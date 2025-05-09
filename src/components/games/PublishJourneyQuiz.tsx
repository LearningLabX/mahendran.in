
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight, Rocket, Star, X } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'App Preparation',
    questions: [
      {
        id: 'q1',
        text: 'What should you do before generating your app bundle?',
        options: [
          'Delete all debug print statements to improve performance',
          'Test the app thoroughly on multiple devices and OS versions',
          'Change all icons to match the Play Store branding',
          'Set all API URLs to development servers'
        ],
        answer: 1
      },
      {
        id: 'q2',
        text: 'Which of these is NOT required before publishing your app?',
        options: [
          'App icon in various sizes',
          'Privacy policy',
          'Server-side implementation of all features',
          '10,000 pre-registered users'
        ],
        answer: 3
      }
    ]
  },
  {
    id: 2,
    title: 'App Signing',
    questions: [
      {
        id: 'q3',
        text: 'What is the recommended way to sign your Android app for Play Store?',
        options: [
          'Use a debug key',
          'Use App signing by Google Play',
          'Use any random generated key',
          'Signing is not required for Android apps'
        ],
        answer: 1
      },
      {
        id: 'q4',
        text: 'What happens if you lose your keystore file?',
        options: [
          'Nothing, you can generate a new one anytime',
          'Google can recover it for you',
          'You\'ll need to publish your app with a new package name',
          'The Play Store will automatically create one'
        ],
        answer: 2
      }
    ]
  },
  {
    id: 3,
    title: 'App Bundle',
    questions: [
      {
        id: 'q5',
        text: 'What is the recommended format for uploading apps to the Play Store?',
        options: [
          '.apk (Android Package)',
          '.aab (Android App Bundle)',
          '.ipa (iOS App Store Package)',
          '.zip (compressed file)'
        ],
        answer: 1
      },
      {
        id: 'q6',
        text: 'What\'s a major advantage of using Android App Bundle?',
        options: [
          'It works on older Android versions',
          'It allows for dynamic features',
          'It reduces the size of the app for users by optimizing delivery',
          'It skips the review process'
        ],
        answer: 2
      }
    ]
  },
  {
    id: 4,
    title: 'Play Console Setup',
    questions: [
      {
        id: 'q7',
        text: 'Which of these is NOT a section in the Google Play Console?',
        options: [
          'App content',
          'Store presence',
          'Developer analytics',
          'Server management'
        ],
        answer: 3
      },
      {
        id: 'q8',
        text: 'What should you include in your app\'s store listing?',
        options: [
          'Your personal phone number for support',
          'High-quality screenshots and videos',
          'Competitor app names',
          'Debug version download links'
        ],
        answer: 1
      }
    ]
  },
  {
    id: 5,
    title: 'App Review',
    questions: [
      {
        id: 'q9',
        text: 'How long does the initial app review typically take?',
        options: [
          '1-2 hours',
          'Up to 7 days',
          '30 days minimum',
          'Instant approval'
        ],
        answer: 1
      },
      {
        id: 'q10',
        text: 'Which of these will likely cause your app to be rejected?',
        options: [
          'Using Firebase Analytics',
          'Having subscription services',
          'Collecting user data without a privacy policy',
          'Having in-app purchases'
        ],
        answer: 2
      }
    ]
  }
];

const PublishJourneyQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(
    steps.reduce((acc, step) => acc + step.questions.length, 0)
  );
  const [showSummary, setShowSummary] = useState(false);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return;
    setSelectedOption(optionIndex);
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const currentQuestionObj = steps[currentStep].questions[currentQuestion];
    const isCorrect = selectedOption === currentQuestionObj.answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowAnswer(true);
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    
    const step = steps[currentStep];
    
    // If there's another question in this step
    if (currentQuestion < step.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }
    
    // If we've completed all questions in this step
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
    
    // If there's another step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentQuestion(0);
      return;
    }
    
    // If we've completed all steps
    setShowSummary(true);
  };
  
  const handleStepSelect = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
  };
  
  const handleRestart = () => {
    setCurrentStep(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setCompletedSteps([]);
    setScore(0);
    setShowSummary(false);
  };
  
  const currentQuestionObj = steps[currentStep]?.questions[currentQuestion];
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Publish to Play Store Journey</h3>
        <p className="text-muted-foreground">
          Learn the app publishing process from preparation to release
        </p>
      </div>
      
      {/* Progress indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">
            Progress: {completedSteps.length} / {steps.length} stages
          </div>
          <div className="text-sm font-medium">
            Score: {score} / {totalQuestions}
          </div>
        </div>
        
        <div className="relative">
          {/* Progress bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all" 
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2">
            {steps.map((step, index) => (
              <button 
                key={step.id}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                  ${completedSteps.includes(step.id) 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep === index
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-gray-200 dark:bg-gray-700 text-foreground'}
                `}
                onClick={() => handleStepSelect(index)}
                disabled={!completedSteps.includes(step.id) && index !== currentStep}
              >
                {completedSteps.includes(step.id) ? <Check className="h-4 w-4" /> : index + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <div key={step.id} className={`${index === 0 ? 'text-left' : index === steps.length - 1 ? 'text-right' : 'text-center'} w-20`}>
              {step.title}
            </div>
          ))}
        </div>
      </div>
      
      {showSummary ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Publishing Journey Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-6">
              {score === totalQuestions ? (
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-12 w-12 text-primary" />
                </div>
              ) : score >= totalQuestions * 0.7 ? (
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-12 w-12 text-primary" />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center">
                  <ChevronRight className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <p className="text-2xl font-bold mb-2">
              {score} out of {totalQuestions} correct
            </p>
            
            <p className="mb-4">
              {score === totalQuestions
                ? "Perfect score! You're ready to publish your app!"
                : score >= totalQuestions * 0.7
                ? "Great job! You have a solid understanding of the publishing process."
                : "You're on your way to understanding the app publishing process. Consider reviewing the steps again."}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {steps.map((step) => (
                <div key={step.id} className="text-center">
                  <Badge variant="outline" className="mb-2">{step.title}</Badge>
                  <div className="text-sm">
                    {completedSteps.includes(step.id) ? 'Completed' : 'Incomplete'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleRestart}>
              Start Over
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
              <Badge variant="outline">
                Question {currentQuestion + 1}/{steps[currentStep].questions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="font-medium text-lg mb-4">{currentQuestionObj.text}</h4>
            
            <div className="space-y-3">
              {currentQuestionObj.options.map((option, index) => (
                <button 
                  key={index}
                  className={`
                    w-full text-left px-4 py-3 rounded-md border transition-all
                    ${selectedOption === index 
                      ? showAnswer 
                        ? index === currentQuestionObj.answer 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                          : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : 'bg-primary/5 border-primary' 
                      : 'bg-background hover:bg-accent/50'}
                  `}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showAnswer && selectedOption === index && (
                      index === currentQuestionObj.answer 
                        ? <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                        : <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                    {showAnswer && selectedOption !== index && index === currentQuestionObj.answer && (
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            {!showAnswer ? (
              <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Continue
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PublishJourneyQuiz;
