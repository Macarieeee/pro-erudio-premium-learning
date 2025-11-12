import { Mic, Lightbulb, Users2, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalDevelopment = () => {
  const courses = [
    {
      icon: Mic,
      title: "Public Speaking",
      description: "Dezvoltă abilitățile de prezentare și comunicare publică cu încredere.",
      color: "bg-blue-50",
    },
    {
      icon: Lightbulb,
      title: "Creative Thinking",
      description: "Stimulează creativitatea și gândirea critică prin activități interactive.",
      color: "bg-green-50",
    },
    {
      icon: Users2,
      title: "Leadership Skills",
      description: "Formează viitori lideri prin jocuri de rol și proiecte de echipă.",
      color: "bg-purple-50",
    },
    {
      icon: Trophy,
      title: "Teamwork & Collaboration",
      description: "Învață să lucreze eficient în echipă și să rezolve probleme împreună.",
      color: "bg-amber-50",
    },
  ];

  return (
    <section id="dezvoltare" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cursuri de dezvoltare personală
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dincolo de limba engleză, oferim programe care dezvoltă abilități esențiale pentru viață
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border overflow-hidden"
            >
              <div className={`h-2 ${course.color.replace('50', '200')}`} />
              <CardHeader>
                <div className={`w-14 h-14 rounded-full ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <course.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {course.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalDevelopment;
