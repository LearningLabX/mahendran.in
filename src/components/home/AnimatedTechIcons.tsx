
import { motion } from "framer-motion";
import { Smartphone, Apple, Github, Code, Rocket } from "lucide-react";

const AnimatedTechIcons = () => {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    hover: { scale: 1.2, rotate: 5 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const icons = [
    { Icon: Smartphone, color: "text-green-500" },
    { Icon: Apple, color: "text-gray-700 dark:text-gray-300" },
    { Icon: Github, color: "text-purple-500" },
    { Icon: Code, color: "text-blue-500" },
    { Icon: Rocket, color: "text-red-500" }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex justify-center gap-8 mt-8 mb-12"
    >
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          variants={iconVariants}
          whileHover="hover"
          className={`${color} cursor-pointer`}
        >
          <Icon size={32} className="transition-colors" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedTechIcons;
