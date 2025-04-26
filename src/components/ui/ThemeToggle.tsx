
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Stars for dark mode
  const stars = Array.from({ length: 8 }).map((_, i) => ({
    size: Math.random() * 2 + 1,
    x: (Math.random() * 20) - 10,
    y: (Math.random() * 20) - 10,
    delay: Math.random() * 0.5
  }));

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 bg-secondary/50 backdrop-blur-sm relative overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Background circles */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: theme === "light" 
            ? "rgba(252, 211, 77, 0.15)" 
            : "rgba(30, 41, 59, 0.4)"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Sun/Moon Icon */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
              
              {/* Sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.div 
                  key={angle}
                  className="absolute w-[1px] h-[3px] bg-amber-500/70"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 3 }}
                  style={{
                    transformOrigin: "center 14px",
                    transform: `rotate(${angle}deg) translateY(-14px)`
                  }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-[1.2rem] w-[1.2rem] text-slate-200" />
              
              {/* Stars */}
              <AnimatePresence>
                {stars.map((star, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1, 0.5],
                      transition: { 
                        repeat: Infinity, 
                        repeatType: "loop",
                        duration: 2 + Math.random() * 2,
                        delay: star.delay,
                        repeatDelay: Math.random()
                      }
                    }}
                    className="absolute bg-white rounded-full"
                    style={{ 
                      width: star.size, 
                      height: star.size,
                      left: `calc(50% + ${star.x}px)`,
                      top: `calc(50% + ${star.y}px)`
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
