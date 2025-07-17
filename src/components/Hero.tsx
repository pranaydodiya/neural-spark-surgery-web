
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
  const animatedTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated specialty text
      const specialties = ["Neurosurgeon", "Spine Surgeon", "Brain Tumor Expert", "NIMHANS Alumni"];
      let currentIndex = 0;

      const animateSpecialty = () => {
        if (animatedTextRef.current) {
          gsap.to(animatedTextRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              currentIndex = (currentIndex + 1) % specialties.length;
              if (animatedTextRef.current) {
                animatedTextRef.current.textContent = specialties[currentIndex];
                gsap.fromTo(animatedTextRef.current,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
              }
            }
          });
        }
      };

      // Start the specialty animation loop
      const specialtyInterval = setInterval(animateSpecialty, 3000);

      // Create timeline for coordinated animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Doctor icon animation (floating stethoscope) - more visible on mobile
      gsap.to(doctorIconRef.current, {
        y: -10,
        rotation: 5,
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

      // Medical icons floating animation - more prominent on mobile
      gsap.to('.floating-icon', {
        y: -15,
        x: 5,
        rotation: 10,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      return () => {
        clearInterval(specialtyInterval);
      };

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

      {/* Floating Medical Icons - More visible on mobile */}
      <div className="absolute top-12 left-2 sm:top-16 sm:left-4 md:top-20 md:left-10 floating-icon z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/15 rounded-full flex items-center justify-center shadow-lg">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
        </div>
      </div>
      <div className="absolute top-24 right-2 sm:top-32 sm:right-4 md:top-40 md:right-20 floating-icon z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent/15 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-24 left-2 sm:bottom-32 sm:left-4 md:bottom-40 md:left-20 floating-icon z-10">
        <div ref={doctorIconRef} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
          <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-3 sm:mb-4">
              <span className="bg-primary/10 text-primary px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-2 sm:mb-4 md:mb-6"
            >
              Dr. Nisarg
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Animated Specialty Text */}
            <div className="mb-3 sm:mb-4 md:mb-6 h-8 sm:h-10 md:h-12">
              <span 
                ref={animatedTextRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary inline-block"
              >
                Neurosurgeon
              </span>
            </div>
            
            <p 
              ref={subtitleRef}
              className="text-sm sm:text-base md:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl leading-relaxed"
            >
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution. 
              Welcome to the forefront of neurological care excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start mb-6 sm:mb-8 md:mb-12">
              <Button 
                size="lg" 
                className="hero-button pulse-button bg-gradient-primary hover:shadow-large transition-all duration-300 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6"
                asChild
              >
                <a href="tel:+918160440014">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-1 sm:mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-1 sm:mr-2 md:mr-3">
                      <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-base sm:text-lg md:text-2xl font-bold text-foreground">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.description}</div>
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
                className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover rounded-2xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-accent rounded-full opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-1 sm:h-2 md:h-3 bg-primary rounded-full mt-1 sm:mt-1 md:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
