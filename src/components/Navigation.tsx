
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
    );
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'About', href: '#about' },
    { name: 'Appointments', href: '#appointments' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-card/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="nav-item flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm md:text-lg">NS</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground hidden sm:block">NeuroSurgery</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="nav-item flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <a href="tel:+918160440014" className="text-sm hover:text-primary transition-colors">
                +91 8160440014
              </a>
            </div>
            <Button variant="default" className="nav-item bg-gradient-primary hover:shadow-medium transition-all duration-300 text-sm px-4 py-2">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden nav-item p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-2 text-muted-foreground pt-4">
                <Phone className="w-4 h-4" />
                <a href="tel:+918160440014" className="text-sm hover:text-primary transition-colors">
                  +91 8160440014
                </a>
              </div>
              <Button variant="default" className="bg-gradient-primary w-full text-base py-3">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
