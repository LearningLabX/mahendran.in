
import { 
  Code, Database, Binary, Smartphone, Wrench, LayoutDashboard, 
  Lightbulb, LayoutList, FileJson, FileSearch, Http, FileCode, 
  FileCheck, FileText, FileArchive, FileX
} from 'lucide-react';

export interface DevTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  tooltip?: string;
  isPro?: boolean;
  isNew?: boolean;
  tags?: string[];
}

// Comprehensive list of developer tools
export const devTools: DevTool[] = [
  // Flutter Dev Tools
  {
    id: 'flutter-code',
    name: 'Flutter Code Preview',
    description: 'Live preview of Flutter widgets with dark/light themes',
    category: 'flutter',
    icon: Smartphone,
    tags: ['Flutter', 'Preview', 'UI'],
  },
  {
    id: 'color',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and Flutter Color formats',
    category: 'flutter',
    icon: LayoutList,
    tags: ['Flutter', 'Color', 'Design'],
  },
  {
    id: 'json',
    name: 'JSON to Dart Model',
    description: 'Format, validate and convert JSON to Dart classes',
    category: 'flutter',
    icon: FileJson,
    tags: ['Flutter', 'JSON', 'Dart'],
  },
  {
    id: 'flutter-assets',
    name: 'Flutter Assets Generator',
    description: 'Generate asset declarations for pubspec.yaml',
    category: 'flutter',
    icon: Wrench,
    isPro: true,
    isNew: true,
    tags: ['Flutter', 'Assets', 'Generation'],
  },
  {
    id: 'flutter-theme',
    name: 'Theme Generator',
    description: 'Create custom themes for your Flutter applications',
    category: 'flutter',
    icon: LayoutList,
    isPro: true,
    tags: ['Flutter', 'Theme', 'UI'],
  },
  
  // Frontend Tools
  {
    id: 'html-to-flutter',
    name: 'HTML to Flutter',
    description: 'Convert HTML/CSS to Flutter widgets',
    category: 'frontend',
    icon: Code,
    isPro: true,
    tags: ['Flutter', 'HTML', 'Conversion'],
  },
  {
    id: 'css-to-flutter',
    name: 'CSS to Flutter',
    description: 'Convert CSS styles to Flutter styling',
    category: 'frontend',
    icon: LayoutList,
    tags: ['CSS', 'Flutter', 'Styling'],
  },
  {
    id: 'responsive-checker',
    name: 'Responsive UI Checker',
    description: 'Test your UI across different screen sizes',
    category: 'frontend',
    icon: Smartphone,
    tags: ['Responsive', 'UI', 'Testing'],
  },
  {
    id: 'markdown',
    name: 'Markdown to HTML',
    description: 'Convert Markdown to HTML with live preview',
    category: 'frontend',
    icon: FileText,
    tags: ['Markdown', 'HTML', 'Preview'],
  },
  
  // Backend Tools
  {
    id: 'sql',
    name: 'UUID ↔ Binary Converter',
    description: 'Convert between UUID and binary for MySQL storage',
    category: 'backend',
    icon: Database,
    tags: ['SQL', 'UUID', 'MySQL'],
  },
  {
    id: 'base64',
    name: 'Base64 Tool',
    description: 'Encode and decode Base64 strings',
    category: 'backend',
    icon: Binary,
    tags: ['Base64', 'Encoding', 'Decoding'],
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Generate random UUIDs for your projects',
    category: 'backend',
    icon: Code,
    tags: ['UUID', 'Generator'],
  },
  {
    id: 'api',
    name: 'API Tester',
    description: 'Test REST API endpoints with a simple interface',
    category: 'backend',
    icon: LayoutDashboard,
    tags: ['API', 'REST', 'Testing'],
  },
  {
    id: 'date',
    name: 'Date Converter',
    description: 'Convert between different date formats',
    category: 'backend',
    icon: Code,
    tags: ['Date', 'Time', 'Conversion'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and validate JWT tokens',
    category: 'backend',
    icon: FileCode,
    isPro: true,
    isNew: true,
    tags: ['JWT', 'Authentication', 'Security'],
  },
  {
    id: 'graphql-explorer',
    name: 'GraphQL Explorer',
    description: 'Build and test GraphQL queries',
    category: 'backend',
    icon: Database,
    isPro: true,
    tags: ['GraphQL', 'API', 'Query'],
  },
  
  // Utilities
  {
    id: 'regex',
    name: 'Regex Tester',
    description: 'Test regular expressions with instant feedback',
    category: 'utilities',
    icon: FileSearch,
    tags: ['Regex', 'Testing', 'Validation'],
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'utilities',
    icon: FileJson,
    tags: ['JSON', 'Formatting', 'Validation'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two text snippets and highlight differences',
    category: 'utilities',
    icon: FileCheck,
    isNew: true,
    tags: ['Diff', 'Comparison', 'Text'],
  },
  {
    id: 'yaml-converter',
    name: 'YAML ↔ JSON',
    description: 'Convert between YAML and JSON formats',
    category: 'utilities',
    icon: FileArchive,
    tags: ['YAML', 'JSON', 'Conversion'],
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your projects',
    category: 'utilities',
    icon: LayoutList,
    tags: ['Lorem Ipsum', 'Text', 'Placeholder'],
  },
  {
    id: 'http-status',
    name: 'HTTP Status Codes',
    description: 'Reference for HTTP status codes and their meanings',
    category: 'utilities',
    icon: Http,
    isNew: true,
    tags: ['HTTP', 'Status Codes', 'API'],
  },

  // Design Tools
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Create harmonious color schemes for your app',
    category: 'design',
    icon: LayoutList,
    isPro: true,
    tags: ['Color', 'Palette', 'Design'],
  },
  {
    id: 'box-shadow',
    name: 'Box Shadow Generator',
    description: 'Create CSS and Flutter box shadows with live preview',
    category: 'design',
    icon: LayoutList,
    tags: ['Box Shadow', 'CSS', 'Flutter'],
  },
  {
    id: 'gradient-maker',
    name: 'Gradient Maker',
    description: 'Create beautiful gradients for your UI',
    category: 'design',
    icon: LayoutList,
    tags: ['Gradient', 'Color', 'Design'],
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Optimizer',
    description: 'Optimize SVG files for web and mobile',
    category: 'design',
    icon: FileCode,
    isPro: true,
    tags: ['SVG', 'Optimization', 'Design'],
  },
  
  // AI Tools
  {
    id: 'ui-to-code',
    name: 'UI to Code',
    description: 'Convert UI mockups to Flutter code using AI',
    category: 'ai',
    icon: Lightbulb,
    isPro: true,
    isNew: true,
    tags: ['AI', 'UI', 'Code Generation'],
  },
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    description: 'Understand complex code snippets with AI explanations',
    category: 'ai',
    icon: Lightbulb,
    isPro: true,
    tags: ['AI', 'Code', 'Learning'],
  },
  {
    id: 'commit-message',
    name: 'Commit Message Generator',
    description: 'Generate meaningful git commit messages from diff',
    category: 'ai',
    icon: Lightbulb,
    isPro: true,
    tags: ['AI', 'Git', 'Commit'],
  },
  
  // Other Tools
  {
    id: 'boilerplate',
    name: 'Boilerplate Generator',
    description: 'Generate code templates for Flutter projects',
    category: 'other',
    icon: FileCode,
    tags: ['Boilerplate', 'Templates', 'Flutter'],
  },
  {
    id: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Parse and explain cron expressions',
    category: 'other',
    icon: FileX,
    tags: ['Cron', 'Scheduling', 'Backend'],
  },
  {
    id: 'mime-types',
    name: 'MIME Types Reference',
    description: 'Lookup MIME types for different file extensions',
    category: 'other',
    icon: FileText,
    tags: ['MIME', 'File Types', 'Reference'],
  },
];
