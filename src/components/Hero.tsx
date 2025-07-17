
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Stethoscope, Brain, Heart } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const doctorIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for coordinated animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Doctor icon animation (floating stethoscope) - positioned closer to name
      gsap.to(doctorIconRef.current, {
        y: -8,
        rotation: 3,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Hero content animations
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo('.hero-button',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo('.stat-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

      // Floating animation for hero image
      gsap.to('.hero-image', {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Pulse animation for CTA button
      gsap.to('.pulse-button', {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Medical icons floating animation - better positioning
      gsap.to('.floating-icon', {
        y: -12,
        x: 3,
        rotation: 8,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, label: '10+ Years', description: 'NIMHANS Alumni' },
    { icon: Users, label: '3000+', description: 'Patients Treated' },
    { icon: Clock, label: '24/7', description: 'Emergency Care' }
  ];

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-light/10 to-accent-light/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 transform rotate-12 scale-150"></div>
      </div>

      {/* Floating Medical Icons - Better positioning for mobile */}
      <div className="absolute top-16 left-4 md:top-20 md:left-10 floating-icon">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Brain className="w-4 h-4 md:w-6 md:h-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-4 md:top-40 md:right-20 floating-icon">
        <div className="w-6 h-6 md:w-10 md:h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <Heart className="w-3 h-3 md:w-5 md:h-5 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-32 left-4 md:bottom-40 md:left-20 floating-icon">
        <div ref={doctorIconRef} className="w-10 h-10 md:w-14 md:h-14 bg-primary/15 rounded-full flex items-center justify-center">
          <Stethoscope className="w-5 h-5 md:w-7 md:h-7 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-4 md:mb-6"
            >
              Dr. Nisarg
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl"
            >
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution. 
              Welcome to the forefront of neurological care excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
              <Button 
                size="lg" 
                className="hero-button pulse-button bg-gradient-primary hover:shadow-large transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-2 md:mr-3">
                      <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">{stat.label}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-primary rounded-full mt-1 md:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
