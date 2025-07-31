import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer slide up animation
    gsap.fromTo(footer,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Fallback: Ensure footer is visible if ScrollTrigger doesn't fire
    setTimeout(() => {
      if (footer) {
        gsap.set(footer, { opacity: 1, y: 0, filter: 'blur(0px)' });
      }
    }, 500);

    // Simplified floating particles animation
    if (particlesRef.current) {
      gsap.to(particlesRef.current.children, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.8
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 overflow-hidden border-t border-border/30">
      {/* Background particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-primary/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-secondary/30 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-accent/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/6 w-3 h-3 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-secondary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-glow mb-4">Sayan Das</h3>
            <p className="text-muted-foreground max-w-xs">
              Crafting the future of web experiences, one pixel at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <nav className="flex flex-wrap justify-center gap-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary-glow transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Back to Top */}
          <div className="flex justify-center md:justify-end">
            <Button
              variant="glass"
              size="icon"
              onClick={scrollToTop}
              className="group"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Sayan Das. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;