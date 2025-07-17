
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
        ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Made larger and more prominent */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">N</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Dr. Nisarg</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Neurosurgeon</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Emergency Contact - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+918160440014" className="text-foreground hover:text-primary transition-colors">
                +91 8160440014
              </a>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-primary hover:shadow-medium transition-all duration-300"
              asChild
            >
              <a href="tel:+918160440014">Emergency</a>
            </Button>
          </div>

          {/* Mobile Menu Button - Made more prominent */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced visibility */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border/50 shadow-large">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block py-3 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Emergency Contact */}
              <div className="mobile-menu-item border-t border-border/30 pt-4 mt-4">
                <div className="flex items-center space-x-3 mb-3">
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
                  className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-300"
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
