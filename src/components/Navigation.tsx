
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
    // Futuristic navbar animations on load
    gsap.fromTo('.nav-logo', 
      { opacity: 0, scale: 0.5, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo('.nav-emergency', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.8 }
    );
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
        : 'bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Enhanced with futuristic styling */}
          <div className="nav-logo flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-sm opacity-75 animate-pulse-glow"></div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-large border border-primary-light/30">
                <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">N</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dr. Nisarg</h2>
              <p className="text-sm sm:text-base md:text-lg text-primary-light font-medium">Neurosurgeon</p>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced with hover effects */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item relative text-white hover:text-accent transition-all duration-300 font-medium text-lg group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Emergency Contact - Enhanced styling */}
          <div className="nav-emergency hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <Phone className="w-4 h-4 text-accent animate-pulse" />
              <a href="tel:+918160440014" className="text-white hover:text-accent transition-colors font-medium">
                +91 8160440014
              </a>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent hover:shadow-glow transition-all duration-300 border border-accent/30 text-white font-semibold px-6 py-3"
              asChild
            >
              <a href="tel:+918160440014">Emergency</a>
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced with glow effect */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-20 blur-sm"></div>
            {isOpen ? (
              <X className="relative w-6 h-6 sm:w-7 sm:h-7 text-white" />
            ) : (
              <Menu className="relative w-6 h-6 sm:w-7 sm:h-7 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced with futuristic styling */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-primary/95 via-accent/90 to-primary/95 backdrop-blur-xl border-b border-primary/30 shadow-glow">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block py-4 px-6 text-lg font-medium text-white hover:text-accent hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-accent/30 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Emergency Contact - Enhanced styling */}
              <div className="mobile-menu-item border-t border-white/20 pt-6 mt-6">
                <div className="flex items-center space-x-3 mb-4 bg-white/10 rounded-lg p-4 border border-white/20">
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
