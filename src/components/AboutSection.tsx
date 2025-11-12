import aboutImage from "@/assets/about-classroom.jpg";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Despre noi
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Pro Erudio este o școală de limbi străine dedicată oferind cursuri premium de engleză pentru copii și adolescenți. Cu peste 15 ani de experiență în domeniul educațional, ne-am construit reputația pe rezultate remarcabile și o abordare centrată pe nevoile fiecărui elev.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Misiunea noastră este să inspirăm copiii să învețe cu plăcere și încredere, în medii moderne și prietenoase. Folosim metode interactive, materiale Cambridge de ultimă generație și tehnologie educațională avansată.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Valorile noastre includ excelența academică, respectul pentru fiecare elev, inovația în predare și dezvoltarea abilităților sociale și personale alături de competențele lingvistice.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Descoperă mai multe
            </Button>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img 
                src={aboutImage} 
                alt="Classroom at Pro Erudio" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
