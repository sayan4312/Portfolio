import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            }
          });
        }, 500);
      }
    });

    // Animate logo entrance
    tl.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    });

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${progress}%`;
        }
      }
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Background with floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Main logo/text */}
      <div ref={logoRef} className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
          Sayan Das
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mt-4 font-light">
          Web Developer
        </p>
      </div>

      {/* Progress bar container */}
      <div className="w-80 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">Loading Experience</span>
          <span ref={progressTextRef} className="text-sm font-mono text-primary-glow">0%</span>
        </div>
        
        <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-bar absolute top-0 left-0 h-full w-0 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;