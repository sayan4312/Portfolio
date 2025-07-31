import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Zap, 
  Layers,
  Cpu,
  Globe
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Image animation
    gsap.fromTo(imageRef.current,
      { opacity: 0, x: -100, rotation: -5 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skills animation
    gsap.fromTo(skillsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { icon: Code, name: 'Frontend', description: 'React.js, Tailwind CSS, JavaScript (ES6+), Responsive Design' },
    { icon: Cpu, name: 'Backend', description: 'Node.js, Express.js, MongoDB, REST APIs' },
    { icon: Zap, name: 'Animation', description: 'GSAP, Locomotive Scroll, Framer Motion' },
    { icon: Globe, name: 'Real-Time Features', description: 'Socket.IO (real-time chat, notifications)' },
    { icon: Layers, name: '3D & Graphics', description: 'Spline, Basic Three.js Integration' },
    { icon: Palette, name: 'Performance', description: 'Code Optimization, Core Web Vitals, SEO-friendly apps' },
    { icon: Code, name: 'Web Tech', description: 'JWT Authentication, Role-Based Access, CRUD Operations' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-50"></div>
              <div className="absolute inset-2 glass-card rounded-full overflow-hidden">
                <img 
                  src="/images/profile/profile-photo.png"
                  alt="Sayan Das - Web Developer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About{' '}
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate Full Stack Web Developer who thrives on creating scalable, responsive, 
                and immersive digital experiences. With expertise in modern web technologies and 
                animation-driven design, I transform ideas into high-performing, visually engaging solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in writing clean, optimized, and performance-driven code to solve real-world 
                challenges. My approach is focused on pushing boundaries, ensuring every product is not 
                just efficient but also interactive, intuitive, and future-ready.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass-card p-4 rounded-lg group hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2"
                >
                  <skill.icon className="text-primary-glow mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;