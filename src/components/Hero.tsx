import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-primary-foreground text-sm font-medium">
            Tabere de Engleză pentru Copii și Adolescenți
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-2">
          Tabere de Engleză
        </h1>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          <span className="bg-accent text-accent-foreground px-4 py-1 rounded-lg inline-block">
            Pro Erudio
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
          Învață engleza prin aventură! Tabere educaționale în România și internațional, cu activități captivante, profesori dedicați și experiențe de neuitat.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link to="/tabara-poiana-marului-2025">
              <MessageSquare className="w-5 h-5 mr-2" />
              Înscrie-te la Tabără
            </Link>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-full"
            asChild
          >
            <Link to="/despre-noi">
              Descoperă Programele
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;