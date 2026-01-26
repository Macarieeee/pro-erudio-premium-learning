import { BookOpenCheck, Users, Sparkles, SwatchBook, Heart, Handshake } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: BookOpenCheck,
      title: "Cursuri de limbă engleză",
      description: "Ținem cont de nivelul de limbă engleză si vârsta copiilor atunci când facem plasarea in grupe. Adaptăm activitățile în funcție de nevoile lor de învățare și interesele vârstei.",
    },
    {
      icon: SwatchBook,
      title: "Ateliere de după-amiază",
      description: "Atelierele din timpul după-amiezii se desfășoară în echipe eterogene ca vârstă, având obiectivul de a îmbunătăți abilitățile de comunicare prin participarea la realizarea de proiecte și activități practice.",
    },
    {
      icon: Sparkles,
      title: "Activități variate",
      description: "Cursuri de limba engleză, activități sportive, excursii, ateliere creative, provocări pe echipe și seri tematice pentru fiecare zi.",
    },
    {
      icon: Users,
      title: "Prieteni noi",
      description: "Socializare cu copii din alte țări sau alți elevi români pentru exersarea limbii engleze în contexte autentice de învățare prin proiecte si activități în echipe. Legarea de noi prietenii este in acest fel garantată.",
    },
    {
      icon: Heart,
      title: "Experiențe de neuitat",
      description: "Amintiri pentru o viață și prietenii care durează dincolo de tabără. Fiecare tabără este o aventură unică care îmbină învățarea cu distracția.",
    },
     {
      icon: Handshake,
      title: "Lucrul în echipă",
      description: "Obiectivul principal al taberelor din România este îmbunătățirea abilităților de lucru în echipă pentru toți copiii și leadership pentru conducătorii de echipă.",
    },
    
  ];

  return (
    <section className="py-10 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De ce taberele Pro Erudio?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ne diferențiem prin atenția acordată fiecărui copil și formatul original al taberelor, cu obiective educaționale precise.
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