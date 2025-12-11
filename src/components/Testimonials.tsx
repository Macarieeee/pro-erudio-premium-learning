import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Popescu",
      role: "Părinte",
      text: "Fiica mea a început să vorbească engleza cu încredere după doar 3 luni! Profesorii sunt minunați și atmosfera foarte plăcută.",
      avatar: "👩",
    },
    {
      name: "Andrei Ionescu",
      role: "Student - 16 ani",
      text: "Am reușit să iau certificatul Cambridge B2 datorită pregătirii excelente de aici. Lecțiile sunt interactive și niciodată plictisitoare.",
      avatar: "👨‍🎓",
    },
    {
      name: "Elena Dumitrescu",
      role: "Părinte",
      text: "Tabăra de vară a fost o experiență extraordinară pentru cei doi copii ai mei. Au învățat, s-au distrat și au făcut prieteni noi.",
      avatar: "👩",
    },
    {
      name: "Alexandru Georgescu",
      role: "Adult - Curs Germană",
      text: "Ca adult, mă îngrijoram că va fi dificil să învăț o limbă nouă. Dar abordarea personalizată și ritmul flexibil m-au ajutat enorm.",
      avatar: "👨",
    },
    {
      name: "Cristina Marinescu",
      role: "Părinte",
      text: "Cursurile de dezvoltare personală l-au transformat pe fiul meu. E mult mai încrezător și comunică mai bine cu colegii.",
      avatar: "👩",
    },
    {
      name: "David Popa",
      role: "Student - 12 ani",
      text: "Îmi plac cursurile de dans și de engleză! Profesorii sunt foarte funny și învăț multe lucruri interesante.",
      avatar: "🧑",
    },
  ];

  return (
    <section id="testimoniale" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ce Spun Elevii și Părinții Noștri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback real de la familiile care ne-au ales și au văzut rezultate concrete.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
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