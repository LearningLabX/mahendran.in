
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const scenarios = [
  {
    id: 1,
    title: 'Small Productivity App',
    description: 'Building a simple to-do list app with basic CRUD operations and minimal UI state.',
    options: [
      { name: 'Provider', score: 4, reasoning: 'Simple, lightweight, perfect for small apps with straightforward state needs.' },
      { name: 'GetX', score: 3, reasoning: 'Somewhat overkill for a simple app, but does offer easy state management.' },
      { name: 'Riverpod', score: 3, reasoning: 'More structured than Provider, but adds some complexity that may not be needed for a simple app.' },
      { name: 'BLoC', score: 2, reasoning: 'Introduces excessive boilerplate for what could be done with simpler solutions.' }
    ]
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Large app with multiple screens, complex state, shopping cart, user profiles, and payment processing.',
    options: [
      { name: 'Provider', score: 2, reasoning: 'Becomes unwieldy at scale with complex state dependencies.' },
      { name: 'GetX', score: 3, reasoning: 'Good for rapid development, but may lack structure for very large apps.' },
      { name: 'Riverpod', score: 4, reasoning: 'Great balance of power and maintainability for complex applications.' },
      { name: 'BLoC', score: 4, reasoning: 'Excellent separation of concerns and predictability for complex state flows.' }
    ]
  },
  {
    id: 3,
    title: 'Real-time Chat App',
    description: 'App with real-time data streams, user presence, notifications, and message state management.',
    options: [
      { name: 'Provider', score: 2, reasoning: 'Not ideal for reactive programming patterns and stream handling.' },
      { name: 'GetX', score: 3, reasoning: 'Reactive programming is supported, but not its strongest feature.' },
      { name: 'Riverpod', score: 4, reasoning: 'Great stream support and reactive programming capabilities.' },
      { name: 'BLoC', score: 5, reasoning: 'Built specifically for reactive programming and stream-based architectures.' }
    ]
  }
];

const StateManagementQuiz = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentScenario = scenarios[currentScenarioIndex];
  
  const handleOptionSelect = (optionName: string) => {
    setSelectedOption(optionName);
  };
  
  const handleConfirm = () => {
    if (!selectedOption) return;
    
    const option = currentScenario.options.find(opt => opt.name === selectedOption);
    if (option) {
      setScore(score + option.score);
    }
    
    setShowResult(true);
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      // Show final score
      setCurrentScenarioIndex(0);
      setScore(0);
    }
  };
  
  const getScoreText = () => {
    const maxScore = scenarios.reduce((acc, scenario) => {
      const maxOptionScore = Math.max(...scenario.options.map(opt => opt.score));
      return acc + maxOptionScore;
    }, 0);
    
    const percentage = Math.round((score / maxScore) * 100);
    
    if (percentage >= 90) return "State Management Expert!";
    if (percentage >= 75) return "State Management Pro!";
    if (percentage >= 60) return "Good Understanding!";
    return "Keep Learning!";
  };
  
  const selectedOptionDetails = selectedOption
    ? currentScenario.options.find(opt => opt.name === selectedOption)
    : null;
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">State Management Tool Quiz</h3>
        <p className="text-muted-foreground">
          Choose the best state management solution for each scenario.
        </p>
      </div>
      
      {currentScenarioIndex === scenarios.length && showResult ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold mb-2">{getScoreText()}</div>
            <p className="text-xl mb-4">Your score: {score} points</p>
            <p className="text-muted-foreground">
              This assessment is based on general best practices, but remember that many factors can influence the choice of state management in a real project.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => {
              setCurrentScenarioIndex(0);
              setScore(0);
              setSelectedOption(null);
              setShowResult(false);
            }}>
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentScenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{currentScenario.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {currentScenario.options.map(option => (
                  <Button
                    key={option.name}
                    variant={selectedOption === option.name ? "default" : "outline"}
                    className="h-auto py-4 justify-start flex-col items-start"
                    onClick={() => handleOptionSelect(option.name)}
                    disabled={showResult}
                  >
                    <span className="text-left">{option.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {showResult && selectedOptionDetails && (
            <Card className="mb-6 border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Your Selection: {selectedOption}</CardTitle>
                  <Badge variant={selectedOptionDetails.score >= 4 ? "default" : "outline"}>
                    {selectedOptionDetails.score}/5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>{selectedOptionDetails.reasoning}</p>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-center gap-4">
            {!showResult ? (
              <Button onClick={handleConfirm} disabled={!selectedOption}>
                Confirm Selection
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StateManagementQuiz;
