
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Tool components
import RegexTester from '@/components/tools/RegexTester';
import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Tool from '@/components/tools/Base64Tool';
import ColorConverter from '@/components/tools/ColorConverter';
import DateConverter from '@/components/tools/DateConverter';
import UuidGenerator from '@/components/tools/UuidGenerator';
import ApiTester from '@/components/tools/ApiTester';
import BoilerplateGenerator from '@/components/tools/BoilerplateGenerator';
import MarkdownConverter from '@/components/tools/MarkdownConverter';
import SqlHelper from '@/components/tools/SqlHelper';
import TechToolFinder from '@/components/tools/TechToolFinder';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('regex');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useState<HTMLDivElement | null>(null);
  
  const tools = [
    {
      id: 'regex',
      name: 'Regex Tester',
      description: 'Test regular expressions with instant feedback',
      component: RegexTester
    },
    {
      id: 'json',
      name: 'JSON Formatter',
      description: 'Format, validate and explore JSON data',
      component: JsonFormatter
    },
    {
      id: 'markdown',
      name: 'Markdown to HTML',
      description: 'Convert Markdown to HTML with live preview',
      component: MarkdownConverter
    },
    {
      id: 'sql',
      name: 'SQL Helper',
      description: 'UUID/Binary conversion and SQL formatting tools',
      component: SqlHelper
    },
    {
      id: 'base64',
      name: 'Base64 Tool',
      description: 'Encode and decode Base64 strings',
      component: Base64Tool
    },
    {
      id: 'color',
      name: 'Color Converter',
      description: 'Convert between HEX, RGB, and Flutter Color formats',
      component: ColorConverter
    },
    {
      id: 'date',
      name: 'Date Converter',
      description: 'Convert between different date formats',
      component: DateConverter
    },
    {
      id: 'uuid',
      name: 'UUID Generator',
      description: 'Generate random UUIDs for your projects',
      component: UuidGenerator
    },
    {
      id: 'api',
      name: 'API Tester',
      description: 'Test REST API endpoints with a simple interface',
      component: ApiTester
    },
    {
      id: 'boilerplate',
      name: 'Boilerplate Generator',
      description: 'Generate code templates for Flutter projects',
      component: BoilerplateGenerator
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft - 200);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft + 200);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-background/95">
      <Helmet>
        <title>Developer Tools | Mahendran</title>
        <meta
          name="description"
          content="Powerful tools for mobile app developers. Format JSON, test regex patterns, convert colors, and more."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-medium text-primary">Developer Toolkit</span>
              <span className="h-px w-8 bg-primary/50"></span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Mobile Development Tools</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of powerful utilities to streamline your mobile development workflow.
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
                
                <div className="w-full overflow-hidden mx-8" ref={(el) => scrollRef.current = el}>
                  <TabsList className="inline-flex p-1 rounded-lg bg-secondary/80 overflow-x-auto w-max min-w-full">
                    {tools.map((tool) => (
                      <TabsTrigger
                        key={tool.id}
                        value={tool.id}
                        className="px-4 py-2 whitespace-nowrap"
                      >
                        {tool.name}
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
                  Scroll horizontally to see more tools →
                </p>
              </div>
            </div>
            
            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="mt-2 mb-10">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <tool.component />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <TechToolFinder />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Tools;
