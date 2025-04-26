
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type AnimationVariant = 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'zoom' | 'rotate' | 'flip' | 'none';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  once?: boolean;
  threshold?: number;
  stagger?: boolean;
  staggerDelay?: number;
  staggerChildren?: boolean;
};

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.7,
  variant = 'fade',
  once = true,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1,
  staggerChildren = false
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add some delay for staggered animations
        setTimeout(() => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        }, delay);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, once, threshold]);

  const getVariants = () => {
    switch(variant) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } }
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0, transition: { duration, ease: "easeOut" } }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0, transition: { duration, ease: "easeOut" } }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration, ease: "easeOut" } }
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -5, scale: 0.95 },
          visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration, ease: "easeOut" } }
        };
      case 'flip':
        return {
          hidden: { opacity: 0, rotateX: 80 },
          visible: { opacity: 1, rotateX: 0, transition: { duration: duration * 1.2, ease: "easeOut" } }
        };
      case 'none':
      default:
        return {
          hidden: {},
          visible: {}
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: stagger ? staggerDelay : 0,
        delayChildren: delay / 1000
      }
    }
  };

  return (
    <div ref={sectionRef} className={className}>
      {staggerChildren ? (
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={getVariants()}
              transition={{ delay: index * staggerDelay }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={getVariants()}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
