import { useState } from "react";
import {
  GraduationCap,
  Search,
  Info,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import MainLayout from "@/layouts/MainLayout";

type LevelId =
  | "entry"
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "level6"
  | "level7"
  | "level8";

interface QualificationExample {
  name: string;
  notes?: string;
}

interface QualificationLevel {
  id: LevelId;
  title: string;
  shortLabel: string;
  summary: string;
  typicalUse: string;
  entryRoutes: string[];
  examples: QualificationExample[];
}

const qualificationLevels: QualificationLevel[] = [
  {
    id: "entry",
    title: "Entry level",
    shortLabel: "Entry",
    summary:
      "Introductory qualifications that build confidence in core skills such as English, maths and basic vocational skills.",
    typicalUse:
      "Used to get started with formal learning, build study skills, or prepare for Level 1 programmes. Often suitable for people returning to education or learning English as an additional language.",
    entryRoutes: [
      "Entry level award, certificate or diploma",
      "Entry level ESOL or Skills for Life",
      "Entry level functional skills, essential skills",
    ],
    examples: [
      { name: "Entry level award / certificate / diploma" },
      { name: "Entry level ESOL or Skills for Life" },
      { name: "Entry level functional skills in maths and English" },
    ],
  },
  {
    id: "level1",
    title: "Level 1",
    shortLabel: "L1",
    summary:
      "Builds basic knowledge in a subject area and prepares you for Level 2 study.",
    typicalUse:
      "Often used as a stepping stone towards GCSEs at grades 9–4 (A*–C), apprenticeships, or Level 2 vocational routes.",
    entryRoutes: [
      "GCSEs at grades 3–1 (D–G)",
      "Level 1 award, certificate or diploma",
      "Level 1 NVQ, essential / functional skills",
    ],
    examples: [
      { name: "GCSEs at grades 3, 2, 1 or D–G" },
      { name: "Level 1 NVQ in a vocational area" },
      { name: "Level 1 functional skills" },
    ],
  },
  {
    id: "level2",
    title: "Level 2",
    shortLabel: "L2",
    summary:
      "Good general education level – often seen as the benchmark for many jobs and further study.",
    typicalUse:
      "Used to progress into Level 3 (A level or equivalent), intermediate apprenticeships or many entry level roles.",
    entryRoutes: [
      "GCSEs at grades 9–4 (A*–C)",
      "Level 2 award, certificate or diploma",
      "Intermediate apprenticeship, Level 2 NVQ",
    ],
    examples: [
      { name: "GCSEs at grades 9–4 or A*–C" },
      { name: "Intermediate apprenticeship" },
      { name: "Level 2 NVQ / vocational diploma" },
    ],
  },
  {
    id: "level3",
    title: "Level 3",
    shortLabel: "L3",
    summary:
      "Advanced level study – broadly equivalent to A levels and often the minimum for university entry.",
    typicalUse:
      "Used to progress into higher education (level 4–6), higher/degree apprenticeships, or more skilled roles.",
    entryRoutes: [
      "A level or AS level",
      "Access to HE Diploma",
      "Level 3 diploma, NVQ or ‘tech level’",
    ],
    examples: [
      { name: "A levels / AS levels" },
      { name: "Access to Higher Education Diploma" },
      { name: "Level 3 vocational diplomas and NVQs" },
    ],
  },
  {
    id: "level4",
    title: "Level 4",
    shortLabel: "L4",
    summary:
      "First level of higher education, often focused on building specialist knowledge and skills.",
    typicalUse:
      "Used to upskill in a specific area, move into supervisory or junior management roles, or as the first stage of a full degree.",
    entryRoutes: [
      "Certificate of Higher Education (CertHE)",
      "Higher National Certificate (HNC)",
      "Higher apprenticeship",
    ],
    examples: [
      { name: "Certificate of Higher Education (CertHE)" },
      { name: "Higher apprenticeship (Level 4)" },
      { name: "Higher National Certificate (HNC)" },
    ],
  },
  {
    id: "level5",
    title: "Level 5",
    shortLabel: "L5",
    summary:
      "Higher education level focused on professional practice and technical depth.",
    typicalUse:
      "Used to progress into middle management and specialist roles, or to continue into a full honours degree (Level 6).",
    entryRoutes: [
      "Diploma of Higher Education (DipHE)",
      "Foundation degree",
      "Higher National Diploma (HND)",
    ],
    examples: [
      { name: "Diploma of Higher Education (DipHE)" },
      { name: "Foundation degree" },
      { name: "Higher National Diploma (HND)" },
    ],
  },
  {
    id: "level6",
    title: "Level 6",
    shortLabel: "L6",
    summary:
      "Full degree level – the standard for many professional and graduate roles.",
    typicalUse:
      "Used to access graduate roles, professional training routes (e.g. chartered status), or postgraduate study at Level 7.",
    entryRoutes: [
      "Bachelor’s degree with or without honours (BA, BSc etc.)",
      "Degree apprenticeship",
      "Level 6 diploma or NVQ",
    ],
    examples: [
      { name: "Bachelor’s degree (BA, BSc etc.)" },
      { name: "Degree apprenticeship" },
      { name: "Level 6 professional diplomas / NVQs" },
    ],
  },
  {
    id: "level7",
    title: "Level 7",
    shortLabel: "L7",
    summary:
      "Postgraduate level study focused on advanced professional or academic skills.",
    typicalUse:
      "Used to deepen expertise, move into senior specialist roles, or prepare for research and leadership positions.",
    entryRoutes: [
      "Master’s degrees (MA, MSc etc.)",
      "Postgraduate certificates and diplomas, including PGCE",
      "Level 7 diplomas and NVQs",
    ],
    examples: [
      { name: "Master’s degree (MA, MSc, MEng)" },
      { name: "Postgraduate Certificate / Diploma" },
      { name: "PGCE (teacher training)" },
    ],
  },
  {
    id: "level8",
    title: "Level 8",
    shortLabel: "L8",
    summary:
      "Doctoral level – the highest formal academic qualification.",
    typicalUse:
      "Used for advanced research roles, academia, and some very senior specialist or leadership positions.",
    entryRoutes: [
      "Doctorate (PhD, DPhil etc.)",
      "Level 8 award, certificate or diploma",
    ],
    examples: [
      { name: "Doctorate (PhD, DPhil etc.)" },
      { name: "Level 8 professional diplomas" },
    ],
  },
];

function matchesSearch(level: QualificationLevel, term: string) {
  if (!term) return true;
  const t = term.toLowerCase();
  return (
    level.title.toLowerCase().includes(t) ||
    level.shortLabel.toLowerCase().includes(t) ||
    level.summary.toLowerCase().includes(t) ||
    level.examples.some((ex) => ex.name.toLowerCase().includes(t))
  );
}

export default function QualificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLevels = qualificationLevels.filter((level) =>
    matchesSearch(level, searchTerm),
  );

  return (
    <MainLayout>
      <main className="pb-16">
        {/* Hero / introduction */}
        <section className="bg-gradient-to-r from-primary/10 via-background to-primary/10 border-b">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4 md:max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                Not-for-profit, focused on access and opportunity
              </div>
              <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight md:text-4xl">
                <GraduationCap className="h-8 w-8 text-primary" />
                Qualifications & Pathways
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Equitable Journeys is a not-for-profit startup that wants to
                create a fairer, more equitable world. We help people{" "}
                <span className="font-semibold">
                  advance their careers by finding the right learning options
                </span>{" "}
                for their goals, circumstances and starting point.
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Our strategy is to work with{" "}
                <span className="font-medium">
                  councils, youth projects, charities, local and national
                  government, NGOs and businesses
                </span>{" "}
                so that guidance on qualifications is practical, local and easy
                to act on.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 text-xs md:text-sm"
                >
                  <a
                    href="https://www.gov.uk/what-different-qualification-levels-mean/list-of-qualification-levels"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BookOpen className="h-4 w-4" />
                    Official UK list of qualification levels
                  </a>
                </Button>
              </div>
            </div>

            <Card className="mt-4 w-full max-w-md md:mt-0">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Info className="h-5 w-5 text-primary" />
                  Qualification options we cover
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  High-level categories we use when matching people to learning
                  routes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs md:text-sm">
                <div className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">
                      Universities and higher education
                    </p>
                    <p className="text-muted-foreground">
                      Degrees, foundation years and higher education routes up
                      to postgraduate study.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Vocational qualifications</p>
                    <p className="text-muted-foreground">
                      Practical, career-focused routes such as NVQs,
                      apprenticeships and technical diplomas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">
                      Exams, testing and assessment
                    </p>
                    <p className="text-muted-foreground">
                      GCSEs, A levels and other assessments that prove your
                      knowledge at each level.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Levels grid with search + dialogs */}
        <section className="mx-auto mt-10 max-w-6xl px-4 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
                <BookOpen className="h-5 w-5 text-primary" />
                Explore UK qualification levels
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                There are 9 levels in England, Wales and Northern Ireland:
                Entry level plus Levels 1–8. Click a card to see what each
                level means and how it can be used.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Search by level or example qualification
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8 text-xs md:text-sm"
                  placeholder="e.g. GCSE, apprenticeship, master’s…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLevels.map((level) => (
              <Dialog key={level.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer transition hover:border-primary hover:shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-base md:text-lg">
                        <span className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {level.shortLabel}
                          </span>
                          {level.title}
                        </span>
                        <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs md:text-sm">
                        {level.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs md:text-sm">
                      <p className="font-medium text-muted-foreground">
                        Example qualifications:
                      </p>
                      <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                        {level.examples.slice(0, 3).map((example) => (
                          <li key={example.name}>
                            {example.name}
                            {example.notes ? (
                              <span className="text-xs text-muted-foreground/80">
                                {" "}
                                – {example.notes}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Click for a full explanation of this level and where it
                        can lead.
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      {level.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                      {level.summary}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-3 space-y-4 text-xs md:text-sm">
                    <div>
                      <p className="mb-1 font-semibold">
                        What this level is used for
                      </p>
                      <p className="text-muted-foreground">
                        {level.typicalUse}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 font-semibold">Typical qualifications</p>
                      <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                        {level.examples.map((example) => (
                          <li key={example.name}>
                            {example.name}
                            {example.notes ? (
                              <span className="text-xs text-muted-foreground/80">
                                {" "}
                                – {example.notes}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-1 font-semibold">
                        Where Equitable Journeys can help
                      </p>
                      <p className="text-muted-foreground">
                        We use your current level, experience and goals to
                        recommend{" "}
                        <span className="font-medium">
                          specific courses, universities, vocational
                          qualifications and assessments
                        </span>{" "}
                        that move you towards the next level in a realistic way.
                      </p>
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Based on the official UK framework for qualification
                      levels in England, Wales and Northern Ireland. You can
                      read the full guidance on{" "}
                      <a
                        href="https://www.gov.uk/what-different-qualification-levels-mean/list-of-qualification-levels"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary underline-offset-2 hover:underline"
                      >
                        GOV.UK
                      </a>
                      .
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
