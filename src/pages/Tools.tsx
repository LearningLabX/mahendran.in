import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Database, Code, Binary, Flutter } from 'lucide-react';
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
import FlutterCodePreview from '@/components/tools/FlutterCodePreview';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('flutter-code');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const tools = [
    // Flutter Dev Tools Section
    {
      id: 'flutter-code',
      name: 'Flutter Code Preview',
      description: 'Live preview of Flutter widgets with dark/light themes',
      component: FlutterCodePreview,
      category: 'flutter'
    },
    {
      id: 'color',
      name: 'Color Converter',
      description: 'Convert between HEX, RGB, and Flutter Color formats',
      component: ColorConverter,
      category: 'flutter'
    },
    {
      id: 'json',
      name: 'JSON to Dart Model',
      description: 'Format, validate and convert JSON to Dart classes',
      component: JsonFormatter,
      category: 'flutter'
    },
    
    // Backend Tools Section
    {
      id: 'sql',
      name: 'UUID ↔ Binary Converter',
      description: 'Convert between UUID and binary for MySQL storage',
      component: SqlHelper,
      category: 'backend'
    },
    {
      id: 'base64',
      name: 'Base64 Tool',
      description: 'Encode and decode Base64 strings',
      component: Base64Tool,
      category: 'backend'
    },
    {
      id: 'uuid',
      name: 'UUID Generator',
      description: 'Generate random UUIDs for your projects',
      component: UuidGenerator,
      category: 'backend'
    },
    {
      id: 'api',
      name: 'API Tester',
      description: 'Test REST API endpoints with a simple interface',
      component: ApiTester,
      category: 'backend'
    },
    {
      id: 'date',
      name: 'Date Converter',
      description: 'Convert between different date formats',
      component: DateConverter,
      category: 'backend'
    },
    
    // Other Tools Section
    {
      id: 'regex',
      name: 'Regex Tester',
      description: 'Test regular expressions with instant feedback',
      component: RegexTester,
      category: 'other'
    },
    {
      id: 'markdown',
      name: 'Markdown to HTML',
      description: 'Convert Markdown to HTML with live preview',
      component: MarkdownConverter,
      category: 'other'
    },
    {
      id: 'boilerplate',
      name: 'Boilerplate Generator',
      description: 'Generate code templates for Flutter projects',
      component: BoilerplateGenerator,
      category: 'other'
    }
  ];

  // Get tools for each category
  const flutterTools = tools.filter(tool => tool.category === 'flutter');
  const backendTools = tools.filter(tool => tool.category === 'backend');
  const otherTools = tools.filter(tool => tool.category === 'other');

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
          <Tabs 
            defaultValue="flutter" 
            className="w-full mb-8"
            onValueChange={(value) => {
              // Auto-select first tool in the category
              if (value === 'flutter' && flutterTools.length > 0) {
                setActiveTab(flutterTools[0].id);
              } else if (value === 'backend' && backendTools.length > 0) {
                setActiveTab(backendTools[0].id);
              } else if (value === 'other' && otherTools.length > 0) {
                setActiveTab(otherTools[0].id);
              }
            }}
          >
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="flutter" className="flex items-center gap-2">
                <Flutter className="h-4 w-4" />
                <span>Flutter Tools</span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Backend Tools</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Other Tools</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flutter" className="focus-visible:outline-none focus-visible:ring-0">
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
                      {flutterTools.map((tool) => (
                        <TabsTrigger
                          key={tool.id}
                          value={tool.id}
                          className="px-4 py-2 whitespace-nowrap"
                          onClick={() => setActiveTab(tool.id)}
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
              </div>
            </TabsContent>

            <TabsContent value="backend" className="focus-visible:outline-none focus-visible:ring-0">
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
                      {backendTools.map((tool) => (
                        <TabsTrigger
                          key={tool.id}
                          value={tool.id}
                          className="px-4 py-2 whitespace-nowrap"
                          onClick={() => setActiveTab(tool.id)}
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
              </div>
            </TabsContent>

            <TabsContent value="other" className="focus-visible:outline-none focus-visible:ring-0">
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
                      {otherTools.map((tool) => (
                        <TabsTrigger
                          key={tool.id}
                          value={tool.id}
                          className="px-4 py-2 whitespace-nowrap"
                          onClick={() => setActiveTab(tool.id)}
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
              </div>
            </TabsContent>
          </Tabs>

          {tools.map((tool) => (
            <div key={tool.id} className={activeTab === tool.id ? "block" : "hidden"}>
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <tool.component />
                </CardContent>
              </Card>
            </div>
          ))}
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <TechToolFinder />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Tools;
