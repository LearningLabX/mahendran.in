
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <motion.div
        initial={false}
        animate={{ rotate: theme === "light" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className={`h-[1.2rem] w-[1.2rem] absolute ${theme === "light" ? "opacity-100" : "opacity-0"} transition-opacity`} />
        <Moon className={`h-[1.2rem] w-[1.2rem] absolute ${theme === "light" ? "opacity-0" : "opacity-100"} transition-opacity`} />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
