import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Star, CheckCircle, XCircle, Mail, Phone, FileText, Percent } from "lucide-react";
import summerCampImage from "@/assets/summer-camp.jpg";
import { Link } from "react-router-dom";

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
    price: "1.200",
    accommodation: "Pensiune cu camere duble și baie proprie",
  };

  const tarifInclude = [
    "Cazare în pensiune",
    "Pensiune completă (3 mese pe zi + gustări)",
    "15 lecții de engleză pe săptămână în grupuri internaționale, cu profesori vorbitori nativi",
    "Test inițial de evaluare",
    "Materiale de studiu",
    "Certificate de absolvire a cursurilor",
    "Program zilnic de activități comune",
    "Program zilnic tematic",
    "Excursii (două excursii de jumătate de zi și una de o zi întreagă)",
    "Un însoțitor de grup de la Pro Erudio la 10 copii",
    "Transport local pentru excursii",
  ];

  const tarifNuInclude = [
    "Transport personal până la locația taberei",
    "Asigurare storno (opțional) și de călătorie",
    "Cheltuieli personale (suveniruri, gustări suplimentare)",
  ];

  const excursiiActivitati = [
    { zi: "Ziua 2", activitate: "Excursie la Cetatea Râșnov" },
    { zi: "Ziua 3", activitate: "Drumeție în munți + picnic" },
    { zi: "Ziua 4", activitate: "Vizită la Castelul Bran" },
    { zi: "Ziua 5", activitate: "Activități sportive și jocuri în echipă" },
    { zi: "Ziua 6", activitate: "Excursie de o zi întreagă la Brașov" },
  ];

  const documenteNecesare = [
    "Formularul de înscriere completat",
    "Copie după certificatul de naștere sau carte de identitate",
    "Adeverință medicală de la medicul de familie",
    "Declarație parentală pentru participare",
    "Avans de 300 euro la înscriere",
  ];

  const reduceri = [
    "5% pentru continuitate (doar pentru copiii care au participat la programul de tabără din vara precedentă)",
    "5% pentru doi copii ai aceleiași familii",
    "10% pentru înscrierea până la 31 martie",
  ];

  const programOrientativ = [
    { time: "08:00", activities: ["Trezire", "Mic dejun", "Mic dejun", "Mic dejun", "Mic dejun", "Mic dejun", "Mic dejun"] },
    { time: "09:30-12:30", activities: ["Sosire", "Lecții engleză", "Lecții engleză", "Lecții engleză", "Lecții engleză", "Lecții engleză", "Excursie Brașov"] },
    { time: "13:00-14:00", activities: ["Instalare", "Prânz", "Prânz", "Prânz", "Prânz", "Prânz", "Prânz în oraș"] },
    { time: "14:00-18:00", activities: ["Cunoaștere", "Excursie Râșnov", "Drumeție", "Castelul Bran", "Jocuri echipă", "Activități creative", "Vizită centru"] },
    { time: "18:00-19:00", activities: ["Cină", "Cină", "Cină", "Cină", "Cină", "Cină", "Cină"] },
    { time: "19:30-22:00", activities: ["Seară cunoaștere", "Disco", "Foc tabără", "Film Night", "Quiz Night", "Seară talent", "Ceremonie final"] },
  ];

  const alteTabere = [
    { name: "Tabăra UK - Oxford", year: "2024", link: "/tabara-uk-2024" },
    { name: "Tabăra Marea Neagră", year: "2024", link: "/tabara-marea-neagra-2024" },
    { name: "Tabăra Dublin", year: "2024", link: "/tabara-dublin-2024" },
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

  const days = ["Ziua 1", "Ziua 2", "Ziua 3", "Ziua 4", "Ziua 5", "Ziua 6", "Ziua 7"];

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
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {campName} {year}
              </h1>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-primary text-lg font-semibold">EURO</span>
                <span className="text-5xl md:text-7xl font-bold text-primary">{campDetails.price}</span>
                <span className="text-muted-foreground text-lg">/participant</span>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {campDetails.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Perioada</p>
              <p className="font-semibold text-foreground">{campDetails.dates}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vârstă recomandată</p>
              <p className="font-semibold text-foreground">{campDetails.ageGroup}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durată</p>
              <p className="font-semibold text-foreground">{campDetails.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cazare</p>
              <p className="font-semibold text-foreground">{campDetails.accommodation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Descriere Generală */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Descriere Generală
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Poiana Mărului este o zonă de o frumusețe naturală deosebită, situată în inima munților 
              Făgăraș, la aproximativ 1.000 de metri altitudine. Această destinație oferă cadrul perfect 
              pentru o tabără de vară, combinând aerul curat de munte cu peisaje spectaculoase și 
              posibilități nelimitate de explorare.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Tabăra noastră oferă copiilor o experiență unică de învățare a limbii engleze 
              într-un cadru natural spectaculos. Programul nostru combină sesiuni interactive de 
              engleză cu activități outdoor captivante, creând un mediu perfect pentru dezvoltarea 
              limbajului și a abilităților sociale.
            </p>
          </div>
        </div>
      </section>

      {/* Descrierea Locației */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Locația
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Pensiunea noastră parteneră este situată în centrul localității Poiana Mărului, 
              oferind condiții excelente de cazare și masă. Clădirea dispune de camere moderne, 
              spații comune generoase și facilități adaptate pentru programele de tabără.
            </p>
            <img 
              src={summerCampImage} 
              alt="Locația taberei"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
            />
            <h3 className="text-2xl font-bold text-foreground mb-4">Facilități</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Camere duble cu baie proprie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Sală de mese cu capacitate mare
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Sală de activități indoor
                </li>
              </ul>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Teren de sport exterior
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Zonă de foc de tabără
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Wi-Fi gratuit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tariful Include */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {campName} – Tariful include:
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              {tarifInclude.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tariful Nu Include */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {campName} – Tariful nu include:
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              {tarifNuInclude.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Program de excursii și activități */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Program de excursii și activități
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {excursiiActivitati.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <span className="font-bold text-primary min-w-[80px]">{item.zi}</span>
                  <span className="text-foreground">{item.activitate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Înscrieri și rezervări */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Înscrieri și rezervări
          </h2>
          <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg border border-border">
            <p className="text-foreground mb-6 leading-relaxed">
              Pentru rezervări vă rugăm să <strong>completați formularul din partea de sus a paginii</strong> sau 
              să ne trimiteți un email la{" "}
              <a href="mailto:office@proerudio.ro" className="text-primary hover:underline font-semibold">
                office@proerudio.ro
              </a>.
            </p>
            <p className="text-foreground mb-6 leading-relaxed">
              După confirmarea înscrierii, veți fi contactat pentru achitarea avansului de 300 euro. 
              Diferența până la prețul final al taberei se achită în alte două tranșe, una în martie 
              și una în mai.
            </p>
            <div className="flex items-center gap-3 text-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <span>Pentru alte informații, contactați-ne la telefon: </span>
              <strong>0724 527 838 (Roxana Popescu)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Documente necesare înscrierii */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Documente necesare înscrierii
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              {documenteNecesare.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reduceri */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Reduceri
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              {reduceri.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <Percent className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Program Orientativ */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Program orientativ
          </h2>
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground p-3 text-left font-semibold border border-border">
                    Ora
                  </th>
                  {days.map((day, index) => (
                    <th key={index} className="bg-primary text-primary-foreground p-3 text-center font-semibold border border-border">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programOrientativ.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                    <td className="p-3 border border-border font-semibold text-foreground">
                      {row.time}
                    </td>
                    {row.activities.map((activity, actIndex) => (
                      <td key={actIndex} className="p-3 border border-border text-center text-muted-foreground">
                        {activity}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30">
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

      {/* Alte tabere organizate de Pro Erudio */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Alte tabere organizate de Pro Erudio
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {alteTabere.map((tabara, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={summerCampImage} 
                    alt={tabara.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-foreground mb-2">{tabara.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tabara.year}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={tabara.link}>Vezi detalii</Link>
                  </Button>
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
