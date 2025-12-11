import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, CheckCircle, Mountain, XCircle, Percent, FileText, Clipboard, Compass, Building, Wifi, Car, UtensilsCrossed, TreePine, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import summerCampImage from "@/assets/summer-camp.jpg";

interface CampPageProps {
  year: string;
  campName: string;
}

const CampPage = ({ year, campName }: CampPageProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    selectedCamp: `poiana-marului-${year}`,
    childName: "",
    childCity: "",
    childBirthDate: "",
    transport: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    source: "",
    gdprConsent: false,
    termsConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent || !formData.termsConsent) {
      toast({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile pentru a continua.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Formular trimis cu succes!",
      description: "Te vom contacta în curând pentru confirmarea înscrierii.",
    });
    
    // Reset form
    setFormData({
      selectedCamp: `poiana-marului-${year}`,
      childName: "",
      childCity: "",
      childBirthDate: "",
      transport: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      source: "",
      gdprConsent: false,
      termsConsent: false,
    });
  };
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

  const locationDescription = {
    title: "Pensiunea Natura",
    description: "Situată în inima munților, pensiunea oferă un cadru natural spectaculos, perfect pentru activități educaționale și recreative. Camerele sunt confortabile și dotate cu toate facilitățile necesare pentru un sejur plăcut.",
  };

  const locationFacilities = [
    { icon: Wifi, label: "WiFi gratuit" },
    { icon: Car, label: "Parcare gratuită" },
    { icon: UtensilsCrossed, label: "Restaurant" },
    { icon: TreePine, label: "Grădină" },
  ];

  const includedInPrice = [
    "Cazare 6 nopți în camere cu 3-4 paturi",
    "Pensiune completă (3 mese/zi + gustări)",
    "Cursuri de limba engleză (15 ore)",
    "Toate activitățile și excursiile din program",
    "Materiale didactice și certificat de participare",
    "Supraveghere 24/7 de către echipa de animatori",
    "Asigurare medicală pe perioada taberei",
    "Transport local pentru excursii",
  ];

  const notIncludedInPrice = [
    "Transport dus-întors (opțional organizat)",
    "Cheltuieli personale (suveniruri, gustări extra)",
    "Activități opționale contra cost",
    "Excursii extra neplanificate în program",
  ];

  const activitiesDescription = `Activitățile sunt numeroase și foarte variate:

• activități sportive în aer liber și în sala de sport multifuncțională
• ateliere de actorie, fotbal, arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă (ex Treasure Hunt, Bingo) etc
• quiz-uri, vizionări de filme, prezentări de modă, seri tematice etc
• excursii de o jumătate de zi în orașul Dublin (plimbări pietonale, shopping, vizita la Muzeul Național de Istorie, la Grădina Botanică, Parcul St Stephen's Green etc)
• o excursie de o zi întreagă (posibil la Dún Laoghaire and Bray, două orășele pe coastă, mai sus de Dublin sau Howth, un sat pescăresc din secolul al XIV-lea).`;

  const registrationInfo = {
    steps: [
      "Completarea formularului de înscriere online sau fizic",
      "Achitarea avansului de 30% din tarif",
      "Trimiterea documentelor necesare",
      "Confirmarea locului prin email",
    ],
    contact: {
      phone: "+40 722 123 456",
      email: "inscrieri@proerudio.ro",
    },
  };

  const requiredDocuments = [
    "Copie act identitate copil (certificat naștere/CI)",
    "Copie CI părinte/tutore legal",
    "Adeverință medicală de la medicul de familie",
    "Fișa medicală completată",
    "Acord parental semnat",
    "Declarație pe proprie răspundere",
  ];

  const discounts = [
    { type: "Early Bird", value: "10%", condition: "Pentru înscrieri până la 31 martie" },
    { type: "Frați/Surori", value: "15%", condition: "Al doilea copil din familie" },
    { type: "Fidele", value: "10%", condition: "Participanți din edițiile anterioare" },
    { type: "Grup", value: "5%", condition: "Grupuri de minim 5 copii" },
  ];

  const otherCamps = [
    { name: "Tabăra UK - Londra", location: "Londra, UK", type: "Internațională" },
    { name: "Tabăra Marea Neagră", location: "Costinești", type: "Vacanță" },
    { name: "Tabăra de Iarnă", location: "Predeal", type: "Schi & Engleză" },
    { name: "Tabăra de Paște", location: "Bran", type: "Tematică" },
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

      {/* Location Description */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Mountain className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Descrierea Locației
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{locationDescription.title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {locationDescription.description}
              </p>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Facilități</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {locationFacilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <facility.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-foreground">{facility.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={summerCampImage} 
                alt="Locația taberei"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ce include tariful / Ce nu include */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-7 w-7 text-accent" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Ce Include Tariful
                </h2>
              </div>
              <div className="space-y-3">
                {includedInPrice.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="h-7 w-7 text-destructive" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Ce Nu Include Tariful
                </h2>
              </div>
              <div className="space-y-3">
                {notIncludedInPrice.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program de excursii și activități */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Compass className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Program de Excursii și Activități
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {activitiesDescription}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={summerCampImage} 
                alt="Activități și excursii"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Înscrieri și rezervări */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Clipboard className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Înscrieri și Rezervări
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Pași pentru Înscriere</h3>
                <div className="space-y-4">
                  {registrationInfo.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Contact Înscrieri</h3>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-semibold text-foreground">{registrationInfo.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{registrationInfo.contact.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documente necesare */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Documente Necesare Înscrierii
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reduceri */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Percent className="h-8 w-8 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Reduceri Disponibile
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {discounts.map((discount, index) => (
              <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <span className="text-4xl font-bold text-accent">{discount.value}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{discount.type}</h3>
                  <p className="text-sm text-muted-foreground">{discount.condition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Orientativ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Program Orientativ
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={summerCampImage} 
                alt="Program orientativ"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Alte tabere */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Building className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Alte Tabere Organizate de Pro Erudio
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {otherCamps.map((camp, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={summerCampImage} 
                    alt={camp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-4 text-center">
                  <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {camp.type}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {camp.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {camp.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Formular de Înscriere
              </h2>
              <p className="text-primary-foreground/80">
                Completează formularul pentru a rezerva un loc la {campName} {year}
              </p>
            </div>
            
            <Card className="bg-card border-0 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Camp Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="camp" className="text-foreground font-medium">Tabăra selectată</Label>
                    <Select value={formData.selectedCamp} onValueChange={(value) => setFormData({...formData, selectedCamp: value})}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Selectează tabăra" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poiana-marului-2023">Tabăra Poiana Mărului 2023</SelectItem>
                        <SelectItem value="poiana-marului-2024">Tabăra Poiana Mărului 2024</SelectItem>
                        <SelectItem value="poiana-marului-2025">Tabăra Poiana Mărului 2025</SelectItem>
                        <SelectItem value="poiana-marului-2026">Tabăra Poiana Mărului 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Child Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                      Date despre cursant
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childName" className="text-foreground">Numele și prenumele *</Label>
                        <Input 
                          id="childName"
                          placeholder="Numele complet al copilului"
                          value={formData.childName}
                          onChange={(e) => setFormData({...formData, childName: e.target.value})}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childCity" className="text-foreground">Localitatea de domiciliu *</Label>
                        <Input 
                          id="childCity"
                          placeholder="Orașul/Comuna"
                          value={formData.childCity}
                          onChange={(e) => setFormData({...formData, childCity: e.target.value})}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childBirthDate" className="text-foreground">Data nașterii *</Label>
                      <Input 
                        id="childBirthDate"
                        type="date"
                        value={formData.childBirthDate}
                        onChange={(e) => setFormData({...formData, childBirthDate: e.target.value})}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Transport Option */}
                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">Doriți opțiunea de transport până în locație?</Label>
                    <RadioGroup 
                      value={formData.transport} 
                      onValueChange={(value) => setFormData({...formData, transport: value})}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="da" id="transport-da" />
                        <Label htmlFor="transport-da" className="text-foreground cursor-pointer">Da</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nu" id="transport-nu" />
                        <Label htmlFor="transport-nu" className="text-foreground cursor-pointer">Nu</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Parent Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                      Date despre părinte/tutore
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="parentName" className="text-foreground">Numele și prenumele *</Label>
                      <Input 
                        id="parentName"
                        placeholder="Numele complet al părintelui"
                        value={formData.parentName}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone" className="text-foreground">Telefon *</Label>
                        <Input 
                          id="parentPhone"
                          type="tel"
                          placeholder="07XX XXX XXX"
                          value={formData.parentPhone}
                          onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentEmail" className="text-foreground">Email *</Label>
                        <Input 
                          id="parentEmail"
                          type="email"
                          placeholder="email@exemplu.ro"
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                  </div>

                  {/* How did you hear */}
                  <div className="space-y-2">
                    <Label htmlFor="source" className="text-foreground font-medium">Cum ați aflat de taberele noastre?</Label>
                    <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Selectează o opțiune" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="google">Căutare Google</SelectItem>
                        <SelectItem value="recomandare">Recomandare prieten</SelectItem>
                        <SelectItem value="participant-anterior">Am participat anterior</SelectItem>
                        <SelectItem value="altele">Altele</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="gdpr"
                        checked={formData.gdprConsent}
                        onCheckedChange={(checked) => setFormData({...formData, gdprConsent: checked as boolean})}
                        required
                      />
                      <Label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        Am înțeles și sunt de acord cu <span className="text-primary font-medium">declarația de consimțământ</span> privind procesarea datelor personale în scopurile descrise. *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="terms"
                        checked={formData.termsConsent}
                        onCheckedChange={(checked) => setFormData({...formData, termsConsent: checked as boolean})}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        Am citit și sunt de acord cu <span className="text-primary font-medium">regulamentul de funcționare</span> al taberei. *
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Trimite Formularul de Înscriere
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampPage;
