import { Plane, Mountain, Sun, Snowflake, Backpack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const camps = [
    {
      icon: Plane,
      title: "Tabără de limbă engleză si aventură în Marea Britanie",
      subtitle: "Grosvenor Activity Centre",
      description: "Cursuri de limba engleză, activități de aventură in aer liber (rafting, escalada, scrimă, canotaj, tir cu arcul, etc.), vizite culturale și concursuri în echipe multinaționale.",
      color: "bg-primary",
      link: "/tabara-marea-britanie-grosvenor-hall-2026",
    },
    {
      icon: Backpack,
      title: "Școală internațională de vară în Irlanda de Nord",
      subtitle: "Dublin City University",
      description: "Cursuri de limba engleză la renumita universitate din Dublin. Cazare în campus universitar, excursii la obiective turistice locale, activități sportive și seri tematice în grupuri internaționale.",
      color: "bg-emerald-500",
      link: "/scoala-de-vara-dublin-2026",
    },
    {
      icon: Sun,
      title: "Tabără de limba engleză în România",
      subtitle: "Moinești, Județul Bacău",
      description: "Cursuri de limba engleză dimineața, provocări pe echipe la atelierele de după-amiază și seară, mese cu bufet suedez, cazare în complex turistic nou și excursii la obiective turistice din zonă.",
      color: "bg-amber-500",
      link: "/tabara-moinesti-2026",
    },
    {
      icon: Mountain,
      title: "Tabără de limba engleză în România",
      subtitle: "Poiana Mărului, Județul Brașov",
      description: "Tabără în natură, cursuri de limba engleză, drumeții, provocări în echipe și seri tematice. Perfect pentru copiii care iubesc aventura.",
      color: "bg-sky-500",
      link: "/tabara-poiana-marului-2026",
    },
  ];

  return (
    <section id="tabere" className="py-10 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tipuri de Tabere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alege tabăra potrivită pentru copilul tău. Fiecare program combină învățarea limbii engleze cu activități culturale, sportive, artistice și de divertisment.
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
              <h3 className="text-xl font-bold text-foreground mb-2">
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