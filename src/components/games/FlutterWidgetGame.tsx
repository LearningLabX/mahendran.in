
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const questions = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1682687982502-1529b3b7a25d',
    question: 'Which widget was used to create this layout?',
    options: ['ListView', 'Column', 'Stack', 'Row'],
    answer: 'Column'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1682687218147-9806132dc697',
    question: 'What is the primary widget used here?',
    options: ['GridView', 'Wrap', 'Flow', 'Flex'],
    answer: 'GridView'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56',
    question: 'Which widget is used for this overlapping layout?',
    options: ['Stack', 'ZStack', 'Overlay', 'Positioned'],
    answer: 'Stack'
  }
];

const FlutterWidgetGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  
  const handleCheck = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === currentQuestion.answer;
    setResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setResult(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Reset game
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Guess the Flutter Widget</h3>
        <p className="text-muted-foreground">
          Score: {score} / {questions.length}
        </p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-4">
            <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-md">
              <img
                src={currentQuestion.image}
                alt="Widget Preview"
                className="object-cover"
              />
            </AspectRatio>
          </div>
          
          <h4 className="font-medium mb-4">{currentQuestion.question}</h4>
          
          <RadioGroup
            value={selectedOption || ''}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} disabled={!!result} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      {result && (
        <div className={`p-4 rounded-md mb-4 ${result === 'correct' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
          <div className="flex items-center">
            {result === 'correct' ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            ) : (
              <X className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            )}
            <p className="font-medium">
              {result === 'correct' ? 'Correct!' : `Incorrect. The answer is ${currentQuestion.answer}.`}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-center gap-4">
        {!result ? (
          <Button onClick={handleCheck} disabled={!selectedOption}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Restart Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlutterWidgetGame;
