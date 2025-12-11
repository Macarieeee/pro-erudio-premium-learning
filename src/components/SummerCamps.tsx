import summerImage from "@/assets/summer-camp.jpg";
import { Button } from "@/components/ui/button";
import { TreePine, Languages, Users, Compass, Check, Calendar } from "lucide-react";

const SummerCamps = () => {
  const features = [
    { icon: TreePine, label: "Activități Outdoor" },
    { icon: Languages, label: "Imersiune Lingvistică" },
    { icon: Users, label: "Teambuilding" },
    { icon: Compass, label: "Experiențe Culturale" },
  ];

  const benefits = [
    "Grupe organizate pe vârstă (7-14 ani)",
    "Instructori certificați și animatori",
    "Masă completă și cazare confortabilă",
    "Lecții de engleză zilnice în format distractiv",
  ];

  return (
    <section id="tabere" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={summerImage} 
                alt="Tabere de vară" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏕️</span>
                <span className="font-bold">Tabere 2025</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tabere de Vară & Evenimente
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vacanțe de neuitat unde învățarea se îmbină cu aventura! Elevii noștri participă la tabere educaționale interactive cu focus pe limbi străine, teamwork și activități în aer liber.
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
                <h3 className="font-bold text-foreground">Sesiuni Disponibile</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Iulie - August 2025 | Diferite locații în România
              </p>
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
            >
              Rezervă Loc la Tabără
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerCamps;