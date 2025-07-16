import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Baby, Zap, Bone, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Specialties = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.section-title', 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.specialty-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specialties = [
    {
      icon: Brain,
      title: 'Neurotrauma',
      description: 'Emergency treatment for traumatic brain and spinal injuries with advanced surgical techniques.',
      features: ['24/7 Emergency Care', 'Minimally Invasive Surgery', 'Advanced Imaging'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Neuro-oncology',
      description: 'Comprehensive brain tumor treatment using cutting-edge surgical and non-surgical approaches.',
      features: ['Precision Surgery', 'Tumor Analysis', 'Post-op Care'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Baby,
      title: 'Pediatric Neurosurgery',
      description: 'Specialized care for children with congenital and acquired neurological conditions.',
      features: ['Child-Friendly Environment', 'Family Support', 'Developmental Care'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Vascular Neurosurgery',
      description: 'Treatment of cerebrovascular diseases including aneurysms and arteriovenous malformations.',
      features: ['Endovascular Procedures', 'Microsurgery', 'Stroke Prevention'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Bone,
      title: 'Spinal Surgery',
      description: 'Advanced spinal procedures for degenerative diseases, trauma, and complex deformities.',
      features: ['Minimally Invasive', 'Motion Preservation', 'Pain Management'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Eye,
      title: 'Neuro Endoscopy',
      description: 'Minimally invasive endoscopic procedures for various intracranial conditions.',
      features: ['Minimal Scarring', 'Faster Recovery', 'Precise Visualization'],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section id="specialties" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Specialties</span>
          </h2>
          <p className="section-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive neurosurgical expertise across multiple specializations, 
            delivering world-class care with the latest medical innovations.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <Card 
              key={index} 
              className="specialty-card group hover:shadow-large transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-border/50 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${specialty.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <specialty.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {specialty.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {specialty.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  {specialty.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-medium max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Expert Neurosurgical Care?
            </h3>
            <p className="text-muted-foreground mb-6">
              Schedule a consultation to discuss your specific condition and treatment options.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:shadow-large transition-all duration-300">
              Book Your Consultation Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialties;