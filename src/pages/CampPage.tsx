import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Star, CheckCircle } from "lucide-react";
import summerCampImage from "@/assets/summer-camp.jpg";

interface CampPageProps {
  year: string;
  campName: string;
}

const CampPage = ({ year, campName }: CampPageProps) => {
  const campDetails = {
    location: "Poiana Mărului, Brașov",
    duration: "7 zile / 6 nopți",
    ageGroup: "8-16 ani",
    dates: `15-22 Iulie ${year}`,
  };

  const highlights = [
    "Cursuri intensive de limba engleză",
    "Activități outdoor și drumeții",
    "Jocuri și competiții în echipă",
    "Seri tematice și foc de tabără",
    "Ateliere creative și artistice",
    "Excursii în natură",
  ];

  const schedule = [
    { time: "08:00", activity: "Trezire și mic dejun" },
    { time: "09:30", activity: "Sesiune de engleză (interactiv)" },
    { time: "12:30", activity: "Prânz și relaxare" },
    { time: "14:30", activity: "Activități outdoor" },
    { time: "18:00", activity: "Cină" },
    { time: "19:30", activity: "Activități de seară" },
    { time: "22:00", activity: "Ora de somn" },
  ];

  const testimonials = [
    {
      name: "Maria P.",
      role: "Părinte",
      text: "Copilul meu a revenit de la tabără plin de energie și cu o pasiune reînnoită pentru limba engleză!",
    },
    {
      name: "Andrei C.",
      role: `Participant ${year}`,
      text: "Cea mai tare experiență! Am făcut prieteni noi și am învățat engleză fără să simt.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="h-[60vh] relative overflow-hidden">
          <img 
            src={summerCampImage} 
            alt={`${campName} ${year}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="container mx-auto">
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {year}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {campName}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                O aventură educațională de neuitat în inima naturii
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Locație</p>
                <p className="font-semibold text-foreground">{campDetails.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Durată</p>
                <p className="font-semibold text-foreground">{campDetails.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vârstă</p>
                <p className="font-semibold text-foreground">{campDetails.ageGroup}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Perioada</p>
                <p className="font-semibold text-foreground">{campDetails.dates}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Despre Tabără
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tabăra Poiana Mărului oferă copiilor o experiență unică de învățare a limbii engleze 
                într-un cadru natural spectaculos. Programul nostru combină sesiuni interactive de 
                engleză cu activități outdoor captivante, creând un mediu perfect pentru dezvoltarea 
                limbajului și a abilităților sociale.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sub îndrumarea profesorilor noștri experimentați și a animatorilor dedicați, copiii 
                vor descoperi bucuria învățării prin joc, vor face prieteni noi și vor crea amintiri 
                de neuitat.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Ce Include Tabăra
              </h3>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Program Zilnic
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-6 p-4 bg-background rounded-lg shadow-sm"
                >
                  <span className="text-lg font-bold text-primary min-w-[60px]">
                    {item.time}
                  </span>
                  <span className="text-foreground">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Experiențe din Tabără
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Rezervă Locul Acum
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Locurile sunt limitate! Asigură-ți loc pentru o experiență de neuitat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
            >
              Înscrie-te Acum
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8"
            >
              Contactează-ne
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampPage;
