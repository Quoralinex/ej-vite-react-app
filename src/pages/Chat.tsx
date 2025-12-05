import { ArrowRight, ExternalLink, GraduationCap, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";

const Chat = () => {
  return (
    <MainLayout>
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">AI-powered support</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Guided assistance without any setup
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Jump straight into our trusted GPT experiences. There are no hidden API keys or accounts to configure – just
              launch the tools and start exploring personalised career and learning insights.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/tools/career-compass" className="flex items-center gap-2">
                  Open Career Compass Pro
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/tools/einstein-learning">Explore Einstein Learning</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-full shadow-lg">
              <CardHeader className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  <GraduationCap className="h-4 w-4" />
                  Career Compass Pro
                </div>
                <CardTitle className="text-2xl">Get personalised career guidance</CardTitle>
                <CardDescription>
                  Talk to our AI chatbot expert for advice on qualifications, interview preparation, and choosing the right next
                  step.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Highlights:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Bespoke pathway suggestions based on your goals.</li>
                  <li>Practical tips for applications, CVs, and interviews.</li>
                  <li>Clear explanations of qualification levels and routes.</li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/tools/career-compass" className="flex items-center gap-2">
                    Open in-site view
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full sm:w-auto">
                  <a
                    href="https://chatgpt.com/g/g-689fa62cca108191a50965a258edef58-career-compass-pro"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    Launch in new tab
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="h-full shadow-lg">
              <CardHeader className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  <Lightbulb className="h-4 w-4" />
                  Einstein Learning
                </div>
                <CardTitle className="text-2xl">AI-powered study support</CardTitle>
                <CardDescription>
                  Get clear explanations, revision plans, and study tips from a learning-focused GPT designed to keep you on track.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Highlights:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Structured study plans tailored to your course.</li>
                  <li>Quick answers to subject questions and tricky topics.</li>
                  <li>Encouraging nudges to keep your momentum.</li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/tools/einstein-learning" className="flex items-center gap-2">
                    Open in-site view
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full sm:w-auto">
                  <a
                    href="https://chatgpt.com/g/g-68aa3c62374c819182b283f2ba1fbfe6-einstein-learning"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    Launch in new tab
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Chat;
