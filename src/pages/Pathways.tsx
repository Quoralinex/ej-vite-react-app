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
  | 'studyMode'
  | 'mobility'
  | 'finance'
  | 'interests'
  | 'results';

const EU_COUNTRIES = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
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
  'studyMode',
  'mobility',
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
  Austria: 'Medium to high cost – Vienna highest, smaller cities more moderate.',
  Belgium: 'Medium to high cost – Brussels and Antwerp more expensive.',
  Bulgaria: 'Lower cost – comparatively affordable housing and daily expenses.',
  Croatia: 'Medium cost – coastal tourist areas higher than inland cities.',
  Cyprus: 'Medium cost – housing and utilities can be relatively high.',
  Czechia: 'Medium cost – Prague higher, regional cities more affordable.',
  Denmark: 'High cost – one of Europe’s more expensive countries.',
  Estonia: 'Medium cost – Tallinn higher, other regions more moderate.',
  Finland: 'Medium to high cost – Helsinki area significantly higher.',
  France: 'Medium to high cost – Paris high, regional cities more moderate.',
  Germany: 'Medium cost – many student cities with moderate rents.',
  Greece: 'Medium cost – Athens and islands higher than inland areas.',
  Hungary: 'Medium cost – Budapest higher, regional cities cheaper.',
  Ireland: 'High cost – especially Dublin for rent and daily expenses.',
  Italy:
    'Medium cost – northern cities higher, many affordable options in central and southern regions.',
  Latvia: 'Medium cost – Riga highest, other towns more affordable.',
  Lithuania: 'Medium cost – Vilnius higher than smaller cities.',
  Luxembourg: 'High cost – housing and services among highest in EU.',
  Malta: 'Medium to high cost – limited housing supply drives rents.',
  Netherlands: 'Medium to high cost – housing pressure in major cities.',
  Poland: 'Medium cost – large cities moderate, smaller cities cheaper.',
  Portugal:
    'Medium cost – Lisbon and Porto higher, inland regions more affordable.',
  Romania: 'Lower to medium cost – daily expenses comparatively low.',
  Slovakia: 'Medium cost – Bratislava higher, other regions moderate.',
  Slovenia: 'Medium cost – Ljubljana higher than regional towns.',
  Spain: 'Medium cost – major cities and islands higher than inland areas.',
  Sweden: 'Medium to high cost – Stockholm and Gothenburg most expensive.',
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

const commonEuFunding = [
  'Erasmus+ mobility grants for vocational and higher education, usually arranged by your current or future institution.',
  'European Solidarity Corps projects that offer volunteering or solidarity activities with an allowance.',
];

const makeGenericCountryConfig = (
  countryName: string,
  extraNotes?: string,
): CountryPathwayConfig => ({
  qualificationRoutes: [
    `Upper-secondary general or vocational programmes leading to recognised school-leaving qualifications (around EQF 4) in ${countryName}.`,
    `Initial and continuing vocational education and training in colleges, vocational schools or training centres, with routes in areas like technology, services, care and business.`,
    'Progression routes into higher vocational programmes, universities of applied sciences or universities, depending on entry requirements.',
  ],
  accommodation: [
    'Student residences or dormitories in major study cities (availability varies by region).',
    'Private rented rooms or shared flats, often arranged via student platforms or local housing agencies.',
    'Living with family or commuting from nearby towns where accommodation is more affordable.',
  ],
  workAndStudy: [
    'Work-based learning or apprenticeship-style programmes in some vocational routes, combining company experience with classroom learning.',
    'Part-time work options for students in sectors such as retail, hospitality, care, logistics or tourism, depending on local labour markets.',
    'Internships or practical placements embedded in many vocational and higher-education programmes.',
  ],
  euFunding: [...commonEuFunding],
  nationalFunding: [
    `National or regional grants and scholarships for learners in recognised programmes in ${countryName}, often income-based.`,
    'Student loans or income-contingent fee support for higher education in some systems.',
    'Targeted incentives or grants in shortage occupations or priority sectors.',
  ],
  lowIncomeSupport: [
    'Means-tested grants or bursaries for learners from low-income households.',
    'Subsidies or discounts for accommodation, meals or public transport for eligible students.',
    'Additional support for disabled learners, carers or other groups with specific needs.',
  ],
  notes: extraNotes,
});

const countryConfigs: Record<string, CountryPathwayConfig> = {
  // Detailed configs
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
    euFunding: [...commonEuFunding],
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
      'Alternance routes (formation en alternance) at BTS, BUT and some degree levels, mixing work and study.',
    ],
    euFunding: [...commonEuFunding],
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
    euFunding: [...commonEuFunding],
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
    euFunding: [...commonEuFunding],
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
    euFunding: [...commonEuFunding],
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

  // Generic configs for the rest of EU-27
  Austria: makeGenericCountryConfig(
    'Austria',
    'Austria has a strong dual vocational system and higher-education sector with low or moderate tuition fees at public institutions.',
  ),
  Belgium: makeGenericCountryConfig(
    'Belgium',
    'Belgium offers multiple language communities with their own higher-education systems and support schemes.',
  ),
  Bulgaria: makeGenericCountryConfig(
    'Bulgaria',
    'Bulgaria combines relatively low living costs with universities and vocational institutions in major cities such as Sofia and Plovdiv.',
  ),
  Croatia: makeGenericCountryConfig(
    'Croatia',
    'Croatia has growing vocational and higher-education options and is developing more work-based learning routes.',
  ),
  Cyprus: makeGenericCountryConfig(
    'Cyprus',
    'Cyprus offers programmes in Greek and English, with strong links to tourism, services and business sectors.',
  ),
  Czechia: makeGenericCountryConfig(
    'Czechia',
    'Czechia has a well-developed technical and engineering education tradition, with options in Czech and sometimes English.',
  ),
  Denmark: makeGenericCountryConfig(
    'Denmark',
    'Denmark emphasises applied learning and has strong student support, but living costs are relatively high.',
  ),
  Estonia: makeGenericCountryConfig(
    'Estonia',
    'Estonia has a growing digital and technology focus with many programmes linked to the IT sector.',
  ),
  Finland: makeGenericCountryConfig(
    'Finland',
    'Finland combines universities and universities of applied sciences with a focus on equality of access and high-quality teaching.',
  ),
  Greece: makeGenericCountryConfig(
    'Greece',
    'Greece offers universities and vocational institutes with routes linked to tourism, shipping, services and the public sector.',
  ),
  Hungary: makeGenericCountryConfig(
    'Hungary',
    'Hungary has technical universities and vocational programmes, with some English-taught options and relatively moderate living costs.',
  ),
  Ireland: makeGenericCountryConfig(
    'Ireland',
    'Ireland has a strong higher-education system and a growing technology and pharmaceutical sector, but housing costs can be high.',
  ),
  Latvia: makeGenericCountryConfig(
    'Latvia',
    'Latvia offers universities and colleges in Riga and regional centres, with growing options in business and technology.',
  ),
  Lithuania: makeGenericCountryConfig(
    'Lithuania',
    'Lithuania has universities and colleges with programmes in health, engineering, social sciences and IT, often at moderate cost.',
  ),
  Luxembourg: makeGenericCountryConfig(
    'Luxembourg',
    'Luxembourg is small but highly international, with strong finance, EU-institution and multilingual opportunities.',
  ),
  Malta: makeGenericCountryConfig(
    'Malta',
    'Malta offers programmes strongly connected to tourism, maritime services and digital industries in a small-island context.',
  ),
  Poland: makeGenericCountryConfig(
    'Poland',
    'Poland has a large network of universities and technical institutions with relatively moderate living costs in many cities.',
  ),
  Portugal: makeGenericCountryConfig(
    'Portugal',
    'Portugal offers universities and polytechnics with popular programmes in engineering, tourism, business and creative sectors.',
  ),
  Romania: makeGenericCountryConfig(
    'Romania',
    'Romania combines low to medium living costs with expanding higher-education and vocational options.',
  ),
  Slovakia: makeGenericCountryConfig(
    'Slovakia',
    'Slovakia has universities and vocational schools with routes feeding into automotive, engineering and services sectors.',
  ),
  Slovenia: makeGenericCountryConfig(
    'Slovenia',
    'Slovenia offers compact but high-quality systems with strong links to outdoor, tourism, engineering and business sectors.',
  ),
  Sweden: makeGenericCountryConfig(
    'Sweden',
    'Sweden focuses on student-centred learning, equality and sustainability, with many English-taught higher-education options.',
  ),
};

const Pathways: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');

  const [currentCountry, setCurrentCountry] = useState('');
  const [currentEqfLevel, setCurrentEqfLevel] = useState('');
  const [currentLevel, setCurrentLevel] = useState(''); // UK approximation, used only for comparison text

  const [studyMode, setStudyMode] = useState('');
  const [targetCountries, setTargetCountries] = useState<string[]>([]);
  const [fundingProfile, setFundingProfile] = useState('');
  const [supportFlags, setSupportFlags] = useState<string[]>([]);
  const [accommodationPreferences, setAccommodationPreferences] = useState<string[]>([]);
  const [costPreference, setCostPreference] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const [progress, setProgress] = useState(0);

  const effectiveTargetCountries = useMemo(() => {
    if (targetCountries.length === 0 || targetCountries.includes('not-sure')) {
      return defaultTopCountries;
    }
    return targetCountries;
  }, [targetCountries]);

  const totalSteps = activeSteps.length;

  const getStepNumber = (currentStep: Step): number => {
    const index = activeSteps.indexOf(currentStep);
    return index === -1 ? 0 : index + 1;
  };

  const goToStep = (nextStep: Step) => {
    setStep(nextStep);
    const activeIndex = activeSteps.indexOf(nextStep);
    if (activeIndex === -1) {
      setProgress(0);
    } else {
      setProgress(((activeIndex + 1) / totalSteps) * 100);
    }
  };

  const handleNextStep = () => {
    const currentIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentIndex + 1] ?? 'results';
    goToStep(nextStep);
  };

  const handlePrevStep = () => {
    const currentIndex = stepOrder.indexOf(step);
    const prevStep = stepOrder[currentIndex - 1] ?? 'intro';
    goToStep(prevStep);
  };

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const handleMultiToggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleDownloadResults = () => {
    const data = {
      currentCountry,
      currentEqfLevel: getEqfLabel(currentEqfLevel),
      ukApproxLevel: currentLevel || mapEqfToUkLevelCode(currentEqfLevel),
      studyMode,
      targetCountries: effectiveTargetCountries,
      fundingProfile,
      supportFlags,
      accommodationPreferences,
      costPreference,
      interests,
    };

    const blob = new Blob(
      [
        'Equitable Journeys – Pathway Summary\n\n',
        JSON.stringify(data, null, 2),
      ],
      { type: 'text/plain;charset=utf-8' },
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'equitable-journeys-pathway-summary.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-center text-4xl font-bold">
              Career Pathway Finder
            </h1>
            <p className="mb-8 text-center text-gray-600">
              Discover educational pathways that align with your goals and qualifications
              across the UK and Europe.
            </p>

            {/* AI Tools section */}
            <div className="mb-10 grid gap-6 md:grid-cols-2">
              <Card className="border-primary/20 transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Career Compass Pro</h3>
                  <p className="mb-4 text-gray-600">
                    Get personalised career guidance from our AI chatbot expert.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/tools/career-compass">Open in-site view</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <GraduationCap className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Einstein Learning</h3>
                  <p className="mb-4 text-gray-600">
                    AI-powered learning assistant to help with your studies.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/tools/einstein-learning">Open in-site view</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Separator className="mb-8" />

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold">
                Or Use Our Interactive Pathway Tool
              </h2>
              <p className="text-gray-600">
                Complete our step-by-step questionnaire for detailed recommendations.
              </p>
            </div>

            {step !== 'intro' && step !== 'results' && (
              <div className="mb-10">
                <Progress value={progress} className="mb-2 h-2" />
                <div className="text-right text-sm text-gray-500">
                  Step {getStepNumber(step)} of {totalSteps}
                </div>
              </div>
            )}

            <Card className="border shadow-lg">
              {/* INTRO */}
              {step === 'intro' && (
                <CardContent className="p-8">
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Route className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Find Your Educational Journey</h2>
                    <p className="text-gray-600">
                      This tool helps you explore pathways based on your current
                      qualifications, how you want to study, and where in Europe you would
                      like to learn.
                    </p>
                    <div className="pt-4">
                      <Button size="lg" onClick={() => goToStep('currentCountry')}>
                        Start Exploring
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {/* Q1 – CURRENT COUNTRY */}
              {step === 'currentCountry' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    Where are you currently living or studying?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    This helps us match you with routes and support in your country, or in
                    other European countries.
                  </p>
                  <RadioGroup
                    value={currentCountry}
                    onValueChange={setCurrentCountry}
                    className="grid gap-3 md:grid-cols-2"
                  >
                    {ALL_COUNTRIES.map((country) => (
                      <div
                        key={country}
                        className="flex items-center space-x-3 rounded-lg border p-3"
                      >
                        <RadioGroupItem value={country} id={`country-${country}`} />
                        <Label htmlFor={`country-${country}`}>{country}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep} disabled={!currentCountry}>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* Q2 – CURRENT LEVEL (EQF) */}
              {step === 'currentLevel' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    What is your current qualification level?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Choose the option that best matches your highest completed level,
                    using the European Qualifications Framework (EQF).
                  </p>
                  <RadioGroup
                    value={currentEqfLevel}
                    onValueChange={(value) => {
                      setCurrentEqfLevel(value);
                      setCurrentLevel(mapEqfToUkLevelCode(value));
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="below2" id="eqf-below2" />
                      <Label htmlFor="eqf-below2" className="flex flex-col">
                        <span className="font-medium">No formal qualifications yet</span>
                        <span className="text-sm text-gray-600">
                          Below EQF 2 – you may be starting from scratch or returning to
                          learning.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf2-3" id="eqf2-3" />
                      <Label htmlFor="eqf2-3" className="flex flex-col">
                        <span className="font-medium">
                          Completed basic / lower-secondary education
                        </span>
                        <span className="text-sm text-gray-600">
                          EQF 2–3 – typically completion of compulsory schooling.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf4" id="eqf4" />
                      <Label htmlFor="eqf4" className="flex flex-col">
                        <span className="font-medium">
                          Completed upper-secondary qualification
                        </span>
                        <span className="text-sm text-gray-600">
                          EQF 4 – general or vocational school-leaving certificate.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf5" id="eqf5" />
                      <Label htmlFor="eqf5" className="flex flex-col">
                        <span className="font-medium">
                          Short-cycle higher / post-secondary vocational
                        </span>
                        <span className="text-sm text-gray-600">
                          EQF 5 – higher vocational diplomas, short-cycle tertiary.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf6" id="eqf6" />
                      <Label htmlFor="eqf6" className="flex flex-col">
                        <span className="font-medium">Bachelor level or equivalent</span>
                        <span className="text-sm text-gray-600">
                          EQF 6 – first cycle higher education.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf7" id="eqf7" />
                      <Label htmlFor="eqf7" className="flex flex-col">
                        <span className="font-medium">Master level or equivalent</span>
                        <span className="text-sm text-gray-600">
                          EQF 7 – second cycle higher education.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="eqf8" id="eqf8" />
                      <Label htmlFor="eqf8" className="flex flex-col">
                        <span className="font-medium">Doctorate level</span>
                        <span className="text-sm text-gray-600">
                          EQF 8 – doctoral or equivalent level.
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <p className="mt-4 text-xs text-gray-500">
                    In your results we will also show the approximate UK level for easy
                    comparison.
                  </p>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep} disabled={!currentEqfLevel}>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* Q3 – STUDY MODE */}
              {step === 'studyMode' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    How do you want to study?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Choose the option that best matches the way you would like to learn in
                    your next step.
                  </p>
                  <RadioGroup
                    value={studyMode}
                    onValueChange={setStudyMode}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="full-time-campus" id="full-time-campus" />
                      <Label htmlFor="full-time-campus" className="flex flex-col">
                        <span className="font-medium">Full-time on campus</span>
                        <span className="text-sm text-gray-600">
                          Most of your week is focused on in-person study.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="part-time" id="part-time" />
                      <Label htmlFor="part-time" className="flex flex-col">
                        <span className="font-medium">Part-time or flexible</span>
                        <span className="text-sm text-gray-600">
                          You want to combine study with other responsibilities.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex flex-col">
                        <span className="font-medium">Online / distance learning</span>
                        <span className="text-sm text-gray-600">
                          Mostly online, with flexibility on location.
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value="apprenticeship" id="apprenticeship" />
                      <Label htmlFor="apprenticeship" className="flex flex-col">
                        <span className="font-medium">
                          Apprenticeship / dual learning (where available)
                        </span>
                        <span className="text-sm text-gray-600">
                          A paid work contract combined with structured training.
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep} disabled={!studyMode}>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* Q4 – TARGET COUNTRIES / MOBILITY */}
              {step === 'mobility' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    Which country or countries are you interested in?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    You can choose one or several European countries. If you are not sure,
                    we can highlight a few strong options.
                  </p>

                  <div className="mb-4 grid gap-2 md:grid-cols-2">
                    {ALL_COUNTRIES.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleMultiToggle(country, setTargetCountries)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm ${
                          targetCountries.includes(country)
                            ? 'border-primary bg-primary/5'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleMultiToggle('not-sure', setTargetCountries)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm ${
                        targetCountries.includes('not-sure')
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      Not sure – show me a few good options
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    If you do not choose a country, we will show example pathways in
                    Germany, France and Italy and explain why they are useful benchmarks.
                  </p>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep}>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* Q5 & Q6 – FINANCE, SUPPORT, ACCOMMODATION & COST */}
              {step === 'finance' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    Funding, support and living situation
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Tell us how you expect to pay for your studies and where you might
                    live. We will highlight relevant grants, support and cost-of-living
                    information.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        How will you fund your studies?
                      </h3>
                      <RadioGroup
                        value={fundingProfile}
                        onValueChange={setFundingProfile}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="self-funding" id="self-funding" />
                          <Label htmlFor="self-funding" className="flex flex-col">
                            <span className="font-medium">
                              Mostly self-funding (savings or family support)
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="grants" id="grants" />
                          <Label htmlFor="grants" className="flex flex-col">
                            <span className="font-medium">
                              I will need significant grants or scholarships
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="work-and-study" id="work-and-study" />
                          <Label htmlFor="work-and-study" className="flex flex-col">
                            <span className="font-medium">
                              I need to combine work and study to afford it
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="already-working" id="already-working" />
                          <Label htmlFor="already-working" className="flex flex-col">
                            <span className="font-medium">
                              I am already working and want to study alongside my job
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Do any of these apply to you?
                      </h3>
                      <div className="grid gap-2 md:grid-cols-2">
                        {[
                          'Low household income or financial hardship',
                          'Parent or carer responsibilities',
                          'Disabled or long-term health condition',
                          'Refugee, migrant or displaced background',
                          'First in family to enter higher education',
                          'None of these',
                        ].map((flag) => (
                          <button
                            key={flag}
                            type="button"
                            onClick={() => handleMultiToggle(flag, setSupportFlags)}
                            className={`rounded-lg border px-3 py-2 text-left text-sm ${
                              supportFlags.includes(flag)
                                ? 'border-primary bg-primary/5'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {flag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Where would you prefer to live while studying?
                      </h3>
                      <div className="grid gap-2 md:grid-cols-2">
                        {[
                          'On-site student accommodation (halls or residence)',
                          'Private rented room or shared flat',
                          'Living with family or friends',
                          'I don’t know yet',
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              handleMultiToggle(item, setAccommodationPreferences)
                            }
                            className={`rounded-lg border px-3 py-2 text-left text-sm ${
                              accommodationPreferences.includes(item)
                                ? 'border-primary bg-primary/5'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Cost-of-living preference
                      </h3>
                      <RadioGroup
                        value={costPreference}
                        onValueChange={setCostPreference}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="lower-cost" id="lower-cost" />
                          <Label htmlFor="lower-cost" className="flex flex-col">
                            <span className="font-medium">
                              Lower-cost regions, even if there are fewer options
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced" className="flex flex-col">
                            <span className="font-medium">
                              Balanced cost and range of options
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value="high-opportunity" id="high-opportunity" />
                          <Label htmlFor="high-opportunity" className="flex flex-col">
                            <span className="font-medium">
                              High-opportunity cities, even if costs are higher
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!fundingProfile || !costPreference}
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* Q6 – SECTOR INTERESTS */}
              {step === 'interests' && (
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold">
                    What sectors are you interested in?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Select all sectors that interest you. We will use this to highlight
                    relevant routes in each country.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {sectorOptions.map((sector) => (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => handleInterestToggle(sector)}
                        className={`rounded-md border p-3 text-left transition-colors ${
                          interests.includes(sector)
                            ? 'border-primary bg-primary/10'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{sector}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={interests.length === 0}
                    >
                      See Results
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}

              {/* RESULTS */}
              {step === 'results' && (
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <GraduationCap className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">
                      Your Recommended Pathways
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Based on your current level (
                      {getEqfLabel(currentEqfLevel) || 'not specified yet'}) – roughly UK
                      level {currentLevel || mapEqfToUkLevelCode(currentEqfLevel)} – your
                      study preferences and interests, here are some routes to explore.
                    </p>
                    {targetCountries.includes('not-sure') ||
                      targetCountries.length === 0 ? (
                      <p className="mt-2 text-xs text-gray-500">
                        You were not sure which country to choose, so we have highlighted
                        Germany, France and Italy as strong examples with clear vocational
                        and higher-education routes.
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-6">
                    {effectiveTargetCountries.map((country) => {
                      const config = countryConfigs[country];

                      return (
                        <div
                          key={country}
                          className="space-y-3 rounded-lg border bg-muted/30 p-4"
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <h3 className="text-lg font-semibold">
                              Study pathways in {country}
                            </h3>
                          </div>

                          {config ? (
                            <div className="space-y-3 text-sm">
                              <div>
                                <p className="font-medium">Qualification routes</p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.qualificationRoutes.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">Accommodation options</p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.accommodation.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">Work and study</p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.workAndStudy.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">
                                  EU-level funding & opportunities
                                </p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.euFunding.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">National funding & grants</p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.nationalFunding.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">
                                  Support for low-income learners
                                </p>
                                <ul className="ml-5 list-disc space-y-1">
                                  {config.lowIncomeSupport.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              {costOfLivingHints[country] && (
                                <p className="text-xs text-gray-500">
                                  Cost-of-living hint: {costOfLivingHints[country]}
                                </p>
                              )}

                              {config.notes && (
                                <p className="text-xs text-gray-500">
                                  Note: {config.notes}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600">
                              We are still adding detailed information for this country.
                              You can use the EU-wide guidance and funding options while
                              this is being expanded.
                            </p>
                          )}
                        </div>
                      );
                    })}

                    <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      <div className="flex-shrink-0">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Helpful tips</h3>
                        <p className="mt-1">
                          Check national education and funding portals in each country for
                          up-to-date information on grants, reduced fees and support for
                          learners from low-income households. Many providers also have
                          student support teams who can help you understand your options.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button onClick={handleDownloadResults}>
                        Save Results
                        <ChevronRight className="ml-2 h-4 w-4" />
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
