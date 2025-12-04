
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, GraduationCap, BarChart, Route } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
                <span className="gradient-text">Discover Your Perfect</span> Educational Journey
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                We help people advance their careers by finding the right qualifications and learning pathways tailored to their goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/pathways">Explore Pathways</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/qualifications">View Qualifications</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
                  alt="Students learning together" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Help</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides tools and resources to help you navigate the complex landscape of qualifications and educational pathways.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <GraduationCap className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Qualification Explorer</h3>
                <p className="text-gray-600 mb-4">
                  Understand the different qualification levels and what they mean for your career progression.
                </p>
                <Link to="/qualifications" className="text-primary font-medium flex items-center hover:underline">
                  Explore Qualifications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Route className="text-secondary h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Career Pathways</h3>
                <p className="text-gray-600 mb-4">
                  Discover educational routes that align with your career goals and current qualifications.
                </p>
                <Link to="/pathways" className="text-primary font-medium flex items-center hover:underline">
                  Find Your Path <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">AI-Powered Tools</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized guidance from our Career Compass Pro and Einstein Learning chatbots.
                </p>
                <Link to="/pathways" className="text-primary font-medium flex items-center hover:underline">
                  Access AI Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Creating a More Equitable World</h2>
              <p className="text-gray-600 mb-6">
                We believe that everyone deserves access to quality education and career opportunities, regardless of their background or circumstances.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Working with councils, youth projects, and charities to expand educational access</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Partnering with local and national government agencies to improve educational outcomes</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Collaborating with NGOs and businesses to create meaningful career pathways</p>
                </li>
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/about">About Our Mission</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80" 
                  alt="Student in classroom" 
                  className="rounded-lg shadow-md h-auto max-w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1529007196863-d07650a1f0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                  alt="Students collaborating" 
                  className="rounded-lg shadow-md h-auto max-w-full"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                  alt="Graduation ceremony" 
                  className="rounded-lg shadow-md h-auto max-w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80" 
                  alt="Student studying" 
                  className="rounded-lg shadow-md h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-accent/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Whether you're just starting out or looking to advance your current career, we're here to help you find the right educational path.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/pathways">Find Your Path Today</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
