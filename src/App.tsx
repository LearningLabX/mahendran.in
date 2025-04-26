
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

// Loading Screen Component with improved animation
// const LoadingScreen = () => (
//   <motion.div 
//     className="fixed inset-0 bg-background flex items-center justify-center z-50"
//     initial={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     <div className="text-center relative">
//       <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="150" height="150" viewBox="0 0 100 100">
//         <motion.circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="hsl(var(--primary))"
//           strokeWidth="2"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         />
//       </svg>
//       <motion.div 
//         className="w-16 h-16 relative"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.5 }}
//       >
//         <motion.div 
//           className="absolute inset-0 flex items-center justify-center"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, ease: "linear", repeat: Infinity }}
//         >
//           <div className="w-4 h-4 rounded-full bg-primary absolute top-0" />
//         </motion.div>
//       </motion.div>
//       <motion.h2 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="text-2xl font-bold mt-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
//       >
//         Mahendran's Portfolio
//       </motion.h2>
//     </div>
//   </motion.div>
// );

const App = () => {
  // const [loading, setLoading] = useState(true);

  // // Simulate loading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   },100003);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            {/* {loading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              > */}
                <BrowserRouter>
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
                  <Footer />
                </BrowserRouter>
              {/* </motion.div>
            )} */}
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
