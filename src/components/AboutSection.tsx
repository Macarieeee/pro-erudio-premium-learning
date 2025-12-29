import { Heart, Users, Gamepad2, Award, Globe, Landmark, BrainCog, Waypoints, Handshake } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Waypoints,
      title: "Programe de vară pentru copii și adolescenți",
      description: "Experiențe în România, UK și alte destinații pentru perfecționarea abilităților de exprimare în limba engleză.",
    },
    {
      icon: Handshake,
      title: "Lucru în echipă",
      description: "Obiectivul principal al taberelor din România este îmbunătățirea abilităților de lucru în echipă pentru toți copiii și leadership pentru conducătorii de echipă.",
    },
    {
      icon: BrainCog,
      title: "Învățare prin Joc",
      description: "Activitățile din tabără sunt interactive și în general bazate pe competiția între echipe, într-o întrecere de tipul Harry Potter, care facilitează dezvoltarea personală într-o atmosferă dinamică, dar relaxată, fară a pune presiune pe participanți.",
    },
    {
      icon: Landmark,
      title: "Excursii și intrări la obiective turistice",
      description: "Toate programele noastre de vară cuprind o importantă coordonată culturală prin vizite la diferite obiective turistice din zona în care ne aflăm.",
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
            Din 2011 organizăm tabere de limbă engleză care combină educația cu distracția. 
            Copiii își perfecționează limba engleză în mod natural prin conversații reale, activități captivante, lucru în echipă și experiențe culturale autentice.
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