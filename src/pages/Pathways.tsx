import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, ChevronRight, ChevronLeft, Route, GraduationCap } from 'lucide-react';

type Step = 'intro' | 'current' | 'goals' | 'interests' | 'results';

const Pathways = () => {
  const [step, setStep] = useState<Step>('intro');
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const getStepNumber = (currentStep: Step): number => {
    const stepOrder: Step[] = ['intro', 'current', 'goals', 'interests', 'results'];
    return stepOrder.indexOf(currentStep);
  };

  const handleNextStep = () => {
    const stepOrder: Step[] = ['intro', 'current', 'goals', 'interests', 'results'];
    const currentIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentIndex + 1];
    setStep(nextStep);
    setProgress((currentIndex + 1) * 25);
  };

  const handlePrevStep = () => {
    const stepOrder: Step[] = ['intro', 'current', 'goals', 'interests', 'results'];
    const currentIndex = stepOrder.indexOf(step);
    const prevStep = stepOrder[currentIndex - 1];
    setStep(prevStep);
    setProgress(currentIndex * 25);
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const sectorOptions = [
    'Healthcare',
    'Education',
    'Technology',
    'Social Services',
    'Environmental',
    'Government',
    'Business',
    'Creative Arts'
  ];

  return (
    <MainLayout>
      <section className="py-12 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold">Career Pathway Finder</h1>
            <p className="text-lg text-gray-600">
              Discover educational pathways that align with your career goals and interests.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" onClick={() => setStep('current')}>Start Pathway Tool</Button>
              <Button size="lg" variant="outline" onClick={() => setStep('intro')}>Restart</Button>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">Understand your starting point</h3>
                <p className="text-gray-600 text-sm">Share your current qualification level so we can recommend the right next steps.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">Clarify your goals</h3>
                <p className="text-gray-600 text-sm">Tell us where you'd like to go—new careers, advancement, or specialised skills.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">Explore tailored pathways</h3>
                <p className="text-gray-600 text-sm">Review recommended routes and qualifications that fit your ambitions.</p>
              </CardContent>
            </Card>
          </div>

          {step !== 'intro' && step !== 'results' && (
            <div className="mt-10">
              <Progress value={progress} className="h-2 mb-2" />
              <div className="text-sm text-gray-500 text-right">Step {getStepNumber(step)} of 3</div>
            </div>
          )}

          <Card className="mt-6 border shadow-lg">
            {step === 'intro' && (
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <Route className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Find Your Educational Journey</h2>
                  <p className="text-gray-600">
                    This tool helps you discover suitable educational pathways based on your current qualifications, career goals, and interests. Answer a few questions to get personalised recommendations.
                  </p>
                  <div className="pt-4">
                    <Button size="lg" onClick={handleNextStep}>Start Exploring</Button>
                  </div>
                </div>
              </CardContent>
            )}

            {step === 'current' && (
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold">What's your current qualification level?</h2>
                <p className="text-gray-600">
                  Select the highest level of qualification you currently hold.
                </p>
                <RadioGroup value={currentLevel} onValueChange={setCurrentLevel}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No formal qualifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="entry" id="entry" />
                      <Label htmlFor="entry">Entry level qualifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2" id="1-2" />
                      <Label htmlFor="1-2">Level 1-2 (GCSEs, O Levels)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3" />
                      <Label htmlFor="3">Level 3 (A Levels, BTEC Nationals)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4-5" id="4-5" />
                      <Label htmlFor="4-5">Level 4-5 (HNC, HND, Foundation Degree)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6" id="6" />
                      <Label htmlFor="6">Level 6 (Bachelor's Degree)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7" id="7" />
                      <Label htmlFor="7">Level 7 (Master's Degree)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8" id="8" />
                      <Label htmlFor="8">Level 8 (Doctorate)</Label>
                    </div>
                  </div>
                </RadioGroup>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!currentLevel}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}

            {step === 'goals' && (
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold">What are your career goals?</h2>
                <p className="text-gray-600">
                  Choose the option that best describes your primary career goal.
                </p>
                <RadioGroup value={goal} onValueChange={setGoal}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enter" id="enter" />
                      <Label htmlFor="enter">Enter a new career field</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advance" id="advance" />
                      <Label htmlFor="advance">Advance in my current career</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specialized" id="specialized" />
                      <Label htmlFor="specialized">Gain specialised knowledge/skills</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="entrepreneurship" id="entrepreneurship" />
                      <Label htmlFor="entrepreneurship">Start my own business/organisation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="academic" id="academic" />
                      <Label htmlFor="academic">Pursue academic/research career</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Work in public service/government</Label>
                    </div>
                  </div>
                </RadioGroup>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!goal}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}

            {step === 'interests' && (
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold">What sectors are you interested in?</h2>
                <p className="text-gray-600">
                  Select all sectors that interest you (choose at least one).
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {sectorOptions.map((sector) => (
                    <div
                      key={sector}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        interests.includes(sector)
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleInterestToggle(sector)}
                    >
                      <div className="font-medium">{sector}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={interests.length === 0}>
                    See Results <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}

            {step === 'results' && (
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-3">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <GraduationCap className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your Recommended Pathways</h2>
                  <p className="text-gray-600">
                    Based on your current level ({currentLevel}), goals, and interests, here are some educational pathways to consider.
                  </p>
                </div>

                <Card className="border-primary/20">
                  <CardHeader className="bg-primary/5 pb-3">
                    <CardTitle>Primary Recommendation</CardTitle>
                    <CardDescription>Best match for your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-xl font-semibold">
                      {goal === 'academic'
                        ? 'Research-Focused Advanced Degree'
                        : goal === 'public'
                          ? 'Public Service Qualification Pathway'
                          : 'Professional Development Track'}
                    </h3>
                    <p>
                      {goal === 'academic'
                        ? 'This pathway focuses on building your research capabilities and academic expertise.'
                        : goal === 'public'
                          ? 'This pathway prepares you for roles in government, NGOs, and public service.'
                          : 'This pathway builds on your current qualifications to advance your professional skills.'}
                    </p>
                    <div>
                      <h4 className="font-semibold">Recommended Next Steps:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {currentLevel === 'none' || currentLevel === 'entry' ? (
                          <>
                            <li>Level 1-2 qualifications in your area of interest</li>
                            <li>Functional skills qualifications</li>
                            <li>Vocational training certificates</li>
                          </>
                        ) : currentLevel === '1-2' ? (
                          <>
                            <li>Level 3 qualification (A Levels or BTEC National)</li>
                            <li>Advanced apprenticeship</li>
                            <li>Access to Higher Education Diploma</li>
                          </>
                        ) : currentLevel === '3' ? (
                          <>
                            <li>Foundation degree or HND (Level 5)</li>
                            <li>Higher apprenticeship</li>
                            <li>Professional certifications</li>
                          </>
                        ) : currentLevel === '4-5' ? (
                          <>
                            <li>Top-up to full Bachelor's degree (Level 6)</li>
                            <li>Professional body memberships</li>
                            <li>Specialised diplomas</li>
                          </>
                        ) : currentLevel === '6' ? (
                          <>
                            <li>Master's degree (Level 7)</li>
                            <li>Postgraduate certificates</li>
                            <li>Professional examinations</li>
                          </>
                        ) : currentLevel === '7' ? (
                          <>
                            <li>Doctorate or PhD (Level 8)</li>
                            <li>Research fellowships</li>
                            <li>Executive education</li>
                          </>
                        ) : (
                          <>
                            <li>Post-doctoral research</li>
                            <li>Professional leadership qualifications</li>
                            <li>Specialised certifications</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold">Potential Institutions:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {interests.includes('Healthcare') && (
                          <li>Health Education England accredited courses</li>
                        )}
                        {interests.includes('Education') && (
                          <li>Teaching qualification providers</li>
                        )}
                        {interests.includes('Technology') && (
                          <li>Technical certification bodies</li>
                        )}
                        {interests.includes('Government') && (
                          <li>Civil Service Learning</li>
                        )}
                        <li>UK universities with relevant programs</li>
                        <li>Accredited online learning platforms</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Alternative Pathway</CardTitle>
                    <CardDescription>Another option to consider</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="text-xl font-semibold">
                      {goal === 'entrepreneurship'
                        ? 'Entrepreneurship & Innovation Track'
                        : 'Specialised Skills Development'}
                    </h3>
                    <p>
                      {goal === 'entrepreneurship'
                        ? 'This pathway helps you develop the skills needed to start and run your own ventures.'
                        : 'This pathway focuses on developing specialised skills in your field of interest.'}
                    </p>
                    <div>
                      <h4 className="font-semibold">Key Components:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Short, focused courses and certifications</li>
                        <li>Professional body memberships</li>
                        <li>Mentorship and networking opportunities</li>
                        <li>Industry-specific qualifications</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">Helpful Tips</h3>
                    <p className="text-amber-700 text-sm mt-1">
                      Research funding options such as scholarships, grants, and student loans. Many institutions offer financial support, especially for students from underrepresented backgrounds.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button>Save Results</Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pathways;
