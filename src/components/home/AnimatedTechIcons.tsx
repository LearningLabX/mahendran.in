import { motion } from 'framer-motion';
import { Apple, Rocket } from 'lucide-react';

const AnimatedTechIcons = () => {
  const iconVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    race: {
      x: [0, 20, 0],
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-30" />

      <div className="container mx-auto px-4">
        <motion.div
          className="flex justify-center items-center gap-20"
          initial="initial"
          animate="animate"
        >
          {/* Android Racer */}
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            animate="race"
            className="flex flex-col items-center gap-2 group"
          >
            <Rocket className="w-12 h-12 text-green-500 transform rotate-12" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Android
            </span>
          </motion.div>

          {/* VS Indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-primary/50"
          >
            VS
          </motion.div>

          {/* iOS Racer */}
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            animate="race"
            className="flex flex-col items-center gap-2 group"
          >
            <Apple className="w-12 h-12 text-gray-700 dark:text-gray-300 transform -rotate-12" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              iOS
            </span>
          </motion.div>
        </motion.div>

        {/* Track Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-8 max-w-2xl mx-auto"
        />
      </div>
    </div>
  );
};

export default AnimatedTechIcons;
