import { Helmet } from 'react-helmet';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ToolsSidebar } from '@/components/tools/ToolsSidebar';
import { ToolsContent } from '@/components/tools/ToolsContent';
import Navbar from '@/components/layout/Navbar';

const Tools = () => {
  return (
    <>
      <Helmet>
        <title>Developer Tools | Mahendran</title>
        <meta
          name="description"
          content="100+ powerful tools for mobile app developers. Format JSON, test regex patterns, convert colors, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
        <SidebarProvider defaultOpen={true}>
          <div className="w-full h-full flex">
            <ToolsSidebar />
            <ToolsContent />
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default Tools;
