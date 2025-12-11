import { GraduationCap, Users, Sparkles, Shield, Heart, Trophy } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: GraduationCap,
      title: "Profesori Nativi și Certificați",
      description: "Echipa de profesori cu experiență internațională și certificări Cambridge.",
    },
    {
      icon: Shield,
      title: "Siguranță Garantată",
      description: "Supraveghere 24/7, asigurare medicală și protocol strict de siguranță.",
    },
    {
      icon: Sparkles,
      title: "Activități Variate",
      description: "Sporturi, excursii, ateliere creative și seri tematice pentru fiecare zi.",
    },
    {
      icon: Users,
      title: "Grupe Internaționale",
      description: "Socializare cu copii din alte țări pentru practică reală a limbii.",
    },
    {
      icon: Heart,
      title: "Experiențe de Neuitat",
      description: "Amintiri pentru o viață și prietenii care durează dincolo de tabără.",
    },
    {
      icon: Trophy,
      title: "Peste 2000 de Absolvenți",
      description: "14 ani de experiență și mii de copii fericiți care revin an de an.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De Ce Taberele Pro Erudio?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ne diferențiem prin dedicarea pentru fiecare copil și experiența acumulată în organizarea taberelor educaționale.
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