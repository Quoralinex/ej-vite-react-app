
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              Have questions or want to learn more about our services? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">For general inquiries:</p>
                <a
  href="mailto:hello.equitable-journeys@quoralinex.com"
  className="text-primary hover:underline"
>
  hello.equitable-journeys@quoralinex.com
</a>

              </CardContent>
            </Card>

            <Card className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  123 Education Lane<br />
                  London, EC1A 1AA<br />
                  United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Monday to Friday, 9am-5pm:</p>
                <a href="tel:+442071234567" className="text-primary hover:underline">
                  +44 (0)20 7123 4567
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">What services do you offer?</h3>
                  <p className="text-gray-600">
                    We provide educational pathway guidance, qualification information, and career advancement support for individuals at all stages of their educational journey.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Are your services free?</h3>
                  <p className="text-gray-600">
                    Yes, our core services are free. As a not-for-profit organization, we're committed to making educational guidance accessible to everyone.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">How can my organization partner with you?</h3>
                  <p className="text-gray-600">
                    We collaborate with educational institutions, government agencies, NGOs, and businesses. Contact us to discuss potential partnerships.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Do you offer personalized guidance?</h3>
                  <p className="text-gray-600">
                    Yes, we can provide personalized educational pathway recommendations based on your current qualifications, goals, and interests.
                  </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                  <div className="bg-primary/10 rounded-full p-3 mr-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-primary font-medium">
                    Have other questions? Get in touch with us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Interactive map would be displayed here</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest news, updates, and educational resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="sm:flex-1"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
