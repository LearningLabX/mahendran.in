
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Star, Award, Trophy, Calendar, Zap } from 'lucide-react';
import { userProfileData } from '@/data/userProfileData';
import { useState } from 'react';

const DevProfile = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  const { user, achievements, solvedChallenges } = userProfileData;
  
  // Calculate stats
  const completionRate = Math.round((solvedChallenges.length / (solvedChallenges.length + 5)) * 100);
  const xpToNextLevel = 100 - (user.xp % 100);
  const currentLevel = Math.floor(user.xp / 100) + 1;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto border-4 border-primary/10">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-2xl">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-2">{user.username}</CardTitle>
            <CardDescription>{user.bio}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Level {currentLevel}</span>
                <span>{user.xp} XP</span>
              </div>
              <Progress value={100 - (xpToNextLevel)} className="h-2" />
              <div className="text-xs text-right text-muted-foreground mt-1">
                {xpToNextLevel} XP to next level
              </div>
            </div>
            
            <div className="pt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <Badge variant="outline" className="bg-primary/5">🔥 {user.streak} days</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Challenges Solved</span>
                <span>{user.challengesSolved}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span>{completionRate}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Joined</span>
                <span>{user.joinDate}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>
        
        {/* Achievements & Solved Challenges */}
        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
                <TabsTrigger value="solved" className="flex-1">Solved Challenges</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="achievements" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border flex gap-3 items-center ${achievement.unlocked ? 'bg-secondary/10' : 'opacity-60'}`}
                  >
                    <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                      {achievement.emoji}
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    
                    {achievement.unlocked && (
                      <Badge variant="outline" className="bg-primary/5">
                        +{achievement.xpReward} XP
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="solved" className="mt-0">
              <div className="space-y-4">
                {solvedChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{challenge.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {challenge.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-secondary/20 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{challenge.xpEarned} XP</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 text-sm">
                      <span className="text-muted-foreground">{challenge.completedDate}</span>
                      <Button size="sm" variant="outline">View Solution</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevProfile;
