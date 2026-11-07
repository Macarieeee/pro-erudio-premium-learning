import { Plane, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const camps = [{
    icon: Plane,
    title: "Marchants Hill Activity Centre 2027",
    subtitle: "23–31 iulie 2027 | 11–16 ani | 790 GBP",
    description: "Cursuri de limba engleză, aventură în natură și excursii culturale în sudul Angliei. 9 zile / 8 nopți la centrul PGL din Surrey.",
    color: "bg-primary",
    link: "/tabara-marea-britanie-marchants-hill-2027",
  }, {
    icon: Mountain,
    title: "English Explorers – Poiana Mărului 2027",
    subtitle: "18–23 iulie 2027 | 7–14 ani | 2.380 Lei",
    description: "6 zile de engleză, aventură și prietenii noi la Poiana Mărului Ranch. Ateliere interactive, provocări pe echipe și excursii culturale, cu transport și pensiune completă incluse. Preț promoțional.",
    color: "bg-emerald-500",
    link: "/tabara-poiana-marului-2027",
  }];

  return (
    <section id="tabere" className="py-10 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tabere 2027
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alege tabăra potrivită pentru copilul tău. Fiecare program combină învățarea limbii engleze cu activități culturale, sportive, artistice și de divertisment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
