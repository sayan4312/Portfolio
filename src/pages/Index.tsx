import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add smooth reveal animation for main content
    document.body.style.overflow = 'visible';
  };

  useEffect(() => {
    // Hide overflow during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
