import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Briefcase, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo('.about-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate credentials
      gsap.fromTo('.credential-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.credentials-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate achievements
      gsap.fromTo('.achievement-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    {
      icon: GraduationCap,
      title: 'Medical Education',
      items: [
        'MD, Harvard Medical School',
        'Neurosurgery Residency, Johns Hopkins',
        'Fellowship in Pediatric Neurosurgery, Boston Children\'s Hospital'
      ]
    },
    {
      icon: Award,
      title: 'Board Certifications',
      items: [
        'American Board of Neurological Surgery',
        'American Board of Pediatric Neurological Surgery',
        'International Association of Pediatric Neurosurgery'
      ]
    },
    {
      icon: Briefcase,
      title: 'Professional Experience',
      items: [
        'Chief of Neurosurgery - Metropolitan Medical Center',
        'Professor of Neurosurgery - State University',
        'Director of Pediatric Neurosurgery Program'
      ]
    }
  ];

  const achievements = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '5000+', label: 'Successful Surgeries', icon: Users },
    { number: '50+', label: 'Research Publications', icon: GraduationCap },
    { number: '24/7', label: 'Emergency Availability', icon: Briefcase }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="about-title text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Your <span className="bg-gradient-primary bg-clip-text text-transparent">Neurosurgeon</span>
          </h2>
          <p className="about-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Dr. Sarah Mitchell brings over 15 years of specialized experience in neurosurgery, 
            combining advanced medical expertise with compassionate patient care.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="about-content">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-medium">
              <h3 className="text-2xl font-bold text-foreground mb-6">Professional Background</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dr. Mitchell is a board-certified neurosurgeon specializing in complex brain and spinal procedures. 
                  She has dedicated her career to advancing neurosurgical techniques and improving patient outcomes 
                  through innovative approaches and cutting-edge technology.
                </p>
                <p>
                  With extensive training from top medical institutions and years of hands-on experience, 
                  Dr. Mitchell has successfully treated thousands of patients with various neurological conditions, 
                  earning recognition as a leader in her field.
                </p>
                <p>
                  Her commitment to excellence extends beyond the operating room through active participation in 
                  medical research, education, and community outreach programs focused on neurological health awareness.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary" className="bg-primary-light text-primary-dark">Brain Surgery</Badge>
                <Badge variant="secondary" className="bg-primary-light text-primary-dark">Spinal Surgery</Badge>
                <Badge variant="secondary" className="bg-primary-light text-primary-dark">Pediatric Care</Badge>
                <Badge variant="secondary" className="bg-primary-light text-primary-dark">Minimally Invasive</Badge>
                <Badge variant="secondary" className="bg-primary-light text-primary-dark">Research</Badge>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="achievement-card group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{achievement.number}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Credentials Section */}
        <div className="credentials-grid grid md:grid-cols-3 gap-8">
          {credentials.map((credential, index) => (
            <Card key={index} className="credential-item bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <credential.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{credential.title}</h3>
                </div>
                <ul className="space-y-2">
                  {credential.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;