
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    { id: 'flutter', name: 'Flutter Dev', icon: 'Smartphone' },
    { id: 'frontend', name: 'Frontend', icon: 'LayoutDashboard' },
    { id: 'backend', name: 'Backend', icon: 'Database' },
    { id: 'utilities', name: 'Utilities', icon: 'Wrench' },
    { id: 'design', name: 'Design', icon: 'LayoutList' },
    { id: 'ai', name: 'AI Tools', icon: 'Lightbulb' },
    { id: 'other', name: 'Other', icon: 'Code' }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full min-h-screen w-full pt-16">
        <Sidebar className="border-r bg-slate-50 dark:bg-slate-900">
          <SidebarContent className="py-2">
            <Accordion type="multiple" defaultValue={['flutter']} className="px-1">
              {categories.map((category) => {
                const categoryTools = toolsByCategory[category.id] || [];
                
                return (
                  <AccordionItem key={category.id} value={category.id} className="border-b border-slate-200 dark:border-slate-800">
                    <AccordionTrigger className="py-3 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                      <div className="flex items-center gap-3 w-full text-sm font-medium">
                        <span className="flex-1">{category.name}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
                          {categoryTools.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <SidebarMenu>
                        {categoryTools.map((tool) => (
                          <SidebarMenuItem key={tool.id} className="mb-1">
                            <SidebarMenuButton 
                              isActive={activeToolId === tool.id}
                              onClick={() => setActiveToolId(tool.id)}
                              tooltip={tool.tooltip || tool.name}
                              className="py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <tool.icon className="h-4 w-4 mr-2" />
                              <span className="text-sm">{tool.name}</span>
                              {tool.isPro && (
                                <span className="ml-auto text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white px-1.5 py-0.5 rounded-sm">
                                  PRO
                                </span>
                              )}
                              {tool.isNew && !tool.isPro && (
                                <span className="ml-auto text-xs font-medium bg-green-500 text-white px-1.5 py-0.5 rounded-sm">
                                  NEW
                                </span>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="px-4 md:px-8 py-6 overflow-auto flex-1 bg-white dark:bg-slate-950 pt-8">
          <div className="flex items-center pb-6 border-b border-slate-200 dark:border-slate-800 mt-10">
            <SidebarTrigger className="mr-4 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{activeTool?.name || 'Developer Tools'}</h1>
              <p className="text-slate-500 dark:text-slate-400">{activeTool?.description}</p>
              {activeTool?.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {activeTool.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
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
