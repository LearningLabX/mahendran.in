
import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { devTools } from '@/data/devTools';
import { Input } from '@/components/ui/input';
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
  { id: 'flutter', name: 'Flutter Dev', icon: 'Smartphone' },
  { id: 'frontend', name: 'Frontend', icon: 'LayoutDashboard' },
  { id: 'backend', name: 'Backend', icon: 'Database' },
  { id: 'utilities', name: 'Utilities', icon: 'Wrench' },
  { id: 'design', name: 'Design', icon: 'LayoutList' },
  { id: 'ai', name: 'AI Tools', icon: 'Lightbulb' },
  { id: 'other', name: 'Other', icon: 'Code' }
];

export function ToolsSidebar() {
  const [activeToolId, setActiveToolId] = useState('flutter-code');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['flutter']);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter tools by search query
  const filteredTools = searchQuery 
    ? devTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
  
  // Handle tool selection
  const handleToolSelect = (toolId: string) => {
    setActiveToolId(toolId);
    // Find the category of the selected tool
    const category = Object.entries(toolsByCategory).find(([_, tools]) => 
      tools.some(tool => tool.id === toolId)
    )?.[0];
    
    // Expand the category if it's not already expanded
    if (category && !expandedCategories.includes(category)) {
      setExpandedCategories(prev => [...prev, category]);
    }
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('tool-selected', { detail: { toolId } }));
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-800 px-2 py-3">
        <div className="px-2">
          <h2 className="text-lg font-semibold mb-2">Dev Tools</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {searchQuery ? (
          <SidebarGroup>
            <SidebarGroupLabel>Search Results</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredTools.length > 0 ? filteredTools.map((tool) => (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton 
                      onClick={() => handleToolSelect(tool.id)}
                      isActive={activeToolId === tool.id}
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
                )) : (
                  <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                    No tools found
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          categories.map((category) => {
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
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
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
          })
        )}
      </SidebarContent>
    </Sidebar>
  );
}
