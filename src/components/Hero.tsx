import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-navy/85" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Învață limba engleză<br />cu încredere și bucurie
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in">
          Oferim cursuri de engleză premium pentru copii și adolescenți, într-un mediu modern și prietenos, cu profesori certificați Cambridge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all"
          >
            Vezi cursurile
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-background/10 backdrop-blur-sm text-primary-foreground border-2 border-primary-foreground/50 hover:bg-background/20 font-semibold text-lg px-8"
          >
            Contactează-ne
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
