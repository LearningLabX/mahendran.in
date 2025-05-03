
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const games = [
    {
      id: 'flutter-widget',
      name: 'Guess the Flutter Widget',
      description: 'Test your knowledge of Flutter widgets by identifying them from screenshots',
      component: FlutterWidgetGame
    },
    {
      id: 'debugging',
      name: 'App Debugging Challenge',
      description: 'Find and fix bugs in mobile app code snippets',
      component: DebuggingChallenge
    },
    {
      id: 'dart-code',
      name: 'Dart Code Output Quiz',
      description: 'Predict the output of Dart code snippets',
      component: DartCodeQuiz
    },
    {
      id: 'state-management',
      name: 'State Management Quiz',
      description: 'Choose the best state management solution for different scenarios',
      component: StateManagementQuiz
    },
    {
      id: 'memory-game',
      name: 'Flutter UI Memory Game',
      description: 'Match Flutter widgets with their visual output',
      component: FlutterUIMemoryGame
    },
    {
      id: 'app-stack',
      name: 'App Stack Builder',
      description: 'Build your ideal app technology stack',
      component: AppStackBuilder
    },
    {
      id: 'widget-playground',
      name: 'Widget Playground',
      description: 'Interactive playground to experiment with Flutter widgets',
      component: WidgetPlayground
    },
    {
      id: 'publish-journey',
      name: 'Publish to Play Store Quiz',
      description: 'Navigate the app publishing process step by step',
      component: PublishJourneyQuiz
    },
    {
      id: 'dev-tools',
      name: 'Developer Tools',
      description: 'Practical tools for everyday mobile development tasks',
      component: DevTools
    }
  ];

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
            <div className="mb-8">
              <TabsList className="inline-flex p-1 rounded-lg bg-secondary/80 overflow-x-auto max-w-full flex-wrap justify-center">
                {games.map((game) => (
                  <TabsTrigger
                    key={game.id}
                    value={game.id}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {game.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {games.map((game) => (
              <TabsContent key={game.id} value={game.id} className="mt-2 mb-10 focus-visible:outline-none focus-visible:ring-0">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>{game.name}</CardTitle>
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
