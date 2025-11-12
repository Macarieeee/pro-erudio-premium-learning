import { Award, TrendingUp, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: "Profesori certificați Cambridge",
      description: "Echipa noastră este formată din profesori cu certificări internaționale și experiență vastă în predarea limbii engleze.",
    },
    {
      icon: TrendingUp,
      title: "Rezultate excepționale",
      description: "95% dintre elevii noștri promovează examenele Cambridge cu rezultate peste medie. Succesul lor este și succesul nostru.",
    },
    {
      icon: Heart,
      title: "Mediu modern și prietenos",
      description: "Săli de clasă dotate modern, materiale interactive și o atmosferă caldă care încurajează învățarea prin bucurie.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De ce să ne alegi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiență, profesionalism și dedicare pentru fiecare elev
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-xl border border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-light-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
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
