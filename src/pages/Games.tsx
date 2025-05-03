
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';
import FlutterWidgetGame from '@/components/games/FlutterWidgetGame';
import DebuggingChallenge from '@/components/games/DebuggingChallenge';
import DartCodeQuiz from '@/components/games/DartCodeQuiz';
import StateManagementQuiz from '@/components/games/StateManagementQuiz';
import FlutterUIMemoryGame from '@/components/games/FlutterUIMemoryGame';
import AppStackBuilder from '@/components/games/AppStackBuilder';
import WidgetPlayground from '@/components/games/WidgetPlayground';
import PublishJourneyQuiz from '@/components/games/PublishJourneyQuiz';
import DevTools from '@/components/games/DevTools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Games = () => {
  const [selectedTab, setSelectedTab] = useState('flutter-widget');
  
  const games = [
    {
      id: 'flutter-widget',
      name: 'Guess the Flutter Widget',
      component: FlutterWidgetGame
    },
    {
      id: 'debugging',
      name: 'App Debugging Challenge',
      component: DebuggingChallenge
    },
    {
      id: 'dart-code',
      name: 'Dart Code Output Quiz',
      component: DartCodeQuiz
    },
    {
      id: 'state-management',
      name: 'State Management Quiz',
      component: StateManagementQuiz
    },
    {
      id: 'memory-game',
      name: 'Flutter UI Memory Game',
      component: FlutterUIMemoryGame
    },
    {
      id: 'app-stack',
      name: 'App Stack Builder',
      component: AppStackBuilder
    },
    {
      id: 'widget-playground',
      name: 'Widget Playground',
      component: WidgetPlayground
    },
    {
      id: 'publish-journey',
      name: 'Publish to Play Store Quiz',
      component: PublishJourneyQuiz
    },
    {
      id: 'dev-tools',
      name: 'Developer Tools',
      component: DevTools
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
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
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="flex space-x-1 rounded-lg bg-secondary/80 p-1 overflow-x-auto max-w-full sm:max-w-lg">
                {games.map((game) => (
                  <TabsTrigger
                    key={game.id}
                    value={game.id}
                    className="whitespace-nowrap"
                  >
                    {game.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {games.map((game) => (
              <TabsContent key={game.id} value={game.id} className="mt-2 mb-10">
                <div className="rounded-xl bg-white dark:bg-background/80 p-4">
                  <game.component />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Games;
