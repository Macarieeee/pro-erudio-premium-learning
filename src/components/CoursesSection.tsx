import { BookOpen, Globe, Lightbulb, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const CoursesSection = () => {
  const courses = [
    {
      icon: BookOpen,
      title: "Limba Engleză",
      subtitle: "Pentru Copii, Adolescenți & Adulți",
      description: "Cursuri adaptate fiecărei vârste, de la primii pași până la nivel avansat. Pregătire pentru examene Cambridge, conversație, gramatică și vocabular.",
      color: "bg-primary",
    },
    {
      icon: Globe,
      title: "Germană & Franceză",
      subtitle: "Deschide Noi Orizonturi",
      description: "Învață limbi străine cu profesori nativi sau certificați. Programe pentru începători și avansați, focus pe conversație și cultură.",
      color: "bg-emerald-500",
    },
    {
      icon: Lightbulb,
      title: "Dezvoltare Personală",
      subtitle: "Workshops Interactive",
      description: "Gândire critică, încredere în sine, public speaking, leadership pentru copii și adolescenți. Construiește competențe pentru viață.",
      color: "bg-violet-500",
    },
    {
      icon: Music,
      title: "Dans & Creativitate",
      subtitle: "Mișcare și Expresie",
      description: "Cursuri de dans pentru copii: modern, hip-hop, balet. Dezvoltă coordonarea, ritmul și creativitatea într-un cadru distractiv.",
      color: "bg-rose-500",
    },
  ];

  return (
    <section id="cursuri" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cursurile Noastre
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programe diverse pentru toate vârstele și interesele. Alege cursul potrivit pentru tine sau copilul tău.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${course.color} flex items-center justify-center mb-6`}>
                <course.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {course.title}
              </h3>
              <p className="text-primary font-medium mb-3">
                {course.subtitle}
              </p>
              <p className="text-muted-foreground mb-6">
                {course.description}
              </p>
              <Button variant="outline" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Află mai mult
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;