import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo('.mobile-menu-item', 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
      );
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-card backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-glow cursor-pointer" onClick={() => scrollToSection('hero')}>
              SD
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-foreground hover:text-primary-glow transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary-glow transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-foreground hover:text-primary-glow transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary-glow transition-colors"
              >
                Contact
              </button>
              <Button variant="default" size="sm">
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="mobile-menu-item text-2xl text-foreground hover:text-primary-glow transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="mobile-menu-item text-2xl text-foreground hover:text-primary-glow transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="mobile-menu-item text-2xl text-foreground hover:text-primary-glow transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="mobile-menu-item text-2xl text-foreground hover:text-primary-glow transition-colors"
              >
                Contact
              </button>
              <Button variant="glow" size="lg" className="mobile-menu-item">
                Hire Me
              </Button>
              
              {/* Social Links */}
              <div className="flex space-x-6 mobile-menu-item">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/sayan4312" target="_blank" rel="noopener noreferrer">
                    <Github size={24} />
                  </a>
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin size={24} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;