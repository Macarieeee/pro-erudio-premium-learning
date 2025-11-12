import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Popescu",
      role: "Mamă - elev nivel Intermediate",
      text: "Fiul meu a progresat incredibil de mult de când a început cursurile la Pro Erudio. Profesorii sunt dedicați și știu să facă lecțiile interesante. Recomand cu încredere!",
      rating: 5,
    },
    {
      name: "Andrei Ionescu",
      role: "Tată - elev nivel Advanced",
      text: "Fiica mea a promovat cu succes examenul Cambridge FCE datorită pregătirii profesioniste de la Pro Erudio. Atmosfera este prietenoasă și motivantă.",
      rating: 5,
    },
    {
      name: "Elena Dumitrescu",
      role: "Mamă - elev nivel Beginner",
      text: "Cea mai bună decizie a fost să îl înscriu la Pro Erudio. Copilul meu adoră profesorii și abia așteaptă să meargă la cursuri. Îi mulțumesc întregii echipe!",
      rating: 5,
    },
    {
      name: "Cristina Marinescu",
      role: "Mamă - participant tabără de vară",
      text: "Tabăra de vară din UK a fost o experiență de neuitat pentru copilul meu. A revenit cu amintiri frumoase și mult mai sigur pe abilitățile sale de comunicare în engleză.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Testimoniale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ce spun părinții și elevii noștri despre experiența lor
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
