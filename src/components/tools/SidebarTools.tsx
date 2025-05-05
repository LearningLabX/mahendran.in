
import { useState, useEffect } from 'react';
import { ToolsSidebar } from './ToolsSidebar';
import { ToolsContent } from './ToolsContent';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SidebarTools() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-full h-full flex">
        <ToolsSidebar />
        <ToolsContent />
      </div>
    </SidebarProvider>
  );
}
