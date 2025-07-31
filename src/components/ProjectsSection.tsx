import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Cards animation
    gsap.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: 'Bridge Between Investor & Business People',
      description: 'A sophisticated platform connecting investors with promising startups, featuring real-time chat, proposal notifications, and AI-powered matching algorithms.',
      image: '/images/projects/investor-bridge-platform.png',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT Auth'],
      githubUrl: 'https://github.com/sayan4312/Bridge',
      featured: true
    },
    {
      title: 'Placement Cell Management System',
      description: 'Comprehensive management system for educational institutions with role-based authentication, eligibility filtering, and resume upload capabilities.',
      image: '/images/projects/placement-management-system.png',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Tokens', 'REST API'],
      githubUrl: 'https://github.com/sayan4312/PlacementCell',
      featured: false
    },
    {
      title: 'Finance Tracker with Budget Goals',
      description: 'Personal finance management app with expense tracking, budget analysis, goal setting, and interactive data visualization charts.',
      image: '/images/projects/finance-tracker-app.png',
      tech: ['React.js', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
      githubUrl: 'https://github.com/sayan4312/ExpenseHive',
      featured: false
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions 
            that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Image */}
                            
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-primary-glow transition-colors mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="bg-muted/50 text-foreground px-2 py-1 rounded-md text-xs border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-muted-foreground text-xs px-2 py-1">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="w-full text-xs" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={14} className="mr-1" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Button variant="glass" size="lg" asChild>
            <a href="https://github.com/sayan4312" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Github size={18} className="mr-2" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;