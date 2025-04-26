
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Subtle parallax effect for background
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,0,0,0))]" />
      </div>

      {/* Subtle grid background */}
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

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left md:flex-1"
          >
            {/* Dev badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span className="text-primary/90">Flutter Mobile App Developer</span>
            </motion.div>

            {/* Main title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Exceptional
              </span>{' '}
              Mobile Experiences
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Transforming ideas into high-performance, user-centric mobile applications 
              using Flutter and cutting-edge mobile development practices.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-0"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Link to="/projects" className="group">
                  Explore Portfolio
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Me</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Developer Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative md:flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Main image with border */}
              <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/20 shadow-xl">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Mobile Developer" 
                  className="object-cover" 
                />
                <AvatarFallback>DEV</AvatarFallback>
              </Avatar>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full -z-10"></div>
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-dashed border-primary/40 rounded-full -z-10"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Tech stack - moved below */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-3xl mx-auto"
        >
          {[
            'Flutter', 
            'Dart', 
            'Firebase', 
            'GetX'
          ].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className="text-center group cursor-pointer"
            >
              <p className="font-medium text-lg group-hover:text-primary transition-colors">
                {tech}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - now using absolute positioning within the hero section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <motion.span 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-muted-foreground mb-2"
        >
          Scroll
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
