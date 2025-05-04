
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
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';
import DiffChecker from '@/components/tools/DiffChecker';
import UiToCode from '@/components/tools/UiToCode';
import HttpStatusCodes from '@/components/tools/HttpStatusCodes';

// Define a mapping between tool IDs and their components
const toolComponents: Record<string, React.ComponentType> = {
  'regex': RegexTester,
  'json': JsonFormatterTool,
  'base64': Base64Tool,
  'color': ColorConverter,
  'date': DateConverter,
  'uuid': UuidGenerator,
  'api': ApiTester,
  'boilerplate': BoilerplateGenerator,
  'markdown': MarkdownConverter,
  'sql': SqlHelper,
  'flutter-code': FlutterCodePreview,
  'json-formatter': JsonFormatterTool,
  'diff-checker': DiffChecker,
  'ui-to-code': UiToCode,
  'http-status': HttpStatusCodes,
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
          <CardTitle>Tool Coming Soon</CardTitle>
          <CardDescription>This tool is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>We're working hard to bring you this developer tool. Check back soon for updates!</p>
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
