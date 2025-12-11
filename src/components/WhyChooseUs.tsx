import { GraduationCap, Users, Sparkles, LineChart, Heart, Trophy } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: GraduationCap,
      title: "Profesori Experimentați și Prietenoși",
      description: "Echipa noastră de pedagogi pasionați face fiecare lecție captivantă și eficientă.",
    },
    {
      icon: Users,
      title: "Grupe Mici de Învățare",
      description: "Maximum 8 elevi per clasă pentru atenție individualizată și progres rapid.",
    },
    {
      icon: Sparkles,
      title: "Lecții Interactive și Moderne",
      description: "Folosim tehnologie, jocuri și activități practice pentru o învățare plăcută.",
    },
    {
      icon: LineChart,
      title: "Urmărire Personalizată a Progresului",
      description: "Evaluări regulate și feedback detaliat pentru părinți și elevi.",
    },
    {
      icon: Heart,
      title: "Atmosferă Pozitivă și Creativă",
      description: "Mediu sigur și încurajator unde fiecare copil se simte valorizat.",
    },
    {
      icon: Trophy,
      title: "Rezultate Dovedite",
      description: "Sute de absolvenți cu certificări internaționale și progres măsurabil.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De Ce Să Ne Alegi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ne diferențiem prin dedicarea noastră pentru succesul fiecărui elev și abordarea holistică a educației.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;