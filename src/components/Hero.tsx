
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
      // Animated specialty text with better mobile support
      const specialties = ["Neurosurgeon", "Spine Surgeon", "Brain Tumor Expert", "NIMHANS Alumni"];
      let currentIndex = 0;

      const animateSpecialty = () => {
        if (animatedTextRef.current) {
          gsap.to(animatedTextRef.current, {
            opacity: 0,
            scale: 0.9,
            y: -15,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              currentIndex = (currentIndex + 1) % specialties.length;
              if (animatedTextRef.current) {
                animatedTextRef.current.textContent = specialties[currentIndex];
                gsap.fromTo(animatedTextRef.current,
                  { opacity: 0, scale: 0.9, y: 15 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
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
        y: -12,
        rotation: 8,
        duration: 3,
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

      // Enhanced floating animations for mobile visibility
      gsap.to('.floating-icon-1', {
        y: -18,
        x: 8,
        rotation: 15,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-icon-2', {
        y: -22,
        x: -10,
        rotation: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      gsap.to('.floating-icon-3', {
        y: -20,
        x: 12,
        rotation: 18,
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

      {/* Enhanced Floating Medical Icons - More visible on mobile */}
      <div className="absolute top-28 left-4 sm:top-32 sm:left-6 md:top-36 md:left-10 floating-icon-1 z-10">
        <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-gradient-to-br from-primary/25 to-primary/35 rounded-full flex items-center justify-center shadow-large backdrop-blur-sm border-2 border-primary/30">
          <Brain className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-36 right-4 sm:top-40 sm:right-6 md:top-44 md:right-20 floating-icon-2 z-10">
        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-accent/25 to-accent/35 rounded-full flex items-center justify-center shadow-large backdrop-blur-sm border-2 border-accent/30">
          <Heart className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-48 left-4 sm:bottom-52 sm:left-6 md:bottom-56 md:left-20 floating-icon-3 z-10">
        <div ref={doctorIconRef} className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-gradient-to-br from-primary/30 to-primary/40 rounded-full flex items-center justify-center shadow-large backdrop-blur-sm border-2 border-primary/40">
          <Stethoscope className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary drop-shadow-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Mobile Layout: Name first, then photo */}
        <div className="lg:hidden">
          {/* Mobile Content First */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-primary/15 to-accent/15 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
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

            {/* Enhanced Animated Specialty Text for Mobile */}
            <div className="mb-8 h-20 flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 rounded-2xl blur-lg animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-r from-white/90 to-white/95 backdrop-blur-lg rounded-2xl border-2 border-primary/30 shadow-large p-4">
                  <span 
                    ref={animatedTextRef}
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block text-center leading-tight"
                  >
                    Neurosurgeon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Photo - Smaller size as requested */}
          <div className="relative mb-8">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-large mx-auto border-4 border-white/20"
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
              <span className="bg-gradient-to-r from-primary/15 to-accent/15 text-primary px-4 py-2 rounded-full text-base font-medium border border-primary/20">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 className="text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Dr. Nisarg
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Enhanced Desktop Animated Specialty Text */}
            <div className="mb-8 h-24 flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 rounded-2xl blur-xl animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-r from-white/90 to-white/95 backdrop-blur-lg rounded-2xl border-2 border-primary/30 shadow-large px-8 py-5">
                  <span 
                    ref={animatedTextRef}
                    className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block leading-tight"
                  >
                    Neurosurgeon
                  </span>
                </div>
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

          {/* Desktop Hero Image - Medium size as requested */}
          <div className="relative">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-full h-[350px] xl:h-[420px] object-cover rounded-2xl shadow-large mx-auto border-4 border-white/20"
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
