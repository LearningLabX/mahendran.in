
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, Trophy, Award, Medal } from 'lucide-react';
import { leaderboardData } from '@/data/leaderboardData';

const Leaderboard = () => {
  const [period, setPeriod] = useState('daily');

  // Filter leaderboard data based on selected period
  const getFilteredData = () => {
    switch (period) {
      case 'daily':
        return leaderboardData.daily;
      case 'weekly':
        return leaderboardData.weekly;
      case 'allTime':
        return leaderboardData.allTime;
      default:
        return [];
    }
  };
  
  const filteredData = getFilteredData();

  // Render position icon/badge
  const renderPosition = (position: number) => {
    if (position === 1) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (position === 2) {
      return <Award className="h-5 w-5 text-gray-400" />;
    } else if (position === 3) {
      return <Award className="h-5 w-5 text-amber-700" />;
    } else {
      return <span className="text-muted-foreground">{position}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="allTime">All-Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Top 3 section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredData.slice(0, 3).map((user, index) => (
          <Card key={user.id} className={`overflow-hidden ${index === 0 ? 'border-yellow-500/50 bg-yellow-50/20 dark:bg-yellow-950/10' : ''}`}>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary/10">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 border">
                  {renderPosition(index + 1)}
                </div>
              </div>
              
              <h3 className="text-lg font-bold">{user.username}</h3>
              <div className="flex items-center justify-center gap-2 mt-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{user.xp} XP</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {user.badges?.slice(0, 3).map((badge, i) => (
                  <Badge key={i} variant="outline" className="bg-primary/5">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                {user.challengesSolved} challenges solved
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Full leaderboard table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>XP</TableHead>
              <TableHead className="hidden sm:table-cell">Challenges</TableHead>
              <TableHead className="hidden lg:table-cell">Badges</TableHead>
              <TableHead className="hidden md:table-cell">Streak</TableHead>
              <TableHead className="text-right">Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {renderPosition(index + 1)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{user.username}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {user.xp}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{user.challengesSolved}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {user.badges?.slice(0, 2).map((badge, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5">
                        {badge}
                      </Badge>
                    ))}
                    {(user.badges?.length || 0) > 2 && (
                      <Badge variant="outline">+{(user.badges?.length || 0) - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className={user.streak >= 7 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : ""}>
                    🔥 {user.streak} days
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Leaderboard;
