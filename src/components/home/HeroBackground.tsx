
import { motion } from "framer-motion";
import { Code, Smartphone, AppWindow } from "lucide-react";
import { useEffect, useState } from "react";

const TechElement = ({ icon: Icon, color }: { icon: any; color: string }) => {
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight - 100,
  });

  const [position, setPosition] = useState(randomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(randomPosition());
    }, Math.random() * 5000 + 3000); // Random interval between 3-8s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute"
      initial={randomPosition()}
      animate={{
        x: position.x,
        y: position.y,
        rotate: [0, 360],
      }}
      transition={{
        duration: 3,
        ease: "linear",
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <Icon className={`w-8 h-8 ${color} opacity-20`} />
    </motion.div>
  );
};

const HeroBackground = () => {
  const techElements = [
    { icon: Code, color: "text-blue-500" },
    { icon: Smartphone, color: "text-green-500" },
    { icon: AppWindow, color: "text-purple-500" },
    { icon: AppWindow, color: "text-orange-500" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {techElements.map((element, index) => (
        <TechElement key={index} icon={element.icon} color={element.color} />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    </div>
  );
};

export default HeroBackground;
