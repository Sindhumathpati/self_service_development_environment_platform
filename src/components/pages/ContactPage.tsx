import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'MESSAGE SENT',
        description: 'Thank you for contacting us. We will get back to you shortly.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground uppercase tracking-wider mb-6">
              CONTACT US
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/80">
              Have questions or need support? We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl text-foreground uppercase tracking-wider mb-8">
              SEND US A MESSAGE
            </h2>
            <form onSubmit={handleSubmit} className="bg-background border border-gridline p-8 space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                  NAME *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className="bg-background border-gridline"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                  EMAIL *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@company.com"
                  className="bg-background border-gridline"
                />
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                  SUBJECT *
                </Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="How can we help?"
                  className="bg-background border-gridline"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                  MESSAGE *
                </Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="bg-background border-gridline"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl text-foreground uppercase tracking-wider mb-8">
                GET IN TOUCH
              </h2>
              <p className="font-paragraph text-base text-subtletext leading-relaxed mb-8">
                Our team is available to assist you with any questions about the platform, technical support, or environment provisioning.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="bg-background border border-gridline p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg text-foreground uppercase tracking-wider mb-2">
                      EMAIL SUPPORT
                    </h3>
                    <p className="font-paragraph text-base text-subtletext">
                      support@devenv-platform.com
                    </p>
                    <p className="font-paragraph text-sm text-subtletext mt-2">
                      Response time: Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-gridline p-6">
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg text-foreground uppercase tracking-wider mb-2">
                      LIVE CHAT
                    </h3>
                    <p className="font-paragraph text-base text-subtletext">
                      Available Monday - Friday
                    </p>
                    <p className="font-paragraph text-sm text-subtletext mt-2">
                      9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-primary border border-gridline p-6">
              <h3 className="font-heading text-lg text-primary-foreground uppercase tracking-wider mb-3">
                NEED QUICK ANSWERS?
              </h3>
              <p className="font-paragraph text-sm text-primary-foreground/80 mb-4">
                Check out our documentation for common questions and guides.
              </p>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="/documentation">VIEW DOCUMENTATION</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
