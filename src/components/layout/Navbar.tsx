
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
          >
            Mahendran
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.path ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Toggle menu"
              className="hover:bg-secondary focus:bg-secondary ml-1"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with improved animation */}
      <motion.nav 
        className="md:hidden bg-background/95 backdrop-blur-lg border-t overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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
              animate={{ x: mobileMenuOpen ? 0 : -20, opacity: mobileMenuOpen ? 1 : 0 }}
              transition={{ delay: mobileMenuOpen ? 0.1 + index * 0.05 : 0 }}
            >
              <Link
                to={link.path}
                className={`block py-2.5 px-3 rounded-md transition-colors ${
                  pathname === link.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.nav>
    </header>
  );
}
