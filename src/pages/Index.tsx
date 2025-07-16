
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Specialties from '@/components/Specialties';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Appointments from '@/components/Appointments';
import Contact from '@/components/Contact';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Set initial page load animations
    gsap.set('body', { opacity: 0 });
    gsap.to('body', { opacity: 1, duration: 0.3 });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href') as string);
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power2.inOut"
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Specialties />
      <About />
      <Testimonials />
      <Appointments />
      <Contact />
    </div>
  );
};

export default Index;
