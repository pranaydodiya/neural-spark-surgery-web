
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

      // Doctor icon animation (floating stethoscope)
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

      // Medical icons floating animation - separated for mobile
      gsap.to('.floating-icon-1', {
        y: -15,
        x: 5,
        rotation: 10,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-icon-2', {
        y: -20,
        x: -8,
        rotation: -12,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      gsap.to('.floating-icon-3', {
        y: -18,
        x: 10,
        rotation: 15,
        duration: 3.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
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
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-light/10 to-accent-light/20 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 transform rotate-12 scale-150"></div>
      </div>

      {/* Floating Medical Icons - Properly positioned for mobile */}
      <div className="absolute top-24 left-4 sm:top-28 sm:left-6 md:top-32 md:left-10 floating-icon-1 z-10">
        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary/15 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-primary/20">
          <Brain className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-4 sm:top-36 sm:right-6 md:top-40 md:right-20 floating-icon-2 z-10">
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-accent/15 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-accent/20">
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-4 sm:bottom-44 sm:left-6 md:bottom-48 md:left-20 floating-icon-3 z-10">
        <div ref={doctorIconRef} className="w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-primary/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-primary/30">
          <Stethoscope className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Mobile Layout: Name first, then photo */}
        <div className="lg:hidden">
          {/* Mobile Content First */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-medium">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6"
            >
              Dr. Nisarg
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Animated Specialty Text - Enhanced for mobile */}
            <div className="mb-8 h-16 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl blur-md"></div>
                <span 
                  ref={animatedTextRef}
                  className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent inline-block px-6 py-3 rounded-xl border-2 border-primary/30 backdrop-blur-sm bg-white/20 shadow-large"
                >
                  Neurosurgeon
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Photo - Smaller size */}
          <div className="relative mb-8">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-large mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Mobile Description and Buttons */}
          <div className="text-center">
            <p 
              ref={subtitleRef}
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution. 
              Welcome to the forefront of neurological care excellence.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <Button 
                size="lg" 
                className="hero-button pulse-button bg-gradient-primary hover:shadow-large transition-all duration-300 text-lg px-8 py-6"
                asChild
              >
                <a href="tel:+918160440014">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Mobile Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-foreground">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout: Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Desktop Content */}
          <div className="text-left">
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 className="text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Dr. Nisarg
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Desktop Animated Specialty Text */}
            <div className="mb-8 h-20 flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl blur-lg"></div>
                <span 
                  ref={animatedTextRef}
                  className="relative text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent inline-block px-8 py-4 rounded-xl border-2 border-primary/30 backdrop-blur-sm bg-white/20 shadow-large"
                >
                  Neurosurgeon
                </span>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution. 
              Welcome to the forefront of neurological care excellence.
            </p>

            <div className="flex gap-4 justify-start mb-12">
              <Button 
                size="lg" 
                className="hero-button pulse-button bg-gradient-primary hover:shadow-large transition-all duration-300 text-lg px-8 py-6"
                asChild
              >
                <a href="tel:+918160440014">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Desktop Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-left">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.label}</div>
                  <div className="text-base text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Hero Image - Medium size */}
          <div className="relative">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-full h-[400px] xl:h-[500px] object-cover rounded-2xl shadow-large mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
