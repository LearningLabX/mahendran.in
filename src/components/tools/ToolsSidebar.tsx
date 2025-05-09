import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { devTools } from '@/data/devTools';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Navbar from '../layout/Navbar';

// Group tools by category
const toolsByCategory = devTools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, typeof devTools>);

// Categories with their readable names
const categories = [
  { id: 'frontend', name: 'Frontend', icon: 'LayoutDashboard' },
  { id: 'backend', name: 'Backend', icon: 'Database' },
  { id: 'utilities', name: 'Utilities', icon: 'Wrench' },
  { id: 'ai', name: 'AI Tools', icon: 'Lightbulb' },
  { id: 'other', name: 'Other', icon: 'Code' },
];

export function ToolsSidebar() {
  const [activeToolId, setActiveToolId] = useState('flutter-code');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'frontend',
  ]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleToolSelect = (toolId: string) => {
    setActiveToolId(toolId);
    const category = Object.entries(toolsByCategory).find(([_, tools]) =>
      tools.some((tool) => tool.id === toolId)
    )?.[0];

    if (category && !expandedCategories.includes(category)) {
      setExpandedCategories((prev) => [...prev, category]);
    }

    window.dispatchEvent(
      new CustomEvent('tool-selected', { detail: { toolId } })
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar
        className={`fixed top-16 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-lg shadow-sm border-r border-slate-200 dark:border-slate-800`}
      >
        {/* <div className="mt-16"></div> */}
        <SidebarHeader className="border-b border-slate-200 dark:border-slate-800 px-2 py-3">
          <h2 className="text-lg font-semibold">Tools</h2>
        </SidebarHeader>

        <SidebarContent>
          {categories.map((category) => {
            const categoryTools = toolsByCategory[category.id] || [];
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <SidebarGroup key={category.id}>
                <SidebarGroupLabel
                  asChild
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    <div className="flex items-center">
                      <span className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 mr-2">
                        {categoryTools.length}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </SidebarGroupLabel>

                {isExpanded && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {categoryTools.map((tool) => (
                        <SidebarMenuItem key={tool.id}>
                          <SidebarMenuButton
                            onClick={() => handleToolSelect(tool.id)}
                            isActive={activeToolId === tool.id}
                            tooltip={tool.description}
                          >
                            <tool.icon className="h-4 w-4 mr-2" />
                            <span>{tool.name}</span>
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
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            );
          })}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
