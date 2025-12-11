import { Button } from "@/components/ui/button";
import englishTestImage from "@/assets/Placement-Test.webp";

const EnglishTestSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Test de Amplasament Nivel Engleză
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Înainte de tabără, descoperă nivelul de engleză al copilului tău cu testul nostru gratuit. 
              Acest test ne ajută să-l plasăm în grupa potrivită pentru o experiență de învățare optimă.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Testul durează aproximativ 15-20 de minute și evaluează competențele de 
              vocabular, gramatică și înțelegere. La final, vei primi o recomandare 
              personalizată pentru tabăra și grupa potrivită.
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
            >
              Începe Testul Gratuit
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={englishTestImage} 
              alt="Test de amplasament nivel engleză"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnglishTestSection;
