import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, BookOpen, Heart, Globe, Target, CheckCircle, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import aboutClassroomImage from "@/assets/about-classroom.jpg";
import summerCampImage from "@/assets/summer-camp.jpg";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Maria Popescu",
      role: "Director & Fondator",
      description: "Cu peste 15 ani de experiență în educație și o pasiune pentru limbile străine.",
      image: summerCampImage,
    },
    {
      name: "Andrei Ionescu",
      role: "Coordonator Tabere",
      description: "Specialist în organizarea taberelor educaționale și activități pentru copii.",
      image: summerCampImage,
    },
    {
      name: "Elena Dumitrescu",
      role: "Profesor Principal Engleză",
      description: "Certificată Cambridge, cu experiență în predarea limbii engleze la toate nivelurile.",
      image: summerCampImage,
    },
    {
      name: "Alexandru Radu",
      role: "Coordonator Activități",
      description: "Animator profesionist cu certificări în educație non-formală.",
      image: summerCampImage,
    },
    {
      name: "Cristina Munteanu",
      role: "Profesor Engleză",
      description: "Specializată în predarea limbii engleze pentru copii și adolescenți.",
      image: summerCampImage,
    },
    {
      name: "Dan Georgescu",
      role: "Animator",
      description: "Expert în activități recreative și jocuri educative pentru toate vârstele.",
      image: summerCampImage,
    },
    {
      name: "Ioana Stanciu",
      role: "Profesor Engleză",
      description: "Cu experiență în pregătirea pentru examenele Cambridge și IELTS.",
      image: summerCampImage,
    },
    {
      name: "Mihai Popa",
      role: "Coordonator Sport",
      description: "Profesor de educație fizică cu pasiune pentru activitățile outdoor.",
      image: summerCampImage,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Pasiune pentru Educație",
      description: "Credem că învățarea trebuie să fie o experiență plăcută și memorabilă.",
    },
    {
      icon: Users,
      title: "Comunitate",
      description: "Construim legături durabile între copii, părinți și educatori.",
    },
    {
      icon: Award,
      title: "Excelență",
      description: "Ne străduim să oferim cele mai înalte standarde în tot ceea ce facem.",
    },
    {
      icon: Globe,
      title: "Deschidere",
      description: "Promovăm diversitatea culturală și înțelegerea internațională.",
    },
  ];

  const milestones = [
    { year: "2010", event: "Fondarea Pro Erudio" },
    { year: "2012", event: "Prima tabără internațională în UK" },
    { year: "2015", event: "Peste 500 de copii participanți" },
    { year: "2018", event: "Extinderea programelor în toată România" },
    { year: "2020", event: "Adaptarea programelor online" },
    { year: "2023", event: "Peste 2000 de absolvenți ai taberelor" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="h-[50vh] relative overflow-hidden">
          <img 
            src={aboutClassroomImage} 
            alt="Despre Pro Erudio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="container mx-auto">
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Despre Noi
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Pro Erudio
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Educație prin experiență de peste 14 ani
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Misiunea Noastră
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pro Erudio a fost fondată cu convingerea că învățarea unei limbi străine trebuie să fie 
                o aventură captivantă, nu o corvoadă. De peste un deceniu, organizăm tabere educaționale 
                care combină studiul limbii engleze cu activități creative, sportive și culturale.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Misiunea noastră este să oferim copiilor și tinerilor oportunitatea de a învăța engleză 
                într-un mediu stimulant, sigur și prietenos, unde pot să își dezvolte nu doar abilitățile 
                lingvistice, ci și încrederea în sine, creativitatea și abilitățile sociale.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Profesori calificați și dedicați</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Metode interactive de învățare</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Locații sigure și bine echipate</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={summerCampImage} 
                alt="Misiunea Pro Erudio"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Valorile Noastre
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Principiile care ne ghidează în tot ceea ce facem
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Povestea Noastră
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Momente importante din istoria Pro Erudio
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-6">
                  <span className="text-2xl font-bold text-primary min-w-[80px]">
                    {milestone.year}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-foreground text-lg">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Echipa Noastră
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oamenii dedicați care fac totul posibil
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                  <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90" />
              <CarouselNext className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contactează-ne
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Ai întrebări despre programele noastre? Suntem aici să te ajutăm! 
                Nu ezita să ne contactezi pentru orice informații suplimentare.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-semibold text-foreground">+40 722 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">contact@proerudio.ro</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresă</p>
                    <p className="font-semibold text-foreground">București, Sector 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Hai să Vorbim!
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Programează o întâlnire sau solicită mai multe informații despre taberele noastre.
              </p>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
              >
                Trimite un Mesaj
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
