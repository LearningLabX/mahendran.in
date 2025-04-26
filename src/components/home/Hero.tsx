
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentReel, setCurrentReel] = useState(0);
  const reels = [
    "https://assets.mixkit.co/videos/preview/mixkit-app-development-concept-phone-and-programmer-8297-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-writing-code-on-a-laptop-9748-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-phone-screen-showing-app-interface-closeup-9739-large.mp4"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Auto-rotate reels
    const interval = setInterval(() => {
      setCurrentReel(prev => (prev + 1) % reels.length);
    }, 8000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Parallax effect
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-[100vh] flex items-center relative overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {reels.map((videoSrc, index) => (
          <video 
            key={videoSrc}
            autoPlay 
            muted 
            loop
            playsInline
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              currentReel === index ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => console.log(`Video ${index} loaded`)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] z-10"
        style={{ 
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          ...parallaxStyle 
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-black/30 backdrop-blur-md text-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-white/90">Available for new projects</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white"
          >
            Mobile App Developer Crafting <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Digital Experiences</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Transforming ideas into elegant, high-performance mobile applications that drive engagement and deliver exceptional user experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 border-0 text-white">
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {['React Native', 'Flutter', 'Swift', 'Kotlin'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                className="text-center text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
              >
                <p className="font-medium text-lg">{tech}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Reel indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
          >
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReel(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentReel === index ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`View reel ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce"
      >
        <span className="text-sm text-white/70 mb-2">Scroll</span>
        <span className="w-5 h-5 border-b-2 border-r-2 border-white/70 transform rotate-45"></span>
      </motion.div>
    </section>
  );
}
