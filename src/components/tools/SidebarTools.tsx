
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Card } from '@/components/ui/card';
import { 
  Code, Database, Binary, Smartphone, Wrench, LayoutDashboard, 
  ChevronRight, Lightbulb, LayoutList
} from 'lucide-react';

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
import { ToolContent } from './ToolContent';
import { devTools } from '@/data/devTools';

export default function SidebarTools() {
  const [activeToolId, setActiveToolId] = useState('flutter-code');
  
  // Get the currently active tool
  const activeTool = devTools.find((tool) => tool.id === activeToolId);
  
  // Group tools by category
  const toolsByCategory = devTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof devTools>);
  
  // Get categories with their icons
  const categories = [
    { id: 'flutter', name: 'Flutter Dev', icon: Smartphone },
    { id: 'frontend', name: 'Frontend', icon: LayoutDashboard },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'utilities', name: 'Utilities', icon: Wrench },
    { id: 'design', name: 'Design', icon: LayoutList },
    { id: 'ai', name: 'AI Tools', icon: Lightbulb },
    { id: 'other', name: 'Other', icon: Code }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent className="pt-6">
            {categories.map((category) => (
              <SidebarGroup key={category.id}>
                <SidebarGroupLabel>
                  <category.icon className="mr-2 h-4 w-4" />
                  <span>{category.name}</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {toolsByCategory[category.id]?.map((tool) => (
                      <SidebarMenuItem key={tool.id}>
                        <SidebarMenuButton 
                          isActive={activeToolId === tool.id}
                          onClick={() => setActiveToolId(tool.id)}
                          tooltip={tool.tooltip || tool.name}
                        >
                          <tool.icon className="h-4 w-4" />
                          <span>{tool.name}</span>
                          {tool.isPro && (
                            <span className="ml-auto text-xs font-semibold bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm">
                              PRO
                            </span>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="px-4 md:px-8 py-6 overflow-auto">
          <div className="flex items-center pb-6 border-b">
            <SidebarTrigger className="mr-4" />
            <div>
              <h1 className="text-2xl font-bold">{activeTool?.name || 'Developer Tools'}</h1>
              <p className="text-muted-foreground">{activeTool?.description}</p>
            </div>
          </div>
          
          <div className="mt-8">
            {activeTool && <ToolContent tool={activeTool} />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
