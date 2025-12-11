import { Plane, Mountain, Sun, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const camps = [
    {
      icon: Plane,
      title: "Tabere Internaționale UK",
      subtitle: "Londra, Manchester, Cambridge",
      description: "Experiență unică de imersie în cultura britanică. Cursuri de engleză în universități renumite, vizite culturale și activități cu copii din toată lumea.",
      color: "bg-primary",
      link: "/tabara-poiana-marului-2025",
    },
    {
      icon: Mountain,
      title: "Tabere România - Munte",
      subtitle: "Poiana Mărului, Bran, Predeal",
      description: "Tabere în natură cu cursuri de engleză, drumeții, activități sportive și seri tematice. Perfect pentru copiii care iubesc aventura.",
      color: "bg-emerald-500",
      link: "/tabara-poiana-marului-2025",
    },
    {
      icon: Sun,
      title: "Tabere România - Mare",
      subtitle: "Costinești, Eforie",
      description: "Vacanță la mare combinată cu învățarea limbii engleze. Activități pe plajă, sporturi nautice și distracție garantată.",
      color: "bg-amber-500",
      link: "/tabara-poiana-marului-2025",
    },
    {
      icon: Snowflake,
      title: "Tabere de Iarnă",
      subtitle: "Ski & English",
      description: "Învață engleza în timp ce te bucuri de schi și activități de iarnă. Cursuri dimineața, distracție pe pârtie după-amiaza.",
      color: "bg-sky-500",
      link: "/tabara-poiana-marului-2025",
    },
  ];

  return (
    <section id="tabere" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tipuri de Tabere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alege tabăra potrivită pentru copilul tău. Fiecare program combină învățarea limbii engleze cu aventură și distracție.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {camps.map((camp, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${camp.color} flex items-center justify-center mb-6`}>
                <camp.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {camp.title}
              </h3>
              <p className="text-primary font-medium mb-3">
                {camp.subtitle}
              </p>
              <p className="text-muted-foreground mb-6">
                {camp.description}
              </p>
              <Button variant="outline" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                <Link to={camp.link}>
                  Vezi Detalii
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;