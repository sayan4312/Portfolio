import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate headline
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    );

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Animate CTA
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    // Animate Spline container
    tl.fromTo(splineRef.current,
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background - Full Page */}
      <div ref={splineRef} className="absolute inset-0 z-0 overflow-hidden">
        <iframe 
          src='https://my.spline.design/holoblobs-EZk14rZDL8oVmLUNECA8VfDt/' 
          frameBorder='0' 
          width='120%' 
          height='120%'
          className="absolute object-cover"
          style={{
            top: '-10%',
            left: '-10%',
            transform: 'scale(1.1)',
            pointerEvents: 'none'
          }}
          loading="lazy"
          title="3D Background Animation"
          onError={() => console.log('Spline iframe failed to load')}
        />
        
        {/* Fallback background in case Spline fails */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 -z-10"></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-[1]">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:100px_100px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Sayan Das
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-light">
              Web Developer
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Crafting immersive digital experiences that push the boundaries of web technology. 
            Specializing in modern React, animations, and cutting-edge 3D integration.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="hero" 
              className="group"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Hire Me
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={20} />
            </Button>
            <Button 
              variant="glass" 
              size="hero"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToNext}>
          <ArrowDown size={24} />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;