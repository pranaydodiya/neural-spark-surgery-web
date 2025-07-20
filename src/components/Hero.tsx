
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
  const mobileAnimatedTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const specialties = ["Neurosurgeon", "Spine Surgeon", "Brain Tumor Expert", "NIMHANS Alumni"];
      let currentIndex = 0;

      // Desktop specialty animation
      const animateDesktopSpecialty = () => {
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

      // Mobile specialty animation
      const animateMobileSpecialty = () => {
        if (mobileAnimatedTextRef.current) {
          gsap.to(mobileAnimatedTextRef.current, {
            opacity: 0,
            scale: 0.95,
            y: -10,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              currentIndex = (currentIndex + 1) % specialties.length;
              if (mobileAnimatedTextRef.current) {
                mobileAnimatedTextRef.current.textContent = specialties[currentIndex];
                gsap.fromTo(mobileAnimatedTextRef.current,
                  { opacity: 0, scale: 0.95, y: 10 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
                );
              }
            }
          });
        }
      };

      // Start both animation loops
      const desktopSpecialtyInterval = setInterval(animateDesktopSpecialty, 3000);
      const mobileSpecialtyInterval = setInterval(animateMobileSpecialty, 3000);

      // Positioned floating animations - away from text areas
      gsap.to('.floating-icon-1', {
        y: -8,
        x: 3,
        rotation: 5,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-icon-2', {
        y: -10,
        x: -3,
        rotation: -5,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      gsap.to('.floating-icon-3', {
        y: -6,
        x: 4,
        rotation: 6,
        duration: 2.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });

      // Hero image float
      gsap.to('.hero-image', {
        y: -8,
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

      return () => {
        clearInterval(desktopSpecialtyInterval);
        clearInterval(mobileSpecialtyInterval);
      };

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScheduleConsultation = () => {
    const appointmentsSection = document.querySelector('#appointments');
    if (appointmentsSection) {
      appointmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewSpecialties = () => {
    const specialtiesSection = document.querySelector('#specialties');
    if (specialtiesSection) {
      specialtiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Award, label: '10+ Years', description: 'NIMHANS Alumni' },
    { icon: Users, label: '3000+', description: 'Patients Treated' },
    { icon: Clock, label: '24/7', description: 'Emergency Care' }
  ];

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-background via-primary-light/5 to-accent-light/10 pt-16 lg:pt-20">
      {/* Floating icons - positioned to avoid text overlap */}
      <div className="absolute top-20 left-1 sm:left-2 md:left-8 floating-icon-1 z-10">
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center shadow-lg">
          <Brain className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7 text-primary" />
        </div>
      </div>
      <div className="absolute top-24 sm:top-28 right-1 sm:right-2 md:right-8 floating-icon-2 z-10">
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-12 md:h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-6 md:h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-20 sm:bottom-24 left-1 sm:left-2 md:left-12 floating-icon-3 z-10">
        <div ref={doctorIconRef} className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 bg-gradient-to-br from-primary/25 to-primary/35 rounded-full flex items-center justify-center shadow-lg">
          <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-12 w-full max-w-7xl">
        {/* Mobile Layout - Optimized for all screen sizes */}
        <div className="lg:hidden w-full">
          {/* Mobile Photo - Perfectly sized */}
          <div className="relative mb-4 sm:mb-6 flex justify-center">
            <div className="hero-image relative">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-xl border-2 border-white/30"
              />
            </div>
          </div>

          {/* Doctor's Name Below Photo */}
          <div className="text-center mb-4 sm:mb-6 px-2">
            <div className="mb-3">
              <span className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-primary/20">
                NIMHANS Alumni • Neuro & Spine Surgeon
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3 sm:mb-4"
            >
              Dr. Nisarg
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Parmar
              </span>
            </h1>

            {/* Mobile Animated Specialty Text */}
            <div className="mb-4 sm:mb-6 h-10 sm:h-12 flex items-center justify-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm rounded-xl border border-primary/25 shadow-lg px-3 sm:px-4 py-2">
                  <span 
                    ref={mobileAnimatedTextRef}
                    className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block text-center"
                  >
                    Neurosurgeon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Care Section Below Name - Point-wise format */}
          <div className="mb-4 sm:mb-6 text-center px-2">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-3 sm:p-4 border border-primary/20 shadow-lg backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Expert Care</h3>
              <div className="space-y-2.5 sm:space-y-3 text-left max-w-xs sm:max-w-sm mx-auto">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">15+ Years of Medical Experience</p>
                </div>
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">500+ Successful Surgeries</p>
                </div>
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">NIMHANS Certified Specialist</p>
                </div>
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Trusted by 3000+ Patients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Description and Buttons */}
          <div className="text-center px-2">
            <p 
              ref={subtitleRef}
              className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed max-w-md mx-auto"
            >
              Leading expert in neurosurgery and spine surgery with prestigious NIMHANS training. Specializing in complex brain and spine procedures.
            </p>

            <div className="flex flex-col gap-3 mb-4 sm:mb-6 max-w-xs sm:max-w-sm mx-auto">
              <Button 
                size="lg" 
                className="hero-button bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 w-full"
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 w-full"
                onClick={handleViewSpecialties}
              >
                View Specialties
              </Button>
            </div>

            {/* Mobile Stats - Optimized spacing */}
            <div ref={statsRef} className="grid grid-cols-3 gap-1.5 sm:gap-2 px-1 max-w-md mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center p-1.5 sm:p-2">
                  <div className="flex items-center justify-center mb-1.5 sm:mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12 items-start max-w-7xl mx-auto">
          <div className="text-left flex flex-col justify-center h-full">
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
                <div className="bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm rounded-2xl border border-primary/25 shadow-lg px-8 py-4">
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
              Leading expert in neurosurgery and spine surgery with prestigious NIMHANS training. Specializing in complex brain and spine procedures with cutting-edge techniques.
            </p>

            <div className="flex gap-4 justify-start mb-12">
              <Button 
                size="lg" 
                className="hero-button bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 text-lg px-8 py-6"
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hero-button border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6"
                onClick={handleViewSpecialties}
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

          {/* Desktop Hero Image with Professional Layout */}
          <div className="relative flex flex-col items-center justify-start pt-8">
            {/* Dr. Nisarg's Photo - Positioned Above Expert Care */}
            <div className="hero-image relative mb-8">
              <img 
                src="/lovable-uploads/4cbfc350-3eac-4f2d-9890-a297c5dcae4c.png" 
                alt="Dr. Nisarg Parmar - Neurosurgeon" 
                className="w-72 h-72 lg:w-80 lg:h-80 xl:w-88 xl:h-88 object-cover object-center rounded-2xl shadow-xl border-3 border-white/40"
              />
            </div>

            {/* Expert Care Section Below Photo - Clean Separation */}
            <div className="w-full text-center mb-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 shadow-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-foreground mb-3">Expert Care</h3>
                <p className="text-lg text-muted-foreground mb-5">Trusted by thousands of patients across India</p>
                
                {/* Experience Stats in Clean Layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/15">
                    <div className="text-3xl font-bold text-primary mb-1">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/15">
                    <div className="text-3xl font-bold text-accent mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Surgeries</div>
                  </div>
                </div>

                {/* Key Expertise Points */}
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">NIMHANS Certified Specialist</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">Complex Brain & Spine Surgery Expert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Credentials at Bottom */}
            <div className="w-full text-center">
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4 border border-accent/20">
                <div className="flex justify-center items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">NIMHANS Certified</span>
                </div>
                <p className="text-sm text-muted-foreground">National Institute of Mental Health & Neurosciences</p>
              </div>
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
