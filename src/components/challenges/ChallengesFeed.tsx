
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Filter } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { challengesData } from '@/data/challengesData';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ChallengesFeed = () => {
  const [filter, setFilter] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [solutionCode, setSolutionCode] = useState('');
  const [submittingSolution, setSubmittingSolution] = useState(false);
  const { toast } = useToast();
  
  // Filter challenges based on selected filter
  const filteredChallenges = filter === 'all' 
    ? challengesData 
    : challengesData.filter(challenge => challenge.tags.includes(filter));

  // Get unique tags for filter
  const uniqueTags = Array.from(
    new Set(challengesData.flatMap(challenge => challenge.tags))
  );

  // Map difficulty to emoji and color
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return <Badge variant="success">🟢 Easy</Badge>;
      case 'medium':
        return <Badge variant="secondary">🟡 Medium</Badge>;
      case 'hard':
        return <Badge variant="destructive">🔴 Hard</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleOpenChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    // Pre-fill solution code with the challenge code snippet if available
    setSolutionCode(challenge.codeSnippet || '');
  };

  const handleSubmitSolution = () => {
    setSubmittingSolution(true);
    
    // Simulate submission process with timeout
    setTimeout(() => {
      // Add code to handle actual solution submission
      
      // Show success message
      toast({
        title: "Solution submitted!",
        description: `Your solution for "${selectedChallenge?.title}" has been submitted successfully.`,
      });
      
      setSubmittingSolution(false);
      // Close dialog after submission
      setSelectedChallenge(null);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Filter section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
        <h2 className="text-2xl font-bold">Today's Challenges</h2>
        
        <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            {uniqueTags.map(tag => (
              <TabsTrigger key={tag} value={tag}>
                {tag}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Challenge cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                {getDifficultyBadge(challenge.difficulty)}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {challenge.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-secondary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{challenge.description}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{challenge.timeLimit} minutes</span>
                </div>
                <div>
                  {challenge.solvedPercentage}% solved
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>Earn {challenge.xpReward} XP</span>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => handleOpenChallenge(challenge)}>Start Challenge</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{selectedChallenge?.title}</DialogTitle>
                    <DialogDescription>
                      {selectedChallenge?.difficulty} • {selectedChallenge?.timeLimit} minutes • {selectedChallenge?.xpReward} XP
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Challenge Description</h3>
                      <p className="text-muted-foreground">{selectedChallenge?.description}</p>
                      
                      {selectedChallenge?.instructions && (
                        <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                          <h4 className="font-medium mb-2">Instructions:</h4>
                          <p>{selectedChallenge?.instructions}</p>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Code Solution:</h4>
                        <Textarea 
                          className="font-mono text-sm h-64 bg-secondary/30 p-4"
                          value={solutionCode}
                          onChange={(e) => setSolutionCode(e.target.value)}
                          placeholder="Write your solution here..."
                        />
                      </div>

                      {selectedChallenge?.expectedOutput && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Expected Output:</h4>
                          <p className="text-muted-foreground">{selectedChallenge?.expectedOutput}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DialogFooter className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time limit: {selectedChallenge?.timeLimit} minutes</span>
                    </div>
                    <Button 
                      onClick={handleSubmitSolution}
                      disabled={submittingSolution || !solutionCode.trim()}
                    >
                      {submittingSolution ? 'Submitting...' : 'Submit Solution'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengesFeed;
