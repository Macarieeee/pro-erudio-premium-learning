import { Heart, Users, Gamepad2, Award, Globe, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Tabere Internaționale",
      description: "Experiențe în UK, Irlanda și alte destinații pentru imersie totală în limba engleză.",
    },
    {
      icon: Users,
      title: "Grupe Mici",
      description: "Maximum 15 copii per grupă pentru atenție personalizată și siguranță maximă.",
    },
    {
      icon: Gamepad2,
      title: "Învățare prin Joc",
      description: "Activități interactive, excursii și jocuri care fac învățatul distractiv.",
    },
    {
      icon: Shield,
      title: "Siguranță 24/7",
      description: "Supraveghere permanentă și echipă de animatori experimentați.",
    },
  ];

  return (
    <section id="despre" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Despre Taberele Noastre
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            De peste 14 ani, organizăm tabere de limbă engleză care combină educația cu aventura. 
            Copiii învață engleza natural, prin conversații reale, activități captivante și experiențe culturale autentice.
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