
import { motion } from "framer-motion";
import { Code, Bot, Laptop, Monitor, FileCode, Microchip, CircuitBoard } from "lucide-react";
import { useEffect, useState } from "react";

const TechElement = ({ icon: Icon, color, size = 24 }: { icon: any; color: string; size?: number }) => {
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
      <Icon 
        className={`${color} opacity-70 hover:opacity-100 transition-all duration-300 drop-shadow-lg`} 
        size={size}
      />
    </motion.div>
  );
};

const HeroBackground = () => {
  const techElements = [
    { icon: Bot, color: "text-blue-500", size: 32 },
    { icon: Bot, color: "text-green-500", size: 38 },
    { icon: Microchip, color: "text-purple-500", size: 34 },
    { icon: Laptop, color: "text-emerald-500", size: 30 },
    { icon: Monitor, color: "text-amber-500", size: 36 },
    { icon: CircuitBoard, color: "text-orange-500", size: 28 },
    { icon: FileCode, color: "text-pink-500", size: 34 },
    { icon: Code, color: "text-cyan-500", size: 28 },
    { icon: Bot, color: "text-indigo-500", size: 40 },
    { icon: Bot, color: "text-rose-500", size: 32 }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-purple-500/5 to-background/20" />
      
      {techElements.map((element, index) => (
        <TechElement 
          key={index} 
          icon={element.icon} 
          color={element.color}
          size={element.size} 
        />
      ))}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/80" />
    </div>
  );
};

export default HeroBackground;
