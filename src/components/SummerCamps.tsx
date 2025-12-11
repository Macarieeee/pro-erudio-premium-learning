import summerImage from "@/assets/summer-camp.jpg";
import { Button } from "@/components/ui/button";
import { TreePine, Languages, Users, Compass, Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const SummerCamps = () => {
  const features = [
    { icon: TreePine, label: "Activități Outdoor" },
    { icon: Languages, label: "Cursuri de Engleză" },
    { icon: Users, label: "Grupe Internaționale" },
    { icon: Compass, label: "Excursii Culturale" },
  ];

  const benefits = [
    "Grupe organizate pe nivel și vârstă (8-16 ani)",
    "Profesori certificați Cambridge",
    "Pensiune completă și cazare confortabilă",
    "15+ ore de cursuri de engleză pe săptămână",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={summerImage} 
                alt="Tabăra Poiana Mărului 2025" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏕️</span>
                <span className="font-bold">Înscrieri Deschise!</span>
              </div>
            </div>
          </div>
          
          <div>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Tabăra Recomandată 2025
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tabăra Poiana Mărului
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cea mai populară tabără de engleză din România! 7 zile de aventură în munți, 
              cu cursuri interactive, drumeții spectaculoase și amintiri de neuitat.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-secondary rounded-xl p-4"
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-secondary rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Sesiuni Iulie-August 2025</h3>
              </div>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
              asChild
            >
              <Link to="/tabara-poiana-marului-2025">
                Vezi Detalii și Înscrie-te
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerCamps;