
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RegexTester from '@/components/tools/RegexTester';
import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Tool from '@/components/tools/Base64Tool';
import ColorConverter from '@/components/tools/ColorConverter';
import SqlHelper from '@/components/tools/SqlHelper';
import { Binary, Brackets, FileCode, Palette } from 'lucide-react';

const UsefulTools = () => {
  const [activeTool, setActiveTool] = useState('regex');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
        <h2 className="text-2xl font-bold">Developer Tools</h2>
        <p className="text-muted-foreground">Quick access tools to boost your productivity</p>
      </div>

      <Tabs value={activeTool} onValueChange={setActiveTool} className="space-y-4">
        <div className="flex overflow-x-auto pb-2">
          <TabsList className="h-auto p-1 flex">
            <TabsTrigger value="regex" className="flex flex-col items-center gap-1 py-3 px-4 h-auto">
              <Brackets className="h-5 w-5" />
              <span>Regex Tester</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex flex-col items-center gap-1 py-3 px-4 h-auto">
              <FileCode className="h-5 w-5" />
              <span>JSON Formatter</span>
            </TabsTrigger>
            <TabsTrigger value="base64" className="flex flex-col items-center gap-1 py-3 px-4 h-auto">
              <Binary className="h-5 w-5" />
              <span>Binary Tools</span>
            </TabsTrigger>
            <TabsTrigger value="color" className="flex flex-col items-center gap-1 py-3 px-4 h-auto">
              <Palette className="h-5 w-5" />
              <span>Color Converter</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTool === 'regex' && 'Regular Expression Tester'}
              {activeTool === 'json' && 'JSON Formatter & Validator'}
              {activeTool === 'base64' && 'UUID ↔ Binary Converter'}
              {activeTool === 'color' && 'Flutter Color Converter'}
            </CardTitle>
            <CardDescription>
              {activeTool === 'regex' && 'Test and debug regular expressions with real-time matching'}
              {activeTool === 'json' && 'Format, validate and beautify your JSON data'}
              {activeTool === 'base64' && 'Convert between UUID and binary formats for MySQL'}
              {activeTool === 'color' && 'Convert between HEX, RGB and Flutter MaterialColor'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="regex" className="mt-0">
              <RegexTester />
            </TabsContent>
            <TabsContent value="json" className="mt-0">
              <JsonFormatter />
            </TabsContent>
            <TabsContent value="base64" className="mt-0">
              <SqlHelper />
            </TabsContent>
            <TabsContent value="color" className="mt-0">
              <ColorConverter />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default UsefulTools;
