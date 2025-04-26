
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effects
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Background gradient animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,0,0,0))]"
        />
      </div>

      {/* Animated grid background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      >
        <motion.div
          style={{ y, opacity }}
          className="w-full h-full"
        />
      </div>

      {/* Floating elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            background: `radial-gradient(circle at center, 
              rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1), 
              transparent)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Tech badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              <span className="text-primary/90">Mobile App Developer</span>
            </motion.div>

            {/* Main title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Next-Gen
              </span>{' '}
              Mobile Experiences
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Crafting beautiful, high-performance Flutter applications that transform ideas into seamless mobile experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Link to="/projects" className="group">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>

            {/* Tech stack */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
            >
              {['Flutter', 'Firebase', 'Node.js', 'MongoDB'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="text-center group cursor-pointer"
                >
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    {tech}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.span 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-muted-foreground mb-2"
        >
          Scroll to explore
        </motion.span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          className="w-5 h-5 border-b-2 border-r-2 border-primary/50 transform rotate-45"
        />
      </motion.div>
    </section>
  );
}
