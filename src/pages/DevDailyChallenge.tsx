
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ChallengesFeed from '@/components/challenges/ChallengesFeed';
import Leaderboard from '@/components/challenges/Leaderboard';
import DevProfile from '@/components/challenges/DevProfile';
import UsefulTools from '@/components/challenges/UsefulTools';
import LearnSection from '@/components/challenges/LearnSection';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Trophy, User, Zap, Wrench, Lightbulb } from 'lucide-react';

const DevDailyChallenge = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>Dev Daily Challenge | Mahendran</title>
        <meta
          name="description"
          content="Daily coding and design challenges for mobile developers. Solve challenges, track your growth and win rewards."
        />
      </Helmet>

      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">Dev Challenges</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Daily Coding Challenges</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solve daily coding and design challenges, track your progress, and compete with other developers.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-8"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="h-14 w-full">
                <TabsTrigger value="challenges" className="h-12 flex gap-2 px-4">
                  <Zap className="h-4 w-4" />
                  <span>Challenges</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="h-12 flex gap-2 px-4">
                  <Trophy className="h-4 w-4" />
                  <span>Leaderboard</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="h-12 flex gap-2 px-4">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="h-12 flex gap-2 px-4">
                  <Wrench className="h-4 w-4" />
                  <span>Useful Tools</span>
                </TabsTrigger>
                <TabsTrigger value="learn" className="h-12 flex gap-2 px-4">
                  <Lightbulb className="h-4 w-4" />
                  <span>Learn</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="challenges" className="mt-6">
              <ChallengesFeed />
            </TabsContent>
            
            <TabsContent value="leaderboard" className="mt-6">
              <Leaderboard />
            </TabsContent>
            
            <TabsContent value="profile" className="mt-6">
              <DevProfile />
            </TabsContent>
            
            <TabsContent value="tools" className="mt-6">
              <UsefulTools />
            </TabsContent>
            
            <TabsContent value="learn" className="mt-6">
              <LearnSection />
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="mt-12 text-center bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready for More Challenges?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Check out our complete collection of tools, templates and resources for mobile developers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => navigate('/tools')} variant="outline">
                Explore Tools
              </Button>
              <Button onClick={() => navigate('/templates')}>
                Browse Templates
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DevDailyChallenge;
