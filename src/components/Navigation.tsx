
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu-item', 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    // Enhanced navbar animations
    gsap.fromTo('.nav-logo', 
      { opacity: 0, scale: 0.5, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.4 }
    );

    gsap.fromTo('.nav-emergency', 
      { opacity: 0, scale: 0.8, x: 30 },
      { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.9 }
    );

    // Continuous logo animation
    gsap.to('.logo-icon', {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Appointments', href: '#appointments' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-primary/95 via-accent/90 to-primary/95 backdrop-blur-xl shadow-glow border-b border-primary/30' 
        : 'bg-gradient-to-r from-primary/80 via-accent/70 to-primary/80 backdrop-blur-lg'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Enhanced Logo with proper alignment */}
          <div className="nav-logo flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-sm opacity-75 animate-pulse-glow"></div>
              <div className="logo-icon relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-large border border-primary-light/30">
                <span className="text-white font-bold text-base sm:text-lg">NN</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">Dr. Nisarg</h2>
              <p className="text-xs sm:text-sm text-primary-light font-medium leading-tight">Neurosurgeon</p>
            </div>
          </div>

          {/* Desktop Navigation - Fixed alignment and visibility */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item relative text-white hover:text-accent transition-all duration-300 font-medium text-base xl:text-lg group py-2 px-3"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Desktop Emergency Contact - Improved layout */}
          <div className="nav-emergency hidden lg:flex items-center space-x-3 xl:space-x-4">
            <div className="flex items-center space-x-2 text-sm bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/25">
              <Phone className="w-4 h-4 text-accent animate-pulse" />
              <a href="tel:+918160440014" className="text-white hover:text-accent transition-colors font-medium text-sm">
                +91 8160440014
              </a>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent hover:shadow-glow transition-all duration-300 border border-accent/30 text-white font-semibold px-4 py-2 text-sm"
              asChild
            >
              <a href="tel:+918160440014">Emergency</a>
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-3 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 border border-white/25"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-30 blur-sm"></div>
            {isOpen ? (
              <X className="relative w-6 h-6 text-white" />
            ) : (
              <Menu className="relative w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Navigation - Full visibility */}
        {isOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-primary/98 via-accent/95 to-primary/98 backdrop-blur-xl border-b border-primary/30 shadow-glow z-50">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block py-4 px-6 text-lg font-medium text-white hover:text-accent hover:bg-white/15 rounded-xl transition-all duration-300 border border-transparent hover:border-accent/30 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Emergency Contact */}
              <div className="mobile-menu-item border-t border-white/20 pt-6 mt-6">
                <div className="flex items-center space-x-3 mb-4 bg-white/15 rounded-lg p-4 border border-white/25">
                  <Phone className="w-5 h-5 text-accent animate-pulse" />
                  <a 
                    href="tel:+918160440014" 
                    className="text-lg font-medium text-white hover:text-accent transition-colors"
                  >
                    +91 8160440014
                  </a>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent hover:shadow-glow transition-all duration-300 border border-accent/30 text-white font-semibold py-4"
                  asChild
                >
                  <a href="tel:+918160440014">Emergency Call</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
