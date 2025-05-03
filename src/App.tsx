
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPageView } from '@/lib/analytics';
import { Helmet } from 'react-helmet';

// Pages
import Index from './pages/Index';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Games from './pages/Games';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/chat/ChatBot';

const queryClient = new QueryClient();

// Page tracker component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract page title from path
    const getPageTitle = (pathname: string) => {
      if (pathname === '/') return 'Home';
      if (pathname.includes('/blog/')) return 'Blog Post';
      return pathname.charAt(1).toUpperCase() + pathname.slice(2).split('/')[0];
    };

    // Track page view when route changes
    trackPageView(location.pathname, getPageTitle(location.pathname));

    // Reinitialize AdSense ads on route change
    if (window.adsbygoogle && window.adsbygoogle.push) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Helmet>
            <title>Mahendran | Mobile App Development Expert</title>
            <meta
              name="description"
              content="Mobile app development blog, tutorials and resources for Flutter, React Native, Android and iOS developers."
            />
            <meta
              name="keywords"
              content="mobile development, Flutter, React Native, app monetization, iOS development, Android development"
            />
            <meta
              property="og:title"
              content="Mahendran | Mobile App Development"
            />
            <meta
              property="og:description"
              content="Expert tips and tutorials on mobile app development"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://mahendran.info" />
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>

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
                  <Route path="/games" element={<Games />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {/* <Footer /> */}
              {/* Integrate ChatBot component */}
              <ChatBot />
            </BrowserRouter>
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
