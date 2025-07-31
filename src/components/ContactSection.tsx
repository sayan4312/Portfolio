import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Form animation
    gsap.fromTo(formRef.current,
      { opacity: 0, x: -50, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
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

    // Social icons animation
    gsap.fromTo(socialsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: socialsRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Fallback: Ensure icons are visible if ScrollTrigger doesn't fire
    setTimeout(() => {
      if (socialsRef.current?.children) {
        gsap.set(socialsRef.current.children, { opacity: 1, y: 0, scale: 1 });
      }
    }, 1000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug logging
      console.log('EmailJS Config:', {
        serviceId: serviceId ? `${serviceId.substring(0, 8)}...` : 'MISSING',
        templateId: templateId ? `${templateId.substring(0, 8)}...` : 'MISSING',
        publicKey: publicKey ? `${publicKey.substring(0, 8)}...` : 'MISSING'
      });

      // Validate all required fields are present
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS configuration. Please check your environment variables.');
      }

      const templateParams = {
        name: formData.name,           
        email: formData.email,         
        message: formData.message,
        to_email: 'sayandas4312@gmail.com', 
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('EmailJS Success:', result);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });

      // Animate submit button
      gsap.to(e.target, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      console.error('Error Type:', typeof error);
      console.error('Error Message:', error?.message);
      console.error('Error Status:', error?.status);
      console.error('Error Text:', error?.text);
      
      toast({
        title: "Failed to Send Message",
        description: `Something went wrong: ${error?.message || error?.text || 'Unknown error'}. Please try again or contact me directly.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/sayan4312', 
      label: 'GitHub',
      hover: 'hover:shadow-glow-primary hover:text-primary-glow'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/sayan-das-292574246/', 
      label: 'LinkedIn',
      hover: 'hover:shadow-glow-secondary hover:text-secondary-glow'
    },
    { 
      icon: Mail, 
      href: 'mailto:sayandas4312@gmail.com', 
      label: 'Email',
      hover: 'hover:shadow-glow-accent hover:text-accent-glow'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something extraordinary together. 
            I'm always excited to work on innovative projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-8 rounded-2xl">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2 glass-card border-border/30 focus:border-primary focus:shadow-glow-primary transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 glass-card border-border/30 focus:border-primary focus:shadow-glow-primary transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-2 glass-card border-border/30 focus:border-primary focus:shadow-glow-primary transition-all resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="default" 
                  size="lg" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-glow">Let's Connect</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-glow mb-2">Email</h4>
                  <p className="text-muted-foreground">sayandas4312@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-glow mb-2">Location</h4>
                  <p className="text-muted-foreground">Available for remote work worldwide</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-glow mb-2">Response Time</h4>
                  <p className="text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-glow">Follow Me</h3>
              <div ref={socialsRef} className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 glass-card rounded-xl transition-all duration-300 hover:scale-110 ${social.hover}`}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;