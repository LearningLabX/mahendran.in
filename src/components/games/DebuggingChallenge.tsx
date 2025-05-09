
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, Check, HelpCircle, Lightbulb } from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: 'Stateful Widget Not Updating',
    description: 'A user reports that their app UI is not updating when they change state with setState. What is the most likely cause?',
    code: `
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int counter = 0;

  void incrementCounter() {
    counter++;
    print('Counter: $counter'); // Counter increments in console
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Text('Count: $counter'),
          ElevatedButton(
            onPressed: incrementCounter,
            child: Text('Increment'),
          ),
        ],
      ),
    );
  }
}`,
    options: [
      'Missing Key in Widget',
      'Missing setState() call in incrementCounter',
      'Counter should be final',
      'Missing @override annotation'
    ],
    answer: 'Missing setState() call in incrementCounter',
    explanation: 'The incrementCounter method is updating the counter variable, but it\'s not calling setState(), which is required to tell Flutter that the widget needs to be rebuilt with the new state.'
  },
  {
    id: 2,
    title: 'API Data Not Loading',
    description: 'Your app makes an API call but the data never appears on screen. The API response looks correct in the network tab. What\'s the issue?',
    code: `
Future<List<Product>> fetchProducts() async {
  final response = await http.get(Uri.parse('https://api.example.com/products'));
  
  if (response.statusCode == 200) {
    final List<dynamic> data = json.decode(response.body);
    return data.map((json) => Product.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load products');
  }
}

class ProductsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Product> products = [];
    
    fetchProducts().then((fetchedProducts) {
      products = fetchedProducts;
    });
    
    return ListView.builder(
      itemCount: products.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(products[index].name),
          subtitle: Text(products[index].price.toString()),
        );
      },
    );
  }
}`,
    options: [
      'API endpoint is incorrect',
      'Widget should be StatefulWidget with setState',
      'Missing error handling',
      'Response parsing is incorrect'
    ],
    answer: 'Widget should be StatefulWidget with setState',
    explanation: 'The widget is a StatelessWidget, but it needs to be a StatefulWidget. The API call completes after the build method returns, and there\'s no mechanism to rebuild the widget when the data arrives.'
  }
];

const DebuggingChallenge = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const currentChallenge = challenges[currentChallengeIndex];
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  
  const handleCheck = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === currentChallenge.answer;
    setResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setResult(null);
    setShowHint(false);
    
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      // Reset game
      setCurrentChallengeIndex(0);
      setScore(0);
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">App Debugging Challenge</h3>
        <p className="text-muted-foreground">
          Score: {score} / {challenges.length}
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{currentChallenge.title}</CardTitle>
              <CardDescription>{currentChallenge.description}</CardDescription>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={toggleHint}
              className="flex items-center gap-1"
            >
              {showHint ? <Lightbulb className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />}
              {showHint ? 'Hide Hint' : 'Hint'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showHint && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md mb-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <p className="text-sm">Look carefully at how state is managed and when the UI rebuilds.</p>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
              <code>{currentChallenge.code}</code>
            </pre>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">What's causing the issue?</h4>
            <RadioGroup
              value={selectedOption || ''}
              onValueChange={handleOptionSelect}
              className="space-y-3"
            >
              {currentChallenge.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} disabled={!!result} />
                  <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
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
                {result === 'correct' ? 'Correct!' : `Incorrect. The answer is:`}
              </p>
              {result === 'incorrect' && (
                <p className="font-medium mb-2">{currentChallenge.answer}</p>
              )}
              <p className="text-sm">{currentChallenge.explanation}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center gap-4">
        {!result ? (
          <Button onClick={handleCheck} disabled={!selectedOption}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentChallengeIndex < challenges.length - 1 ? 'Next Challenge' : 'Restart Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DebuggingChallenge;
