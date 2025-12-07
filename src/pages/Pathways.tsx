import React from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, ChevronRight, ChevronLeft, Route, GraduationCap } from 'lucide-react';

type Step =
  | 'intro'
  | 'currentCountry'
  | 'currentLevel'
  | 'mobility'
  | 'studyMode'
  | 'finance'
  | 'interests'
  | 'results';

const EU_COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania',
  'Slovakia', 'Slovenia', 'Spain', 'Sweden',
];

const EEA_EXTRA_COUNTRIES = ['Iceland', 'Liechtenstein', 'Norway'];
const SINGLE_MARKET_EXTRA = ['Switzerland'];
const OTHER_REGIONS = ['United Kingdom', 'Outside EU/EEA/Switzerland'];

const ALL_COUNTRIES = [
  ...EU_COUNTRIES,
  ...EEA_EXTRA_COUNTRIES,
  ...SINGLE_MARKET_EXTRA,
  ...OTHER_REGIONS,
];

const sectorOptions = [
  'Healthcare',
  'Education',
  'Technology',
  'Social Services',
  'Environmental',
  'Government',
  'Business',
  'Creative Arts',
];

const activeSteps: Step[] = [
  'currentCountry',
  'currentLevel',
  'mobility',
  'studyMode',
  'finance',
  'interests',
];

const stepOrder: Step[] = ['intro', ...activeSteps, 'results'];

const mapEqfToUkLevelCode = (eqf: string): string => {
  switch (eqf) {
    case 'below2':
      return 'none';
    case 'eqf2-3':
      return '1-2';
    case 'eqf4':
      return '3';
    case 'eqf5':
      return '4-5';
    case 'eqf6':
      return '6';
    case 'eqf7':
      return '7';
    case 'eqf8':
      return '8';
    default:
      return '';
  }
};

const getEqfLabel = (eqf: string): string => {
  switch (eqf) {
    case 'below2':
      return 'Below EQF 2 (no formal qualifications yet)';
    case 'eqf2-3':
      return 'EQF 2–3 (basic / lower secondary education)';
    case 'eqf4':
      return 'EQF 4 (upper secondary – general or vocational)';
    case 'eqf5':
      return 'EQF 5 (short-cycle higher / post-secondary vocational)';
    case 'eqf6':
      return 'EQF 6 (Bachelor level or equivalent)';
    case 'eqf7':
      return 'EQF 7 (Master level or equivalent)';
    case 'eqf8':
      return 'EQF 8 (Doctorate level)';
    default:
      return '';
  }
};

const costOfLivingHints: Record<string, string> = {
  Germany: 'Medium cost – many student cities with moderate rents.',
  France: 'Medium to high cost – higher in Paris, more moderate in regional cities.',
  Italy: 'Medium cost – northern cities higher, many affordable options in the centre and south.',
  Netherlands: 'Medium to high cost – housing pressure in major cities.',
  Spain: 'Medium cost – some affordable regional cities.',
};

const defaultTopCountries = ['Germany', 'France', 'Italy'];

type CountryPathwayConfig = {
  qualificationRoutes: string[];
  accommodation: string[];
  workAndStudy: string[];
  euFunding: string[];
  nationalFunding: string[];
  lowIncomeSupport: string[];
  notes?: string;
};

const countryConfigs: Record<string, CountryPathwayConfig> = {
  Germany: {
    qualificationRoutes: [
      'Dual vocational training (Ausbildung) combining paid work in a company with 1–2 days per week in vocational school, usually 2–3.5 years (EQF 3–4).',
      'Full-time vocational schools (Berufsfachschule) offering practical programmes in areas like healthcare, IT, engineering, hospitality and trades.',
      'Upper-secondary pathways such as Fachoberschule or Gymnasium (where entry requirements are met) to progress toward higher education (EQF 4–5).',
    ],
    accommodation: [
      'Student housing and residence halls managed by local Studentenwerk organisations in many cities.',
      'Shared flats (Wohngemeinschaft / WG) which are a common, lower-cost option for students and trainees.',
      'Company-supported accommodation for some dual-training programmes in smaller towns.',
    ],
    workAndStudy: [
      'In dual Ausbildung you are on an employment contract with a training salary from day one.',
      'Full-time students can usually take part-time jobs within visa or residence rules, especially in services, retail and hospitality.',
      'Some universities of applied sciences (Hochschulen / Fachhochschulen) offer dual bachelor programmes that combine work and study.',
    ],
    euFunding: [
      'Erasmus+ mobility grants for vocational education and training (VET) or higher education exchanges arranged through your home institution.',
      'European Solidarity Corps opportunities for volunteering and solidarity projects with a monthly allowance.',
    ],
    nationalFunding: [
      'BAföG (federal student support) for eligible learners in school, VET and higher education, based on residence status and financial need.',
      'Deutschlandstipendium and other merit- and need-based scholarships offered by universities and foundations.',
      'Regional or city-level grants for specific sectors or shortage professions in some Bundesländer.',
    ],
    lowIncomeSupport: [
      'Higher BAföG entitlement for learners from low-income households, including possible housing and childcare supplements.',
      'Reduced-price public transport and student discounts via university or vocational-school enrolment.',
      'Rent support and social benefits for eligible residents through local Jobcenter or social-welfare offices.',
    ],
    notes:
      'Germany is strong for paid apprenticeships and dual routes where you can earn while you learn and build recognised qualifications.',
  },

  France: {
    qualificationRoutes: [
      'CAP (Certificat d’aptitude professionnelle) for hands-on vocational skills in trades such as catering, mechanics, retail or care (EQF 3).',
      'Bac professionnel (vocational baccalaureate) in a lycée professionnel, usually over 3 years, preparing for work or further study (EQF 4).',
      'Technological and general baccalaureates (bac technologique / bac général) where access requirements are met, leading toward BTS, BUT and university.',
    ],
    accommodation: [
      'CROUS-managed student residences in many towns and cities, with subsidised rents for eligible students.',
      'Private student residences and shared flats, especially in larger cities.',
      'Boarding options in some lycées professionnels for vocational learners who live far from the school.',
    ],
    workAndStudy: [
      'Apprenticeship contracts (contrat d’apprentissage) that combine employment in a company with training in a CFA, with a monthly salary.',
      'Students on school-based programmes can often take part-time work within legal limits, especially in services and hospitality.',
      'Sandwich or alternating routes (formation en alternance) at BTS, BUT and some degree levels.',
    ],
    euFunding: [
      'Erasmus+ grants for VET and higher-education mobility, usually arranged between your current and host institutions.',
      'European Solidarity Corps projects that can be based in France with an allowance and accommodation support.',
    ],
    nationalFunding: [
      'CROUS need-based grants (bourses sur critères sociaux) for students in recognised programmes.',
      'Housing assistance (APL or other CAF benefits) to reduce rent costs, depending on income and status.',
      'Support for apprentices including partial coverage of training costs and minimum apprenticeship wages.',
    ],
    lowIncomeSupport: [
      'Higher-rate CROUS grants and emergency aid funds for students in financial difficulty.',
      'Subsidised meals in university restaurants, with very low prices for scholarship holders.',
      'Additional support for disabled learners via MDPH and university disability services.',
    ],
    notes:
      'France combines strong social-support mechanisms (CROUS, housing aid) with a wide network of vocational and academic routes.',
  },

  Italy: {
    qualificationRoutes: [
      'Regional initial VET programmes leading to professional operator qualifications (EQF 3) in fields like mechanics, ICT, hospitality and personal services.',
      'Four-year vocational and technical routes (istituti professionali / istituti tecnici) leading to diplomas at EQF 4.',
      'Transition from upper-secondary vocational or technical diplomas into higher technical institutes (ITS Academy) or university, where requirements are met.',
    ],
    accommodation: [
      'Public and private student residences, especially in larger university cities.',
      'Shared apartments (stanze in affitto) which can be more affordable in medium-sized cities and southern regions.',
      'Some regional or university-linked housing schemes tied to study grants.',
    ],
    workAndStudy: [
      'Apprenticeships and work-based learning in many vocational tracks, combining classroom learning with company placements.',
      'Part-time jobs in services, tourism and retail are common for students, depending on local labour markets.',
      'ITS Academy programmes often integrate internships or periods of structured work experience.',
    ],
    euFunding: [
      'Erasmus+ mobility for VET learners, ITS students and university students, often organised by the sending institution.',
      'European Solidarity Corps opportunities that can add experience between or alongside studies.',
    ],
    nationalFunding: [
      'Regional “diritto allo studio” grants that reduce or waive tuition fees and can contribute to housing and living costs.',
      'Fee reductions and instalment plans at public universities for lower-income families.',
      'Targeted scholarships for specific disciplines, such as engineering, teaching or healthcare.',
    ],
    lowIncomeSupport: [
      'Income-based study grants which can include accommodation and meal subsidies.',
      'Discounted student canteens and transport in many regions for eligible learners.',
      'Additional support and targeted services for disabled students and those with specific learning needs.',
    ],
    notes:
      'Italy offers relatively low public-university tuition by international standards, with regional grants playing an important role for low-income learners.',
  },

  Netherlands: {
    qualificationRoutes: [
      'Upper-secondary vocational programmes (mbo 2–4) in colleges, covering sectors like technology, business, care, logistics and hospitality (EQF 2–4).',
      'Two learning pathways in mbo: school-based (bol) and work-based (bbl) with more time in paid employment.',
      'Progression from mbo 4 into professional bachelor programmes (hbo) at universities of applied sciences if you meet entry criteria.',
    ],
    accommodation: [
      'Student rooms in shared houses or small apartments (kamers), often arranged via local platforms or housing corporations.',
      'Limited student housing complexes in some cities, with long waiting lists in high-pressure areas.',
      'Commuting from nearby towns is common where rent is significantly cheaper.',
    ],
    workAndStudy: [
      'In the bbl route you are employed by a company and spend most of the week working, with 1 day in school.',
      'Full-time students can usually work part-time jobs in retail, hospitality, logistics and care sectors.',
      'Many hbo programmes include mandatory internships (stages) linked directly to the curriculum.',
    ],
    euFunding: [
      'Erasmus+ for mbo, hbo and university students, including traineeships abroad.',
      'European Solidarity Corps projects within or outside the Netherlands.',
    ],
    nationalFunding: [
      'Study finance (studiefinanciering) from DUO for eligible learners, which may include a basic grant, supplementary grant and student travel product.',
      'Tuition-fee loans for higher education learners, repayable under income-linked rules.',
      'Extra allowances for apprentices or learners in shortage occupations in some sectors.',
    ],
    lowIncomeSupport: [
      'Supplementary grant from DUO for learners from low-income households, part of which can be converted to a gift when you graduate on time.',
      'Local municipal schemes for youth in education, such as contributions towards books, laptops or transport.',
      'Support services at mbo colleges, hbo institutions and universities for disabled students or those with care responsibilities.',
    ],
    notes:
      'The Dutch system is strong on clear progression routes from mbo into hbo, and on structured internships that link study and work.',
  },

  Spain: {
    qualificationRoutes: [
      'Basic vocational training (Formación Profesional Básica) for learners who need an alternative to traditional lower-secondary routes (EQF 2).',
      'Intermediate vocational programmes (CFGM, grado medio) leading to technician qualifications (EQF 3–4) in many professional fields.',
      'Higher vocational programmes (CFGS, grado superior) at EQF 5 with strong links to specific occupations and pathways into university.',
    ],
    accommodation: [
      'Student residences (colegios mayores and halls) linked to universities or private providers.',
      'Shared apartments in cities with universities or strong vocational centres, often the most common option.',
      'Cheaper options in smaller or inland cities compared with major coastal tourist areas.',
    ],
    workAndStudy: [
      'Most vocational programmes integrate work-based learning periods (formación en centros de trabajo).',
      'Part-time work alongside study is common in hospitality, retail and tourism, especially in larger cities.',
      'Some dual-vocational training schemes (FP dual) combine longer placements with company contracts.',
    ],
    euFunding: [
      'Erasmus+ for mobility periods during vocational or higher-education studies, organised by your school or university.',
      'European Solidarity Corps placements, including youth projects within Spain.',
    ],
    nationalFunding: [
      'State scholarships and grants (becas) from the Ministry of Education based on income, performance and programme level.',
      'Regional grants that top up national becas or target specific sectors and regions.',
      'Tuition fee reductions at public universities for certain categories of students.',
    ],
    lowIncomeSupport: [
      'Higher-value becas for learners from low-income households, which can include components for accommodation, materials and transport.',
      'Discounted meals, transport passes and local social-services support for eligible young people.',
      'Special measures and flexible pathways for learners who are at risk of early school leaving.',
    ],
    notes:
      'Spain offers a wide range of vocational options with built-in work experience and a strong national scholarship system for low-income learners.',
  },
};

  return (
    <MainLayout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Career Pathway Finder</h1>
            <p className="text-center text-gray-600 mb-8">
              Discover educational pathways that align with your career goals and interests.
            </p>

            {/* AI Tools Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Career Compass Pro</h3>
                  <p className="text-gray-600 mb-4">Get personalized career guidance from our AI chatbot expert</p>
                  <Button asChild className="w-full">
                    <Link to="/tools/career-compass">Open in-site view</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Einstein Learning</h3>
                  <p className="text-gray-600 mb-4">AI-powered learning assistant to help with your studies</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/tools/einstein-learning">Open in-site view</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Separator className="mb-8" />
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Or Use Our Interactive Pathway Tool</h2>
              <p className="text-gray-600">Complete our step-by-step questionnaire for detailed recommendations</p>
            </div>

            {step !== 'intro' && step !== 'results' && (
              <div className="mb-10">
                <Progress value={progress} className="h-2 mb-2" />
                <div className="text-sm text-gray-500 text-right">Step {getStepNumber(step)} of 3</div>
              </div>
            )}

            <Card className="border shadow-lg">
              {step === 'intro' && (
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <Route className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Find Your Educational Journey</h2>
                    <p className="text-gray-600">
                      This tool helps you discover suitable educational pathways based on your current qualifications, career goals, and interests. Answer a few questions to get personalized recommendations.
                    </p>
                    <div className="pt-4">
                      <Button size="lg" onClick={handleNextStep}>Start Exploring</Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {step === 'current' && (
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">What's your current qualification level?</h2>
                  <div className="space-y-6">
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
                    <div className="pt-6 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button onClick={handleNextStep} disabled={!currentLevel}>
                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {step === 'goals' && (
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">What are your career goals?</h2>
                  <div className="space-y-6">
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
                          <Label htmlFor="specialized">Gain specialized knowledge/skills</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="entrepreneurship" id="entrepreneurship" />
                          <Label htmlFor="entrepreneurship">Start my own business/organization</Label>
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
                    <div className="pt-6 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button onClick={handleNextStep} disabled={!goal}>
                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {step === 'interests' && (
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">What sectors are you interested in?</h2>
                  <div className="space-y-6">
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
                    <div className="pt-6 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button onClick={handleNextStep} disabled={interests.length === 0}>
                        See Results <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {step === 'results' && (
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <GraduationCap className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mt-4">Your Recommended Pathways</h2>
                    <p className="text-gray-600 mt-2">
                      Based on your current level ({currentLevel}), goals, and interests, here are some educational pathways to consider.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* First recommendation */}
                    <Card className="border-primary/20">
                      <CardHeader className="bg-primary/5 pb-3">
                        <CardTitle>Primary Recommendation</CardTitle>
                        <CardDescription>Best match for your profile</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {goal === 'academic' 
                            ? 'Research-Focused Advanced Degree' 
                            : goal === 'public' 
                              ? 'Public Service Qualification Pathway'
                              : 'Professional Development Track'}
                        </h3>
                        <div className="space-y-4">
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
                                  <li>Specialized diplomas</li>
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
                                  <li>Specialized certifications</li>
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
                        </div>
                      </CardContent>
                    </Card>

                    {/* Alternative pathway */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Alternative Pathway</CardTitle>
                        <CardDescription>Another option to consider</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {goal === 'entrepreneurship' 
                            ? 'Entrepreneurship & Innovation Track' 
                            : 'Specialized Skills Development'}
                        </h3>
                        <div className="space-y-4">
                          <p>
                            {goal === 'entrepreneurship'
                              ? 'This pathway helps you develop the skills needed to start and run your own ventures.'
                              : 'This pathway focuses on developing specialized skills in your field of interest.'}
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
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tips section */}
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

                    <div className="pt-6 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button>
                        Save Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pathways;
