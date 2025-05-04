
import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Game components
import FlutterWidgetGame from '@/components/games/FlutterWidgetGame';
import DebuggingChallenge from '@/components/games/DebuggingChallenge';
import DartCodeQuiz from '@/components/games/DartCodeQuiz';
import StateManagementQuiz from '@/components/games/StateManagementQuiz';
import FlutterUIMemoryGame from '@/components/games/FlutterUIMemoryGame';
import AppStackBuilder from '@/components/games/AppStackBuilder';
import WidgetPlayground from '@/components/games/WidgetPlayground';
import PublishJourneyQuiz from '@/components/games/PublishJourneyQuiz';
import DevTools from '@/components/games/DevTools';

const Games = () => {
  const [activeTab, setActiveTab] = useState('flutter-widget');
  const scrollRef = useRef<HTMLDivElement>(null);

  const games = [
    {
      id: 'flutter-widget',
      name: 'Guess the Flutter Widget',
      description: 'Test your knowledge of Flutter widgets by identifying them from screenshots',
      component: FlutterWidgetGame,
      difficulty: 'Easy'
    },
    {
      id: 'debugging',
      name: 'App Debugging Challenge',
      description: 'Find and fix bugs in mobile app code snippets',
      component: DebuggingChallenge,
      difficulty: 'Hard'
    },
    {
      id: 'dart-code',
      name: 'Dart Code Output Quiz',
      description: 'Predict the output of Dart code snippets',
      component: DartCodeQuiz,
      difficulty: 'Medium'
    },
    {
      id: 'state-management',
      name: 'State Management Quiz',
      description: 'Choose the best state management solution for different scenarios',
      component: StateManagementQuiz,
      difficulty: 'Medium'
    },
    {
      id: 'memory-game',
      name: 'Flutter UI Memory Game',
      description: 'Match Flutter widgets with their visual output',
      component: FlutterUIMemoryGame,
      difficulty: 'Easy'
    },
    {
      id: 'app-stack',
      name: 'App Stack Builder',
      description: 'Build your ideal app technology stack',
      component: AppStackBuilder,
      difficulty: 'Medium'
    },
    {
      id: 'widget-playground',
      name: 'Widget Playground',
      description: 'Interactive playground to experiment with Flutter widgets',
      component: WidgetPlayground,
      difficulty: 'Easy'
    },
    {
      id: 'publish-journey',
      name: 'Publish to Play Store Quiz',
      description: 'Navigate the app publishing process step by step',
      component: PublishJourneyQuiz,
      difficulty: 'Hard'
    },
    {
      id: 'dev-tools',
      name: 'Developer Tools',
      description: 'Practical tools for everyday mobile development tasks',
      component: DevTools,
      difficulty: 'Easy'
    }
  ];
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'secondary';
      case 'Hard': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-background/95">
      <Helmet>
        <title>Mobile Development Games | Mahendran</title>
        <meta
          name="description"
          content="Interactive games and tools for mobile app developers. Practice Flutter widgets, debug challenges, and more."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">Learn & Play</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Mobile Developer Games & Tools</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sharpen your skills and have fun with these interactive games and tools designed for mobile developers.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 relative">
              <div className="flex items-center justify-between mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm border hover:bg-secondary/80"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="w-full overflow-hidden mx-8" ref={scrollRef}>
                  <TabsList className="inline-flex p-1 rounded-lg bg-secondary/80 overflow-x-auto w-max min-w-full">
                    {games.map((game) => (
                      <TabsTrigger
                        key={game.id}
                        value={game.id}
                        className="px-4 py-2 whitespace-nowrap flex items-center gap-2"
                      >
                        {game.name}
                        <Badge variant={getDifficultyColor(game.difficulty)} className="text-[10px] px-1.5 py-0">
                          {game.difficulty}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm border hover:bg-secondary/80"
                  onClick={scrollRight}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Scroll horizontally to see more games →
                </p>
              </div>
            </div>
            
            {games.map((game) => (
              <TabsContent key={game.id} value={game.id} className="mt-2 mb-10 focus-visible:outline-none focus-visible:ring-0">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{game.name}</CardTitle>
                      <Badge variant={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <game.component />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Games;
