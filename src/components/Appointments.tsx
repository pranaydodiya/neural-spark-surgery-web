
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Appointments = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.appointments-title',
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

      // Appointment cards animation
      gsap.fromTo('.appointment-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.appointments-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const appointments = [
    {
      number: '1',
      name: 'Pinnacle Brain and Spine Center',
      address: 'Velocity Business Hub Adajan',
      phone: '+91 8160440014',
      timing: 'Mon to Sat - 6pm to 8pm',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
    },
    {
      number: '2',
      name: 'Unity Hospital',
      address: 'Velocity Business Hub Adajan',
      phone: '+91 8160440014',
      timing: 'Mon to Sat - 11am to 1pm',
      color: 'from-green-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop'
    },
    {
      number: '3',
      name: 'Dr. Nisarg Parmar, Brain and Spine Center',
      address: 'Velocity Business Hub Adajan',
      phone: '+91 8160440014',
      timing: 'Mon to Sat - 2pm to 4pm',
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop'
    },
    {
      number: '4',
      name: 'SIDS Hospital',
      address: 'Velocity Business Hub Adajan',
      phone: '+91 8160440014',
      timing: 'Mon to Sat - 4pm to 5pm',
      color: 'from-red-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="appointments-title text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Schedule Your <span className="bg-gradient-primary bg-clip-text text-transparent">Appointment</span>
          </h2>
          <p className="appointments-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Visit Dr. Nisarg Parmar at any of these convenient locations across Surat. 
            Book your consultation today for expert neurosurgical care.
          </p>
        </div>

        <div className="appointments-grid grid md:grid-cols-2 gap-8">
          {appointments.map((appointment, index) => (
            <Card key={index} className="appointment-card group hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-gradient-card overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={appointment.image}
                  alt={appointment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${appointment.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {appointment.number}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {appointment.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{appointment.address}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a 
                    href={`tel:${appointment.phone}`}
                    className="text-primary hover:text-primary-dark transition-colors font-medium"
                  >
                    {appointment.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{appointment.timing}</p>
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-300 mt-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-large max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Emergency Neurosurgical Care</h3>
              <p className="mb-6 opacity-90">
                For emergency neurosurgical situations, Dr. Parmar provides 24/7 emergency consultation and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: +91 8160440014
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                  Emergency Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Appointments;
