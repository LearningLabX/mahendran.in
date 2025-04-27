
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TechElement = ({ svg, color, size = 24 }: { svg: string; color: string; size?: number }) => {
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight - 100,
  });

  const [position, setPosition] = useState(randomPosition());
  const [isChasing, setIsChasing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(randomPosition());
      setIsChasing(Math.random() > 0.7);
      setIsRotating(Math.random() > 0.5);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute cursor-pointer"
      initial={randomPosition()}
      animate={{
        x: position.x,
        y: position.y,
        scale: isChasing ? [1, 1.2, 0.9, 1] : 1,
        rotate: isRotating ? [0, 360] : 0,
      }}
      transition={{
        duration: isChasing ? 2 : 4,
        ease: "easeInOut",
        scale: {
          duration: 1,
          repeat: isChasing ? Infinity : 0,
          repeatType: "reverse",
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      whileHover={{
        scale: 1.2,
        rotate: 180,
        transition: { duration: 0.3 }
      }}
    >
      <div 
        className={`${color} opacity-70 hover:opacity-100 transition-all duration-300 drop-shadow-lg`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </motion.div>
  );
};

const HeroBackground = () => {
  const techElements = [
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>`,
      color: "text-blue-500",
      size: 32
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5M12 4.15L6.04 7.5L12 10.85L17.96 7.5L12 4.15M5 15.91L11 19.29V12.58L5 9.21V15.91M19 15.91V9.21L13 12.58V19.29L19 15.91Z"/></svg>`,
      color: "text-green-500",
      size: 38
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6,16V8H8V16H6M8,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H8A2,2 0 0,0 10,20V4A2,2 0 0,0 8,2M16,16V8H18V16H16M18,2H16A2,2 0 0,0 14,4V20A2,2 0 0,0 16,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z"/></svg>`,
      color: "text-purple-500",
      size: 34
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2M12.83,12.83L11.41,11.41C10.63,12.05 9.63,12.5 8.5,12.5A4.5,4.5 0 0,1 4,8A4.5,4.5 0 0,1 8.5,3.5A4.5,4.5 0 0,1 13,8C13,9.12 12.55,10.12 11.91,10.91L13.33,12.33L12.83,12.83M10.5,8A2,2 0 0,0 8.5,6A2,2 0 0,0 6.5,8A2,2 0 0,0 8.5,10A2,2 0 0,0 10.5,8M15.5,12A2.5,2.5 0 0,1 18,14.5V16H14.5A2.5,2.5 0 0,1 12,13.5A2.5,2.5 0 0,1 14.5,11A2.5,2.5 0 0,1 15.5,12Z"/></svg>`,
      color: "text-emerald-500",
      size: 30
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M16.59,7.58L10,14.17L7.41,11.59L6,13L10,17L18,9L16.59,7.58Z"/></svg>`,
      color: "text-orange-500",
      size: 28
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"/></svg>`,
      color: "text-pink-500",
      size: 34
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/></svg>`,
      color: "text-cyan-500",
      size: 28
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z"/></svg>`,
      color: "text-indigo-500",
      size: 40
    },
    {
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"/></svg>`,
      color: "text-rose-500",
      size: 32
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-purple-500/5 to-background/20" />
      
      {techElements.map((element, index) => (
        <TechElement 
          key={index} 
          svg={element.svg}
          color={element.color}
          size={element.size} 
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/80" />
    </div>
  );
};

export default HeroBackground;
