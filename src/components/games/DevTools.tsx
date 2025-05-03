
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, ExternalLink } from 'lucide-react';

const DevTools = () => {
  const [regexInput, setRegexInput] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('');
  const [regexResult, setRegexResult] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [colorPrimary, setColorPrimary] = useState('#3B82F6');
  const [colorSecondary, setColorSecondary] = useState('#10B981');
  const [colorAccent, setColorAccent] = useState('#F59E0B');
  const [colorText, setColorText] = useState('#111827');
  const [colorBg, setColorBg] = useState('#FFFFFF');

  // Test regex
  const testRegex = () => {
    try {
      if (!regexPattern) return;
      
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = regexInput.match(regex);
      
      setRegexResult(matches || []);
    } catch (error) {
      setRegexResult(['Invalid regex pattern']);
    }
  };
  
  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Generate color scheme CSS
  const generateColorScheme = () => {
    return `/* Tailwind CSS colors */
:root {
  --color-primary: ${colorPrimary};
  --color-secondary: ${colorSecondary};
  --color-accent: ${colorAccent};
  --color-text: ${colorText};
  --color-background: ${colorBg};
}

/* Sass variables */
$primary: ${colorPrimary};
$secondary: ${colorSecondary};
$accent: ${colorAccent};
$text: ${colorText};
$background: ${colorBg};`;
  };
  
  const toolCards = [
    {
      title: "DartPad Embed",
      description: "Try Dart code live in your browser",
      link: "https://dartpad.dev/"
    },
    {
      title: "Flutter Playground",
      description: "Experiment with Flutter widgets",
      link: "https://zapp.run/"
    },
    {
      title: "Android Asset Studio",
      description: "Generate Android app icons and resources",
      link: "https://romannurik.github.io/AndroidAssetStudio/"
    },
    {
      title: "iOS App Icon Generator",
      description: "Create iOS app icons in all required sizes",
      link: "https://appicon.co/"
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="regex">
        <TabsList>
          <TabsTrigger value="regex">Regex Tester</TabsTrigger>
          <TabsTrigger value="colors">Color Picker</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regex" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Regular Expression Pattern"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Flags (e.g., gi)"
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Text to test against"
                  value={regexInput}
                  onChange={(e) => setRegexInput(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <Button onClick={testRegex}>Test Regex</Button>
            
            {regexResult.length > 0 && (
              <div className="mt-4 p-4 border rounded-md bg-secondary/10">
                <h3 className="font-medium mb-2">Results:</h3>
                <ul className="space-y-1">
                  {regexResult.map((match, i) => (
                    <li key={i} className="font-mono text-sm">
                      {match}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: colorPrimary }}></div>
                  <Input
                    type="color"
                    value={colorPrimary}
                    onChange={(e) => setColorPrimary(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Secondary</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: colorSecondary }}></div>
                  <Input
                    type="color"
                    value={colorSecondary}
                    onChange={(e) => setColorSecondary(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Accent</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: colorAccent }}></div>
                  <Input
                    type="color"
                    value={colorAccent}
                    onChange={(e) => setColorAccent(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Text</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: colorText }}></div>
                  <Input
                    type="color"
                    value={colorText}
                    onChange={(e) => setColorText(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Background</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: colorBg }}></div>
                  <Input
                    type="color"
                    value={colorBg}
                    onChange={(e) => setColorBg(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-4 rounded-md bg-secondary/10 font-mono text-sm relative">
                <pre className="whitespace-pre-wrap">{generateColorScheme()}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(generateColorScheme())}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="mt-6 p-4 rounded-md" style={{ backgroundColor: colorBg }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: colorText }}>Preview</h3>
                <div className="flex gap-2 mb-2">
                  <Button style={{ backgroundColor: colorPrimary }}>Primary</Button>
                  <Button 
                    style={{ 
                      backgroundColor: colorSecondary, 
                      color: colorText 
                    }}
                  >
                    Secondary
                  </Button>
                </div>
                <p style={{ color: colorText }}>
                  This is a preview of your color scheme with 
                  <span style={{ color: colorAccent }} className="mx-1 font-medium">
                    accent text
                  </span> 
                  integrated.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toolCards.map((tool, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DevTools;
