import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  // { name: 'Resume', path: '/resume' },
  { name: 'My Blogs', path: '/blog' },
  // { name: 'Games', path: '/games' },
  { name: 'Tools', path: '/tools' },
  // { name: 'Templates', path: '/templates' },
  { name: 'Contact', path: '/contact' },
];

const words = ['Dream.', 'Develop.', 'Deploy.'];

function CycleWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-6 overflow-hidden text-xs sm:text-sm text-muted-foreground">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isSideNavPage = pathname.includes('/tools');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSideNavPage
          ? 'bg-transparent'
          : isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side with Logo + CycleWords */}
          <div className="flex flex-col leading-tight">
            <Link
              to="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 hover:from-purple-400 hover:to-primary transition-all duration-300"
            >
              Mahendran G
            </Link>
            {/* CycleWords Animated Text */}
            <CycleWords />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary hover:translate-y-[-1px] ${
                    pathname === link.path ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden bg-background/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 overflow-hidden"
        initial={{ height: 0 }}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          borderRadius: mobileMenuOpen ? '0' : '0 0 12px 12px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div
          className="container mx-auto px-4 py-3 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2, delay: mobileMenuOpen ? 0.1 : 0 }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: mobileMenuOpen ? 0 : -20,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ delay: mobileMenuOpen ? 0.1 + index * 0.05 : 0 }}
            >
              <Link
                to={link.path}
                className={`block py-2.5 px-3 rounded-md transition-all duration-300 ease-in-out ${
                  pathname === link.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-secondary hover:translate-y-[-1px]'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <ThemeToggle />
        </motion.div>
      </motion.nav>
    </header>
  );
}
