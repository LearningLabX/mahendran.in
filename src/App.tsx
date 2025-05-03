import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPageView } from '@/lib/analytics';

// Pages
import Index from './pages/Index';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const queryClient = new QueryClient();

// Page tracker component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract page title from path
    const getPageTitle = (pathname: string) => {
      if (pathname === '/') return 'Home';
      return pathname.charAt(1).toUpperCase() + pathname.slice(2).split('/')[0];
    };

    // Track page view when route changes
    trackPageView(location.pathname, getPageTitle(location.pathname));
  }, [location]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            <BrowserRouter>
              <PageTracker />
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:blogId" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {/* <Footer /> */}
            </BrowserRouter>
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
