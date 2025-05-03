
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Check, AlertCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    code: `
void main() {
  var list = [1, 2, 3];
  var newList = [...list];
  newList[0] = 5;
  print(list[0]);
}`,
    question: "What will be printed?",
    answer: "1",
    explanation: "The spread operator (...) creates a new list with the values from the original list. Changing the new list doesn't affect the original."
  },
  {
    id: 2,
    code: `
void main() {
  var value = 10;
  
  void increment(int x) {
    x = x + 1;
  }
  
  increment(value);
  print(value);
}`,
    question: "What will be printed?",
    answer: "10",
    explanation: "In Dart, primitive types like integers are passed by value, not reference. The function receives a copy of the value, so the original variable remains unchanged."
  },
  {
    id: 3,
    code: `
void main() {
  final items = ['apple', 'banana', 'orange'];
  
  final result = items.where((item) => item.startsWith('a')).map((item) => item.toUpperCase()).toList();
  
  print(result);
}`,
    question: "What will be printed?",
    answer: "[APPLE]",
    explanation: "The 'where' method filters for items that start with 'a' (only 'apple'), then 'map' converts it to uppercase, resulting in [APPLE]."
  }
];

const DartCodeQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
  };
  
  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    setResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    setUserAnswer('');
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Dart Code Output Quiz</h3>
        <p className="text-muted-foreground">
          Score: {score} / {questions.length}
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
              <code>{currentQuestion.code}</code>
            </pre>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">{currentQuestion.question}</h4>
            <Textarea
              placeholder="Write your answer here..."
              value={userAnswer}
              onChange={handleAnswerChange}
              rows={2}
              disabled={!!result}
              className="font-mono"
            />
          </div>
        </CardContent>
      </Card>
      
      {result && (
        <div className={`p-4 rounded-md mb-4 ${result === 'correct' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
          <div className="flex items-start gap-2">
            {result === 'correct' ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-1" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1" />
            )}
            <div>
              <p className="font-medium mb-1">
                {result === 'correct' ? 'Correct!' : `Incorrect. The answer is: ${currentQuestion.answer}`}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center gap-4">
        {!result ? (
          <Button onClick={handleCheck} disabled={!userAnswer.trim()}>
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

export default DartCodeQuiz;
