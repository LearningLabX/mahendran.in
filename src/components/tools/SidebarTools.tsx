
import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { ToolContent } from './ToolContent';
import { devTools } from '@/data/devTools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SidebarTools() {
  const [activeToolId, setActiveToolId] = useState('flutter-code');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['flutter']);
  
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

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-6rem)]">
      {/* Mobile sidebar toggle */}
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <h2 className="text-xl font-bold">Dev Tools</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle sidebar"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`
          w-full md:w-72 lg:w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800
          ${mobileMenuOpen ? 'block' : 'hidden'} md:block overflow-y-auto h-[calc(100vh-10rem)] md:h-auto
        `}
      >
        <div className="p-4 sticky top-0 bg-white dark:bg-slate-950 z-10 border-b border-slate-200 dark:border-slate-800">
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

        {searchQuery ? (
          <div className="p-2">
            <h3 className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400">Search Results</h3>
            <div className="mt-1 space-y-1">
              {filteredTools.length > 0 ? filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveToolId(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center w-full px-3 py-2 text-left rounded-md text-sm 
                    ${activeToolId === tool.id 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}
                  `}
                >
                  <tool.icon className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{tool.name}</span>
                  {tool.isPro && (
                    <span className="ml-auto text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white px-1.5 py-0.5 rounded-sm">
                      PRO
                    </span>
                  )}
                </button>
              )) : (
                <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                  No tools found
                </div>
              )}
            </div>
          </div>
        ) : (
          <nav className="p-2">
            {categories.map((category) => {
              const categoryTools = toolsByCategory[category.id] || [];
              const isExpanded = expandedCategories.includes(category.id);
              
              return (
                <div key={category.id} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                  >
                    <span className="flex items-center">
                      {category.name}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 mr-2">
                        {categoryTools.length}
                      </span>
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-1 ml-2 space-y-1">
                      {categoryTools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setActiveToolId(tool.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`
                            flex items-center w-full px-3 py-2 text-left rounded-md text-sm
                            ${activeToolId === tool.id 
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium' 
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}
                          `}
                        >
                          <tool.icon className="h-4 w-4 mr-2 shrink-0" />
                          <span className="truncate">{tool.name}</span>
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
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {activeTool && (
          <div>
            <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mr-3 text-slate-700 dark:text-slate-300"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu size={20} />
                </Button>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{activeTool?.name || 'Developer Tools'}</h1>
                {activeTool?.isPro && (
                  <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded">
                    PRO
                  </span>
                )}
              </div>
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
            
            <div className="mt-8 mb-8">
              <ToolContent tool={activeTool} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
