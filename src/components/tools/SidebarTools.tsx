
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
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Code, Database, Binary, Wrench, LayoutDashboard, 
  Lightbulb, LayoutList, Smartphone
} from 'lucide-react';

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
    { id: 'flutter', name: 'Flutter Dev', icon: LayoutList },
    { id: 'frontend', name: 'Frontend', icon: LayoutDashboard },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'utilities', name: 'Utilities', icon: Wrench },
    { id: 'design', name: 'Design', icon: LayoutList },
    { id: 'ai', name: 'AI Tools', icon: Lightbulb },
    { id: 'other', name: 'Other', icon: Code }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            {categories.map((category) => {
              const categoryTools = toolsByCategory[category.id] || [];
              
              return (
                <SidebarGroup key={category.id}>
                  <SidebarGroupLabel>
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{categoryTools.length}</span>
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {categoryTools.map((tool) => (
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
                            {tool.isNew && !tool.isPro && (
                              <span className="ml-auto text-xs font-semibold bg-green-500/20 text-green-600 px-1.5 py-0.5 rounded-sm">
                                NEW
                              </span>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="px-4 md:px-8 py-6 overflow-auto flex-1">
          <div className="flex items-center pb-6 border-b">
            <SidebarTrigger className="mr-4" />
            <div>
              <h1 className="text-2xl font-bold">{activeTool?.name || 'Developer Tools'}</h1>
              <p className="text-muted-foreground">{activeTool?.description}</p>
              {activeTool?.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {activeTool.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 mb-8">
            {activeTool && <ToolContent tool={activeTool} />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
