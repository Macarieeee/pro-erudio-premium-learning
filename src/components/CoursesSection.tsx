import { Plane, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import marchantsHillImage from "@/assets/tabara-ProErudio-marchants-hill-2027-cazare-bethany-house.jpg";
import poianaMaruluiImage from "@/assets/poiana-marului/20260716_193314.jpg";

const CoursesSection = () => {
  const camps = [{
    icon: Plane,
    title: "Marchants Hill Activity Centre 2027",
    subtitle: "23–31 iulie 2027 | 11–16 ani | 790 GBP",
    description: "Cursuri de limba engleză, aventură în natură și excursii culturale în sudul Angliei. 9 zile / 8 nopți la centrul PGL din Surrey.",
    color: "bg-primary",
    image: marchantsHillImage,
    imageAlt: "Bethany House la Marchants Hill Activity Centre",
    imagePosition: "50% 100%",
    link: "/tabara-marea-britanie-marchants-hill-2027",
  }, {
    icon: Mountain,
    title: "English Explorers – Poiana Mărului 2027",
    subtitle: "18–23 iulie 2027 | 7–14 ani | 2.380 Lei",
    description: "6 zile de engleză, aventură și prietenii noi la Poiana Mărului Ranch. Ateliere interactive, provocări pe echipe și excursii culturale, cu transport și pensiune completă incluse. Preț promoțional.",
    color: "bg-emerald-500",
    image: poianaMaruluiImage,
    imageAlt: "Participanții taberei Pro Erudio de la Poiana Mărului",
    imagePosition: "50% 65%",
    link: "/tabara-poiana-marului-2027",
  }];

  return (
    <section id="tabere" className="scroll-mt-[104px] py-6 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Tabere 2027
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Alege tabăra potrivită pentru copilul tău. Fiecare program combină învățarea limbii engleze cu activități culturale, sportive, artistice și de divertisment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {camps.map((camp, index) => (
            <div 
              key={index}
              className="overflow-hidden rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={camp.image}
                alt={camp.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-44 md:h-[clamp(140px,22svh,180px)] w-full object-cover"
                style={{ objectPosition: camp.imagePosition }}
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 shrink-0 rounded-lg ${camp.color} flex items-center justify-center`}>
                    <camp.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-foreground">
                    {camp.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground font-semibold mb-2">
                  {camp.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {camp.description}
                </p>
                <Button className="mt-auto self-start rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm" asChild>
                  <Link to={camp.link}>
                    Vezi Detalii
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
