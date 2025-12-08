
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, Globe, BookOpen, Users, BarChart } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About Equitable Journeys</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're a not-for-profit startup dedicated to creating a more equitable world through education and career advancement.
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Heart className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Equitable Journeys, we believe that everyone deserves access to quality education and career opportunities, regardless of their background or circumstances.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to create a more equitable world by helping people navigate educational pathways that lead to meaningful careers and personal fulfillment.
              </p>
              <p className="text-gray-600">
                We work with councils, youth projects, charities, local and national government, NGOs, and businesses to develop comprehensive strategies that expand educational access and create meaningful career pathways.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-none h-48 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <Globe className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Global Impact</h3>
                </CardContent>
              </Card>
              <Card className="bg-secondary/5 border-none h-48 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <BookOpen className="h-10 w-10 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Educational Access</h3>
                </CardContent>
              </Card>
              <Card className="bg-accent/5 border-none h-48 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <Users className="h-10 w-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Community Focus</h3>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-none h-48 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <BarChart className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Data-Driven</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Focus Areas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border shadow-md">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Qualification Guidance</h3>
                <p className="text-gray-600">
                  We provide comprehensive information about different qualification levels and help individuals understand what they mean for their educational journey.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Universities and higher education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Vocational qualifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Exams, testing and assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border shadow-md">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-secondary h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Strategic Partnerships</h3>
                <p className="text-gray-600">
                  We collaborate with various organizations to develop and implement strategies that create equitable educational opportunities.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Councils and local government</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Youth projects and charities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>National government and NGOs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Businesses and employers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border shadow-md">
              <CardContent className="p-6">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Career Advancement</h3>
                <p className="text-gray-600">
                  We help individuals identify and pursue educational pathways that lead to meaningful career advancement and personal growth.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Career pathway mapping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Skills gap analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Educational opportunity matching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Ongoing career guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Team Member Placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg mb-1">Team Member {i}</h3>
                <p className="text-gray-600 text-sm">Position Title</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our team brings together expertise from education, career development, social services, and public policy to create holistic solutions that address the real challenges people face in advancing their careers.
            </p>
            <Button asChild>
              <Link to="/contact">Join Our Team</Link>
            </Button>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/pathways">Find Your Path</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
