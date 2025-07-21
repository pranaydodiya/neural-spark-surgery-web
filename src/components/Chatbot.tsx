import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Website knowledge base
  const websiteInfo = {
    doctor: {
      name: "Dr. Nisarg Parmar",
      specializations: ["Neurosurgeon", "Spine Surgeon", "Brain Tumor Expert"],
      experience: "10+ years",
      education: "NIMHANS Alumni, MCh Neurosurgery",
      surgeries: "3000+ patients treated, 500+ successful surgeries"
    },
    contact: {
      phone: "+91 8160440014",
      email: "drparmar@neurosurgery.com",
      location: "Velocity Business Hub Adajan, Surat, Gujarat",
      hours: "Mon-Sat: Various Timings",
      emergency: "24/7 Emergency Support"
    },
    services: {
      specialties: [
        "Brain Tumor Surgery",
        "Spinal Surgery", 
        "Neurotrauma Care",
        "Minimally Invasive Procedures",
        "Emergency Neurosurgery",
        "Spine Disorders Treatment"
      ],
      hospitals: [
        "Pinnacle Brain and Spine Center",
        "Unity Hospital - Consultant", 
        "SIDS Hospital - Visiting Consultant"
      ]
    }
  };

  const suggestedQuestions = [
    "What are Dr. Parmar's specializations?",
    "How to book an appointment?",
    "What is the hospital location?",
    "Emergency contact number?",
    "What conditions does Dr. Parmar treat?",
    "Dr. Parmar's experience and education?",
    "Hospital visiting hours?",
    "What to expect in consultation?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      setTimeout(() => {
        addBotMessage("Hello! 👋 I'm Dr. Parmar's AI assistant. I can help you with information about our neurosurgery services, appointments, and answer any questions you may have. How can I assist you today?");
      }, 500);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Contact information queries
    if (message.includes('phone') || message.includes('contact') || message.includes('number')) {
      return `📞 You can reach us at ${websiteInfo.contact.phone} for appointments and general inquiries. For emergencies, we provide 24/7 support. You can also email us at ${websiteInfo.contact.email}.`;
    }

    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return `📍 Dr. Parmar practices at ${websiteInfo.contact.location}. We also have presence at multiple hospitals including Pinnacle Brain and Spine Center, Unity Hospital, and SIDS Hospital.`;
    }

    if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
      return `📅 To book an appointment with Dr. Parmar:\n\n1. Call us at ${websiteInfo.contact.phone}\n2. Fill out the consultation form on our website\n3. We'll contact you within 24 hours to confirm\n\nFor emergencies, we're available 24/7!`;
    }

    if (message.includes('hours') || message.includes('timing') || message.includes('when')) {
      return `🕐 Our clinic hours are ${websiteInfo.contact.hours}. However, Dr. Parmar is available for emergency neurosurgical cases 24/7. Please call ${websiteInfo.contact.phone} for urgent situations.`;
    }

    // Doctor information queries
    if (message.includes('doctor') || message.includes('parmar') || message.includes('about')) {
      return `👨‍⚕️ Dr. Nisarg Parmar is a distinguished Neurosurgeon and Spine Surgeon with:\n\n• ${websiteInfo.doctor.experience} of experience\n• ${websiteInfo.doctor.education}\n• ${websiteInfo.doctor.surgeries}\n• Specialist in Brain Tumor Surgery, Spinal Surgery, and Neurotrauma`;
    }

    if (message.includes('specialization') || message.includes('specialty') || message.includes('expert')) {
      return `🧠 Dr. Parmar specializes in:\n\n• ${websiteInfo.services.specialties.map(s => `${s}`).join('\n• ')}\n\nHe is particularly renowned for complex brain and spine surgeries with minimally invasive techniques.`;
    }

    if (message.includes('education') || message.includes('qualification') || message.includes('nimhans')) {
      return `🎓 Dr. Parmar's educational background:\n\n• MBBS - Medical College\n• MCh Neurosurgery - NIMHANS, Bangalore\n• Fellowship in Advanced Spine Surgery\n\nNIMHANS is India's premier neurosurgical institution, ensuring world-class training.`;
    }

    // Service queries
    if (message.includes('treatment') || message.includes('condition') || message.includes('surgery')) {
      return `🏥 Dr. Parmar treats various neurological conditions including:\n\n• Brain tumors and neurological cancers\n• Spinal disorders and herniated discs\n• Head injuries and neurotrauma\n• Spinal stenosis and scoliosis\n• Emergency neurosurgical cases\n• Complex brain and spine surgeries\n\nAll treatments use latest minimally invasive techniques when possible.`;
    }

    if (message.includes('emergency') || message.includes('urgent') || message.includes('immediate')) {
      return `🚨 For neurological emergencies:\n\n• Call immediately: ${websiteInfo.contact.phone}\n• 24/7 emergency support available\n• For life-threatening situations, call 911 first\n• Dr. Parmar handles complex neurotrauma cases\n\nDon't hesitate to contact us for urgent neurological symptoms!`;
    }

    if (message.includes('hospital') || message.includes('clinic') || message.includes('center')) {
      return `🏥 Dr. Parmar practices at multiple locations:\n\n• ${websiteInfo.services.hospitals.join('\n• ')}\n\nPrimary location: ${websiteInfo.contact.location}\n\nThis ensures accessible, high-quality care throughout Surat region.`;
    }

    // Consultation queries
    if (message.includes('consultation') || message.includes('visit') || message.includes('expect')) {
      return `💭 During your consultation, you can expect:\n\n• Comprehensive neurological evaluation\n• Review of medical history and imaging\n• Detailed treatment plan discussion\n• All questions and concerns addressed\n• Clear explanation of procedures if needed\n\nDr. Parmar believes in thorough, compassionate patient care.`;
    }

    if (message.includes('cost') || message.includes('fee') || message.includes('insurance') || message.includes('payment')) {
      return `💳 Payment & Insurance:\n\n• We accept most major insurance plans\n• Flexible payment options available\n• Cost varies based on treatment complexity\n• Insurance verification available\n\nPlease call ${websiteInfo.contact.phone} for specific cost information and insurance verification.`;
    }

    // Default response
    return `I'd be happy to help! I can provide information about:\n\n• Dr. Parmar's background and specializations\n• Appointment booking and contact details\n• Hospital locations and timings\n• Treatment options and procedures\n• Emergency care information\n\nCould you please be more specific about what you'd like to know?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateBotResponse(inputMessage);
      addBotMessage(response);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    addUserMessage(question);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(question);
      addBotMessage(response);
      setIsTyping(false);
    }, 800);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chatbot Button with Attraction Animation */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            {/* Pulsing attraction indicator */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full animate-pulse"></div>
            
            {/* Attraction text bubble */}
            <div className="absolute -top-16 -left-32 sm:-left-48 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-primary/20 animate-bounce">
              <p className="text-sm font-medium text-foreground whitespace-nowrap">
                💬 Ask me anything about Dr. Parmar!
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-primary/20"></div>
            </div>

            <Button
              onClick={toggleChatbot}
              className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <MessageCircle className="w-7 h-7 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-bounce" />
            </Button>
          </div>
        )}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl border-2 border-primary/20 bg-background">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Dr. Parmar's Assistant</CardTitle>
                    <p className="text-sm text-white/80">Online • Ready to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChatbot}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 4).map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors text-xs p-1"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;