
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Tool components
import RegexTester from '@/components/tools/RegexTester';
import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Tool from '@/components/tools/Base64Tool';
import ColorConverter from '@/components/tools/ColorConverter';
import DateConverter from '@/components/tools/DateConverter';
import UuidGenerator from '@/components/tools/UuidGenerator';
import ApiTester from '@/components/tools/ApiTester';
import BoilerplateGenerator from '@/components/tools/BoilerplateGenerator';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('regex');
  
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
  
  const externalResources = [
    {
      name: 'DartPad',
      description: 'Write, analyze, and execute Dart code online',
      url: 'https://dartpad.dev/'
    },
    {
      name: 'Flutter Widget Catalog',
      description: 'Official catalog of Flutter widgets',
      url: 'https://flutter.dev/docs/development/ui/widgets'
    },
    {
      name: 'DevTools',
      description: 'Suite of performance and debugging tools for Flutter',
      url: 'https://flutter.dev/docs/development/tools/devtools/overview'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
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
            <div className="flex justify-center mb-8">
              <TabsList className="flex space-x-1 rounded-lg bg-secondary/80 p-1 overflow-x-auto max-w-full sm:max-w-3xl">
                {tools.map((tool) => (
                  <TabsTrigger
                    key={tool.id}
                    value={tool.id}
                    className="whitespace-nowrap"
                  >
                    {tool.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="mt-2 mb-10">
                <Card>
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
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">External Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {externalResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Tools;
