
import { useState, useEffect } from 'react';
import { ToolContent } from '@/components/tools/ToolContent';
import { devTools } from '@/data/devTools';
import { SidebarInset } from '@/components/ui/sidebar';

export function ToolsContent() {
  const [activeToolId, setActiveToolId] = useState('flutter-code');
  const activeTool = devTools.find((tool) => tool.id === activeToolId);

  // Listen for tool selection events
  useEffect(() => {
    const handleToolSelected = (event: CustomEvent<{ toolId: string }>) => {
      setActiveToolId(event.detail.toolId);
    };

    window.addEventListener('tool-selected', handleToolSelected as EventListener);
    return () => {
      window.removeEventListener('tool-selected', handleToolSelected as EventListener);
    };
  }, []);

  return (
    <SidebarInset className="p-4 md:p-8 overflow-auto">
      {activeTool && (
        <div>
          <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center mb-2">
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
    </SidebarInset>
  );
}
