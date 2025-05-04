
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Copy, MessageSquare, Code, Lightbulb } from 'lucide-react';
import { learnData } from '@/data/learnData';

const LearnSection = () => {
  const [activeCategory, setActiveCategory] = useState('flutter');
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState('');

  // Filter tips based on selected category
  const filteredTips = learnData.filter(tip => tip.category === activeCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
        <h2 className="text-2xl font-bold">Learn & Improve</h2>
        <p className="text-muted-foreground">AI-powered tips and explanations for mobile developers</p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
        <TabsList>
          <TabsTrigger value="flutter">Flutter</TabsTrigger>
          <TabsTrigger value="dart">Dart</TabsTrigger>
          <TabsTrigger value="kotlin">Kotlin</TabsTrigger>
          <TabsTrigger value="reactnative">React Native</TabsTrigger>
        </TabsList>

        <div className="grid gap-6">
          {/* Daily tips section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Daily Tips
              </CardTitle>
              <CardDescription>Quick tips and best practices for mobile developers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredTips.slice(0, 3).map((tip) => (
                <div key={tip.id} className="p-4 rounded-lg border bg-secondary/5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{tip.title}</h3>
                    <Badge variant="outline">{tip.category}</Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">{tip.content}</p>
                  
                  {tip.codeSnippet && (
                    <div className="mt-3 relative">
                      <pre className="bg-secondary/30 p-3 rounded-md overflow-x-auto text-sm">
                        <code>{tip.codeSnippet}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => copyToClipboard(tip.codeSnippet)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}
                  
                  {tip.link && (
                    <div className="mt-3">
                      <Button variant="link" className="p-0 h-auto">Read more</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Code explanation section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Explanation
              </CardTitle>
              <CardDescription>Get explanations for code snippets or concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste a code snippet or describe a concept you'd like to understand..." 
                className="min-h-[150px] font-mono text-sm"
              />
              <div className="flex justify-end">
                <Button>Get Explanation</Button>
              </div>
              
              <div className="mt-6">
                <Separator className="my-4" />
                <h3 className="text-lg font-medium mb-3">Sample Explanations</h3>
                
                {filteredTips.filter(tip => tip.explanation).slice(0, 2).map((tip) => (
                  <div key={`exp-${tip.id}`} className="mb-4 p-4 rounded-lg border">
                    <div className="bg-secondary/20 p-3 rounded-md mb-3">
                      <code className="text-sm font-mono">{tip.codeSnippet}</code>
                    </div>
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-muted-foreground">{tip.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Ask a question section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Ask a Question
              </CardTitle>
              <CardDescription>Get answers to your mobile development questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Ask a mobile development question..." 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button disabled={!question.trim()}>Ask</Button>
                </div>
              </div>
              
              <div className="mt-6">
                <Separator className="my-4" />
                <h3 className="text-lg font-medium mb-3">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  {filteredTips.filter(tip => tip.question).slice(0, 3).map((tip) => (
                    <div key={`faq-${tip.id}`} className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">{tip.question}</h4>
                      <p className="text-muted-foreground">{tip.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default LearnSection;
