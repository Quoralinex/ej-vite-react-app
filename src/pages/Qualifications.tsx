import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import QualificationModal from "@/components/QualificationModal";

const QUALIFICATIONS = [
  {
    title: "Entry Level",
    description:
      "Entry Level qualifications help learners build basic knowledge. They come in 3 sub-levels: Entry 1, 2 and 3.",
    details: `Includes:
• Entry Level Award
• Entry Level Certificate (ELC)
• Entry Level Diploma
• ESOL Entry Level
• Entry Level Functional Skills
• Essential Skills
• Skills for Life`
  },
  {
    title: "Level 1",
    description:
      "Level 1 qualifications develop basic skills and understanding.",
    details: `Includes:
• GCSE (Grades 3–1 or D–G)
• Level 1 Award, Certificate, Diploma
• Level 1 NVQ
• ESOL Level 1
• Functional Skills Level 1
• Essential Skills
• Music Grades 1–3`
  },
  {
    title: "Level 2",
    description:
      "Level 2 qualifications are equivalent to good GCSE passes.",
    details: `Includes:
• GCSE (Grades 9–4 or A*–C)
• Intermediate Apprenticeship
• Level 2 Award, Certificate, Diploma
• Level 2 NVQ
• ESOL Level 2
• Functional Skills Level 2
• National Certificate / Diploma
• O-Level A–C
• Music Grades 4–5`
  },
  {
    title: "Level 3",
    description:
      "Level 3 qualifications prepare learners for higher education or skilled employment.",
    details: `Includes:
• A Levels
• AS Levels
• Access to HE Diploma
• International Baccalaureate
• Level 3 Award, Certificate, Diploma
• Level 3 NVQ
• Advanced Apprenticeship
• Applied General
• Music Grades 6–8`
  },
  {
    title: "Level 4",
    description:
      "Level 4 qualifications develop advanced knowledge and are equivalent to the first year of university.",
    details: `Includes:
• Higher National Certificate (HNC)
• Level 4 Award, Certificate, Diploma
• Level 4 NVQ
• Higher Apprenticeship`
  },
  {
    title: "Level 5",
    description:
      "Level 5 qualifications develop specialist knowledge equal to a foundation degree.",
    details: `Includes:
• Foundation Degree
• Diploma of Higher Education (DipHE)
• Higher National Diploma (HND)
• Level 5 Award, Certificate, Diploma
• Level 5 NVQ`
  },
  {
    title: "Level 6",
    description:
      "Level 6 qualifications are equivalent to a full bachelor's degree.",
    details: `Includes:
• Honours Degrees (BA, BSc)
• Degree Apprenticeship
• Graduate Certificate / Diploma
• Level 6 Award, Certificate, Diploma
• Level 6 NVQ
• Ordinary Degree (non-honours)`
  },
  {
    title: "Level 7",
    description:
      "Level 7 qualifications represent advanced postgraduate study.",
    details: `Includes:
• Master's Degrees (MA, MSc)
• Integrated Master's (MEng)
• PGCE
• Postgraduate Certificate / Diploma
• Level 7 Award, Certificate, Diploma
• Level 7 NVQ`
  },
  {
    title: "Level 8",
    description:
      "Level 8 qualifications are the highest level of study.",
    details: `Includes:
• Doctorate (PhD, DPhil)
• Level 8 Award, Certificate, Diploma`
  }
];

export default function Qualifications() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Qualifications</h1>

      <p className="text-gray-700 mb-8">
        Equitable Journeys is a not-for-profit startup focused on creating a more
        equitable world by helping people advance their careers through personalised
        advice on the best learning pathways.  
        Our strategy includes collaboration with local councils, youth projects,
        charities, government bodies, NGOs, and businesses to expand access to
        learning.
      </p>

      <h2 className="text-2xl font-bold mb-4">Qualification Levels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {QUALIFICATIONS.map((q, i) => (
          <Card
            key={i}
            className="cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelected(q)}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{q.title}</h3>
              <p className="text-gray-600 mt-2">{q.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && (
        <QualificationModal
          open={true}
          onClose={() => setSelected(null)}
          title={selected.title}
          description={`${selected.description}\n\n${selected.details}`}
        />
      )}
    </div>
  );
}
