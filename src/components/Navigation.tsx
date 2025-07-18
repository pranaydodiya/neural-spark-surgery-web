
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
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
    // Simple navbar animations
    gsap.fromTo('.nav-logo', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo('.nav-emergency', 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/10' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Fixed positioning */}
          <div className="nav-logo flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">DN</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold text-foreground">Dr. Nisarg</h2>
              <p className="text-sm text-muted-foreground font-medium">Neurosurgeon</p>
            </div>
            {/* Mobile: Show name next to logo */}
            <div className="sm:hidden">
              <h2 className="text-lg font-bold text-foreground">Dr. Nisarg</h2>
            </div>
          </div>

          {/* Desktop Navigation - Better spacing and visibility */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item relative text-foreground hover:text-primary transition-colors duration-300 font-medium text-base group"
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Desktop Emergency Contact - Better alignment */}
          <div className="nav-emergency hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm bg-primary/10 rounded-lg px-3 py-2">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+918160440014" className="text-foreground hover:text-primary transition-colors font-medium">
                +91 8160440014
              </a>
            </div>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2"
              asChild
            >
              <a href="tel:+918160440014">Emergency</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Full visibility and proper spacing */}
        {isOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-primary/20 shadow-xl z-50 max-h-screen overflow-y-auto">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block py-3 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Emergency Contact */}
              <div className="mobile-menu-item border-t border-primary/20 pt-4 mt-4">
                <div className="flex items-center space-x-3 mb-3 bg-primary/10 rounded-lg p-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a 
                    href="tel:+918160440014" 
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    +91 8160440014
                  </a>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
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
