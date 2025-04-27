
import { motion } from "framer-motion";
import { Code, Smartphone, AppWindow, Tablet, Apple, Android, FileCode } from "lucide-react";
import { useEffect, useState } from "react";

const TechElement = ({ icon: Icon, color, size = 24 }: { icon: any; color: string; size?: number }) => {
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight - 100,
  });

  const [position, setPosition] = useState(randomPosition());
  const [isChasing, setIsChasing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(randomPosition());
      setIsChasing(Math.random() > 0.7); // 30% chance to start "chasing" animation
    }, Math.random() * 4000 + 2000); // Random interval between 2-6s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute"
      initial={randomPosition()}
      animate={{
        x: position.x,
        y: position.y,
        scale: isChasing ? [1, 1.2, 1] : 1,
        rotate: isChasing ? [0, 360] : [0, 360],
      }}
      transition={{
        duration: isChasing ? 2 : 3,
        ease: isChasing ? "easeInOut" : "linear",
        scale: {
          duration: 1,
          repeat: isChasing ? Infinity : 0,
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <Icon className={`${color} opacity-20 hover:opacity-40 transition-opacity`} size={size} />
    </motion.div>
  );
};

const HeroBackground = () => {
  const techElements = [
    { icon: Code, color: "text-blue-500", size: 28 },
    { icon: Smartphone, color: "text-green-500", size: 32 },
    { icon: AppWindow, color: "text-purple-500", size: 30 },
    { icon: Android, color: "text-emerald-500", size: 28 },
    { icon: Apple, color: "text-gray-500", size: 28 },
    { icon: FileCode, color: "text-orange-500", size: 26 },
    { icon: Tablet, color: "text-pink-500", size: 34 },
    { icon: Code, color: "text-cyan-500", size: 24 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {techElements.map((element, index) => (
        <TechElement 
          key={index} 
          icon={element.icon} 
          color={element.color}
          size={element.size} 
        />
      ))}
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    </div>
  );
};

export default HeroBackground;
