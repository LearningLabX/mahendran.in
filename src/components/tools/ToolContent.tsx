
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DevTool } from '@/data/devTools';

// Import tool components
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
import FlutterCodePreview from '@/components/tools/FlutterCodePreview';

// Define a mapping between tool IDs and their components
const toolComponents: Record<string, React.ComponentType> = {
  'regex': RegexTester,
  'json': JsonFormatter,
  'base64': Base64Tool,
  'color': ColorConverter,
  'date': DateConverter,
  'uuid': UuidGenerator,
  'api': ApiTester,
  'boilerplate': BoilerplateGenerator,
  'markdown': MarkdownConverter,
  'sql': SqlHelper,
  'flutter-code': FlutterCodePreview,
};

interface ToolContentProps {
  tool: DevTool;
}

export const ToolContent: React.FC<ToolContentProps> = ({ tool }) => {
  // Get the component for this tool
  const ToolComponent = toolComponents[tool.id];
  
  if (!ToolComponent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tool Not Available</CardTitle>
          <CardDescription>The component for this tool is not available.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please check back later for this tool.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <tool.icon className="h-5 w-5" />
          {tool.name}
          {tool.isPro && (
            <span className="ml-2 text-xs font-semibold bg-primary/20 text-primary px-2 py-0.5 rounded">
              PRO
            </span>
          )}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ToolComponent />
      </CardContent>
    </Card>
  );
};
