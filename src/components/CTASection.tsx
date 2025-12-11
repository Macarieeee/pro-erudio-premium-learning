import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Rezervă Locul la Tabăra 2025!
        </h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
          Locurile sunt limitate! Înscrie-l pe copilul tău acum pentru o experiență educațională de neuitat. 
          Reduceri Early Bird disponibile pentru înscrierile timpurii.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-full shadow-lg"
            asChild
          >
            <Link to="/tabara-poiana-marului-2025">
              <MessageSquare className="w-5 h-5 mr-2" />
              Înscrie-te Acum
            </Link>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-full"
          >
            <Phone className="w-5 h-5 mr-2" />
            Sună: +40 722 123 456
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;