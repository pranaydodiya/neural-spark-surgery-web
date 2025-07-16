import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Calendar, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title',
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

      // Contact cards animation
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo('.contact-form',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Line',
      value: '(555) 911-NEURO',
      description: '24/7 Emergency Support',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Phone,
      title: 'Appointments',
      value: '(555) 123-4567',
      description: 'Schedule Your Visit',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@neurosurgery.com',
      description: 'General Inquiries',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: '123 Medical Center Drive',
      description: 'Suite 500, Metro City',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Fri: 8AM-6PM',
      description: 'Sat: 9AM-2PM',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Calendar,
      title: 'Online Booking',
      value: 'Schedule Online',
      description: 'Available 24/7',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Schedule Your <span className="bg-gradient-primary bg-clip-text text-transparent">Consultation</span>
          </h2>
          <p className="contact-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Take the first step towards better neurological health. Contact us today to schedule 
            your consultation or for emergency neurosurgical care.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="contact-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="contact-card group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-primary mb-1">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="contact-form bg-gradient-card shadow-large">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Request Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <Input placeholder="John" className="bg-background border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <Input placeholder="Doe" className="bg-background border-border" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input placeholder="(555) 123-4567" className="bg-background border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-background border-border" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
                <Input type="date" className="bg-background border-border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition/Symptoms</label>
                <Textarea 
                  placeholder="Please describe your condition or symptoms..."
                  rows={4}
                  className="bg-background border-border"
                />
              </div>

              <Button className="w-full bg-gradient-primary hover:shadow-large transition-all duration-300 text-lg py-6">
                Submit Consultation Request
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">What to Expect</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Comprehensive neurological evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Review of medical history and imaging</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Detailed treatment plan discussion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Questions and concerns addressed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground shadow-large">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Emergency Situations</h3>
                <p className="mb-4">
                  For life-threatening neurological emergencies, call 911 immediately or visit your nearest emergency room.
                </p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Emergency Protocols
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-accent text-accent-foreground shadow-medium">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Insurance & Payment</h3>
                <p className="mb-4">
                  We accept most major insurance plans and offer flexible payment options for our patients.
                </p>
                <Button variant="secondary" className="bg-white text-accent hover:bg-gray-100">
                  View Insurance Plans
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;