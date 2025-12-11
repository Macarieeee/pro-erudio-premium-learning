import { Heart, Users, Gamepad2, Award } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Pasiune pentru Educație",
      description: "Profesorii noștri pasionați creează un mediu cald și inspirațional pentru fiecare elev.",
    },
    {
      icon: Users,
      title: "Grupe Mici",
      description: "Maximum 8 elevi per clasă pentru atenție personalizată și progres rapid.",
    },
    {
      icon: Gamepad2,
      title: "Metode Interactive",
      description: "Lecții captivante prin jocuri, conversații și activități practice.",
    },
    {
      icon: Award,
      title: "Rezultate Măsurabile",
      description: "Urmărim progresul fiecărui elev și certificăm competențele dobândite.",
    },
  ];

  return (
    <section id="despre" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Despre Noi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            De peste 15 ani, construim fundații solide pentru viitorul elevilor noștri. Credem în puterea educației personalizate, în bucuria învățării și în dezvoltarea completă a fiecărui copil - academic, emoțional și social.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;