import { Button } from "@/components/ui/button";
import englishTestImage from "@/assets/online test.avif";
import { Link } from "react-router-dom";

const EnglishTestSection = () => {
  return (
    <section className="py-10 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Test de plasare pentru taberele de limba engleză
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
             Te-ai înscris la taberele noastre, dar nu urmezi cursuri la Pro Erudio? 
             Nicio problemă! Cu câteva săptămâni înainte de începerea taberei vei primi în email un test online gratuit pentru a te plasa corect în grupele de limba engleză.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Testul durează aproximativ 15-20 de minute și îți evaluează competențele de
              vocabular, gramatică și exprimare scrisă în limba engleză. Folosirea oricărei surse de informație (internet, prieteni, cărți) este strict interzisă.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Mult succes!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
            >
              {/* <Link to="/test-de-plasare">
                Începe Testul Gratuit
              </Link> */}
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
