
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, Filter, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Define qualification data types
interface QualificationType {
  name: string;
  description?: string;
}

interface QualificationLevel {
  level: string;
  title: string;
  description: string;
  qualifications: QualificationType[];
}

// Define the qualification data based on the provided UK qualification levels
const qualificationData: QualificationLevel[] = [
  {
    level: "entry",
    title: "Entry Level",
    description: "Entry level qualifications are the most basic. They're available at three sub-levels - 1, 2 and 3, with entry level 3 being the most difficult.",
    qualifications: [
      { name: "Entry level award" },
      { name: "Entry level certificate (ELC)" },
      { name: "Entry level diploma" },
      { name: "Entry level English for speakers of other languages (ESOL)" },
      { name: "Entry level essential skills" },
      { name: "Entry level functional skills" },
      { name: "Skills for Life" }
    ]
  },
  {
    level: "1",
    title: "Level 1",
    description: "Level 1 qualifications are the next step up from entry level, equivalent to GCSE grades D, E, F and G.",
    qualifications: [
      { name: "First certificate" },
      { name: "GCSE - grades 3, 2, 1 or grades D, E, F, G" },
      { name: "Level 1 award" },
      { name: "Level 1 certificate" },
      { name: "Level 1 diploma" },
      { name: "Level 1 ESOL" },
      { name: "Level 1 essential skills" },
      { name: "Level 1 functional skills" },
      { name: "Level 1 national vocational qualification (NVQ)" },
      { name: "Music grades 1, 2 and 3" }
    ]
  },
  {
    level: "2",
    title: "Level 2",
    description: "Level 2 qualifications are equivalent to GCSE grades A*-C, with more specialization than level 1.",
    qualifications: [
      { name: "CSE - grade 1" },
      { name: "GCSE - grades 9, 8, 7, 6, 5, 4 or grades A*, A, B, C" },
      { name: "Intermediate apprenticeship" },
      { name: "Level 2 award" },
      { name: "Level 2 certificate" },
      { name: "Level 2 diploma" },
      { name: "Level 2 ESOL" },
      { name: "Level 2 essential skills" },
      { name: "Level 2 functional skills" },
      { name: "Level 2 national certificate" },
      { name: "Level 2 national diploma" },
      { name: "Level 2 NVQ" },
      { name: "Music grades 4 and 5" },
      { name: "O level - grade A, B or C" }
    ]
  },
  {
    level: "3",
    title: "Level 3",
    description: "Level 3 qualifications are equivalent to A levels, offering deeper knowledge in specific subject areas.",
    qualifications: [
      { name: "A level" },
      { name: "Access to higher education diploma" },
      { name: "Advanced apprenticeship" },
      { name: "Applied general" },
      { name: "AS level" },
      { name: "International Baccalaureate diploma" },
      { name: "Level 3 award" },
      { name: "Level 3 certificate" },
      { name: "Level 3 diploma" },
      { name: "Level 3 ESOL" },
      { name: "Level 3 national certificate" },
      { name: "Level 3 national diploma" },
      { name: "Level 3 NVQ" },
      { name: "Music grades 6, 7 and 8" },
      { name: "Tech level" }
    ]
  },
  {
    level: "4",
    title: "Level 4",
    description: "Level 4 qualifications are at a level equivalent to the first year of an undergraduate degree.",
    qualifications: [
      { name: "Certificate of higher education (CertHE)" },
      { name: "Higher apprenticeship" },
      { name: "Higher national certificate (HNC)" },
      { name: "Level 4 award" },
      { name: "Level 4 certificate" },
      { name: "Level 4 diploma" },
      { name: "Level 4 NVQ" }
    ]
  },
  {
    level: "5",
    title: "Level 5",
    description: "Level 5 qualifications are equivalent to the second year of an undergraduate degree.",
    qualifications: [
      { name: "Diploma of higher education (DipHE)" },
      { name: "Foundation degree" },
      { name: "Higher national diploma (HND)" },
      { name: "Level 5 award" },
      { name: "Level 5 certificate" },
      { name: "Level 5 diploma" },
      { name: "Level 5 NVQ" }
    ]
  },
  {
    level: "6",
    title: "Level 6",
    description: "Level 6 qualifications are equivalent to bachelor's degrees (with or without honours).",
    qualifications: [
      { name: "Degree apprenticeship" },
      { name: "Degree with honours - for example bachelor of the arts (BA) hons, bachelor of science (BSc) hons" },
      { name: "Graduate certificate" },
      { name: "Graduate diploma" },
      { name: "Level 6 award" },
      { name: "Level 6 certificate" },
      { name: "Level 6 diploma" },
      { name: "Level 6 NVQ" },
      { name: "Ordinary degree without honours" }
    ]
  },
  {
    level: "7",
    title: "Level 7",
    description: "Level 7 qualifications are equivalent to master's degrees and postgraduate certificates or diplomas.",
    qualifications: [
      { name: "Integrated master's degree, for example master of engineering (MEng)" },
      { name: "Level 7 award" },
      { name: "Level 7 certificate" },
      { name: "Level 7 diploma" },
      { name: "Level 7 NVQ" },
      { name: "Master's degree, for example master of arts (MA), master of science (MSc)" },
      { name: "Postgraduate certificate" },
      { name: "Postgraduate certificate in education (PGCE)" },
      { name: "Postgraduate diploma" }
    ]
  },
  {
    level: "8",
    title: "Level 8",
    description: "Level 8 qualifications are equivalent to doctorate level, the highest level of academic achievement.",
    qualifications: [
      { name: "Doctorate, for example doctor of philosophy (PhD or DPhil)" },
      { name: "Level 8 award" },
      { name: "Level 8 certificate" },
      { name: "Level 8 diploma" }
    ]
  }
];

const Qualifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter qualifications based on search term
  const filteredData = qualificationData
    .map(level => ({
      ...level,
      qualifications: level.qualifications.filter(qual => 
        qual.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(level => activeTab === 'all' || level.level === activeTab)
    .filter(level => level.qualifications.length > 0);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">UK Qualification Levels</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore the different qualification levels in England, Wales, and Northern Ireland and discover what they mean for your educational journey.
            </p>
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search qualifications..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="all">All Levels</TabsTrigger>
                <TabsTrigger value="entry">Entry</TabsTrigger>
                <TabsTrigger value="1-3">Levels 1-3</TabsTrigger>
                <TabsTrigger value="4-6">Levels 4-6</TabsTrigger>
                <TabsTrigger value="7-8">Levels 7-8</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="space-y-12">
                {filteredData.map((level) => (
                  <QualificationLevelSection key={level.level} level={level} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="entry">
              <div className="space-y-12">
                {filteredData
                  .filter(level => level.level === "entry")
                  .map((level) => (
                    <QualificationLevelSection key={level.level} level={level} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="1-3">
              <div className="space-y-12">
                {filteredData
                  .filter(level => ["1", "2", "3"].includes(level.level))
                  .map((level) => (
                    <QualificationLevelSection key={level.level} level={level} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="4-6">
              <div className="space-y-12">
                {filteredData
                  .filter(level => ["4", "5", "6"].includes(level.level))
                  .map((level) => (
                    <QualificationLevelSection key={level.level} level={level} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="7-8">
              <div className="space-y-12">
                {filteredData
                  .filter(level => ["7", "8"].includes(level.level))
                  .map((level) => (
                    <QualificationLevelSection key={level.level} level={level} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-primary/10 rounded-full p-5">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Need help finding the right qualification?</h3>
                  <p className="text-gray-600 mb-0">
                    Our career pathway tool can help you identify suitable qualifications based on your goals and current level.
                  </p>
                </div>
                <Button asChild size="lg">
                  <a href="/pathways">Try Pathway Tool</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

// Component for displaying a qualification level section
interface QualificationLevelSectionProps {
  level: QualificationLevel;
}

const QualificationLevelSection = ({ level }: QualificationLevelSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{level.title}</h2>
      <p className="text-gray-600 mb-6 max-w-3xl">{level.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {level.qualifications.map((qual, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-4">
              <div className="font-medium">{qual.name}</div>
              {qual.description && <p className="text-sm text-gray-500 mt-1">{qual.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Qualifications;
