
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 py-20 px-4">
      <AnimatedSection variant="fade" className="max-w-md w-full text-center">
        <motion.svg 
          width="200" 
          height="100" 
          viewBox="0 0 200 100" 
          className="mx-auto mb-8"
        >
          <motion.path
            d="M40,50 A10,10 0 0,1 30,40 L30,20 A10,10 0 0,1 40,10 L60,10 A10,10 0 0,1 70,20 L70,40 A10,10 0 0,1 60,50 L40,50 Z M130,50 A10,10 0 0,1 120,40 L120,20 A10,10 0 0,1 130,10 L150,10 A10,10 0 0,1 160,20 L160,40 A10,10 0 0,1 150,50 L130,50 Z M20,90 C20,78 80,78 80,90 C80,78 140,78 140,90 C140,78 180,78 180,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <div className="text-sm text-muted-foreground mb-8 p-4 bg-secondary/40 rounded-md">
          <p>Attempted to access: <span className="font-mono">{location.pathname}</span></p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/blog">Browse Articles</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default NotFound;
