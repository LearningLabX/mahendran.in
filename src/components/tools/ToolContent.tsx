
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 mb-4">
              <tool.icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Tool Coming Soon</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              We're working hard to bring you this developer tool. Check back soon for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardContent className="p-4 md:p-6">
        <ToolComponent />
      </CardContent>
    </Card>
  );
};
