
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-12 mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <Link to="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              DevPortfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Building exceptional mobile experiences</p>
          </div>
          
          <nav className="flex flex-wrap gap-8">
            <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
            <Link to="/resume" className="text-sm hover:text-primary transition-colors">Resume</Link>
            <Link to="/projects" className="text-sm hover:text-primary transition-colors">Projects</Link>
            <Link to="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex space-x-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary hover-lift">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary hover-lift">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary hover-lift">
              <Twitter size={20} />
            </a>
            <a href="mailto:hello@example.com" aria-label="Email" className="hover:text-primary hover-lift">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-8 text-center md:text-start text-sm text-muted-foreground">
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
