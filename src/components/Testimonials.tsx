
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.testimonials-title',
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

      // Testimonial cards animation
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: 'Rajesh Sharma',
      location: 'Mumbai',
      condition: 'Spinal Surgery',
      rating: 5,
      text: 'Dr. Nisarg Parmar performed my complex spinal surgery with exceptional skill. His expertise from NIMHANS truly shows in his work. I can walk normally again thanks to his precise surgical techniques.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Priya Patel',
      location: 'Surat',
      condition: 'Brain Tumor',
      rating: 5,
      text: 'When I was diagnosed with a brain tumor, Dr. Parmar guided me through every step. His compassionate approach and surgical excellence gave me hope. Today, I am completely recovered.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b2d8b1ec?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Amit Kumar',
      location: 'Ahmedabad',
      condition: 'Neurotrauma',
      rating: 5,
      text: 'After my accident, Dr. Parmar performed emergency brain surgery that saved my life. His quick decision-making and surgical skills are remarkable. Forever grateful to him.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sunita Mehta',
      location: 'Vadodara',
      condition: 'Pediatric Neurosurgery',
      rating: 5,
      text: 'Dr. Parmar treated my 8-year-old son with such care and expertise. His gentle approach with children and successful surgery gave our family new hope. Highly recommend him.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Vikram Singh',
      location: 'Rajkot',
      condition: 'Vascular Neurosurgery',
      rating: 5,
      text: 'The minimally invasive procedure Dr. Parmar performed for my brain aneurysm was flawless. His training from NIMHANS reflects in his precision and patient care.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Kavita Joshi',
      location: 'Surat',
      condition: 'Neuro Endoscopy',
      rating: 5,
      text: 'Dr. Parmar\'s endoscopic surgery was incredible. Minimal scarring, quick recovery, and excellent results. His expertise in advanced techniques is truly commendable.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Patient <span className="bg-gradient-primary bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="testimonials-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from patients whose lives have been transformed through 
            expert neurosurgical care and compassionate treatment.
          </p>
        </div>

        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card group hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">• {testimonial.condition}</span>
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-medium max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Patient Satisfaction</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
