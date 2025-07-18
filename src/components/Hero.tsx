
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
      // Working specialty animation for both mobile and desktop
      const specialties = ["Neurosurgeon", "Spine Surgeon", "Brain Tumor Expert", "NIMHANS Alumni"];
      let currentIndex = 0;

      const animateSpecialty = () => {
        if (animatedTextRef.current) {
          gsap.to(animatedTextRef.current, {
            opacity: 0,
            scale: 0.95,
            y: -10,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              currentIndex = (currentIndex + 1) % specialties.length;
              if (animatedTextRef.current) {
                animatedTextRef.current.textContent = specialties[currentIndex];
                gsap.fromTo(animatedTextRef.current,
                  { opacity: 0, scale: 0.95, y: 10 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
                );
              }
            }
          });
        }
      };

      // Start the specialty animation loop
      const specialtyInterval = setInterval(animateSpecialty, 3000);

      // Smaller, controlled floating animations - positioned away from text
      gsap.to('.floating-icon-1', {
        y: -10,
        x: 5,
        rotation: 10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-icon-2', {
        y: -12,
        x: -5,
        rotation: -10,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      gsap.to('.floating-icon-3', {
        y: -8,
        x: 8,
        rotation: 12,
        duration: 3.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });

      // Simple doctor icon animation
      gsap.to(doctorIconRef.current, {
        y: -8,
        rotation: 5,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Content animations
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo('.hero-button',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo('.stat-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );

      // Simple hero image float
      gsap.to('.hero-image', {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
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
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-light/5 to-accent-light/10 pt-20">
      {/* Smaller, positioned floating icons - away from main content */}
      <div className="absolute top-32 left-8 floating-icon-1 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center shadow-lg">
          <Brain className="w-7 h-7 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-8 floating-icon-2 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-12 floating-icon-3 z-10">
        <div ref={doctorIconRef} className="w-16 h-16 bg-gradient-to-br from-primary/25 to-primary/35 rounded-full flex items-center justify-center shadow-lg">
          <Stethoscope className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Mobile Layout: Name first, then photo */}
        <div className="lg:hidden">
          {/* Mobile Content First */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6"
            >
              Dr. Nisarg
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Fixed Mobile Animated Specialty Text */}
            <div className="mb-8 h-16 flex items-center justify-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg px-6 py-3">
                  <span 
                    ref={animatedTextRef}
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block text-center"
                  >
                    Neurosurgeon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Photo - Small size */}
          <div className="relative mb-8">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-lg mx-auto border-2 border-white/20"
              />
            </div>
          </div>

          {/* Mobile Description and Buttons */}
          <div className="text-center">
            <p 
              ref={subtitleRef}
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <Button 
                size="lg" 
                className="hero-button bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 text-lg px-8 py-6"
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
                className="hero-button border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Mobile Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-white" />
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
              <span className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full text-base font-medium border border-primary/20">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 className="text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
              Dr. Nisarg
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Desktop Animated Specialty Text */}
            <div className="mb-8 h-20 flex items-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg px-8 py-4">
                  <span 
                    ref={animatedTextRef}
                    className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block"
                  >
                    Neurosurgeon
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              A Neuro and Spine Surgeon with advanced training from NIMHANS, India's top neurosurgical institution.
            </p>

            <div className="flex gap-4 justify-start mb-12">
              <Button 
                size="lg" 
                className="hero-button bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 text-lg px-8 py-6"
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
                className="hero-button border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6"
              >
                View Specialties
              </Button>
            </div>

            {/* Desktop Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-left">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mr-3">
                      <stat.icon className="w-6 h-6 text-white" />
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
                className="w-full h-[380px] xl:h-[420px] object-cover rounded-2xl shadow-lg mx-auto border-2 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
