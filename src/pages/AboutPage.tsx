import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BookOpen, Heart, Globe, Target, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import aboutClassroomImage from "@/assets/about-classroom.jpg";
import summerCampImage from "@/assets/summer-camp.jpg";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Maria Popescu",
      role: "Director & Fondator",
      description: "Fondator Pro Erudio, cu peste 14 ani de experiență în organizarea taberelor de engleză.",
      image: summerCampImage,
    },
    {
      name: "Andrei Ionescu",
      role: "Coordonator Tabere Internaționale",
      description: "Responsabil pentru taberele din UK și Irlanda, expert în logistică internațională.",
      image: summerCampImage,
    },
    {
      name: "Elena Dumitrescu",
      role: "Director Academic",
      description: "Certificată Cambridge CELTA, coordonează programele de engleză din toate taberele.",
      image: summerCampImage,
    },
    {
      name: "Alexandru Radu",
      role: "Coordonator Activități & Animație",
      description: "15 ani experiență în animație, creatorul programelor de activități din tabere.",
      image: summerCampImage,
    },
    {
      name: "Cristina Munteanu",
      role: "Profesor Engleză Senior",
      description: "Specializată în metode interactive de predare pentru copii și adolescenți.",
      image: summerCampImage,
    },
    {
      name: "Dan Georgescu",
      role: "Animator Principal",
      description: "Expert în team building și jocuri educative, adorat de copii în fiecare tabără.",
      image: summerCampImage,
    },
    {
      name: "Ioana Stanciu",
      role: "Profesor Engleză",
      description: "Specializată în pregătire Cambridge, participă la taberele internaționale.",
      image: summerCampImage,
    },
    {
      name: "Mihai Popa",
      role: "Coordonator Sport & Outdoor",
      description: "Instructor de drumeții și sporturi, responsabil pentru activitățile outdoor.",
      image: summerCampImage,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Învățare prin Aventură",
      description: "Credem că engleza se învață cel mai bine prin experiențe memorabile și activități captivante.",
    },
    {
      icon: Users,
      title: "Siguranță pe Primul Loc",
      description: "Supraveghere 24/7, protocoale stricte și echipă dedicată pentru siguranța fiecărui copil.",
    },
    {
      icon: Award,
      title: "Excelență în Educație",
      description: "Profesori certificați Cambridge și metode dovedite pentru progres real în engleză.",
    },
    {
      icon: Globe,
      title: "Experiențe Internaționale",
      description: "Tabere în UK, Irlanda și România pentru imersie culturală autentică.",
    },
  ];

  const milestones = [
    { year: "2010", event: "Prima tabără de engleză Pro Erudio în România" },
    { year: "2012", event: "Lansarea primei tabere internaționale în Londra" },
    { year: "2014", event: "Extinderea în Irlanda - Dublin și Cork" },
    { year: "2016", event: "Peste 1000 de copii participanți la tabere" },
    { year: "2019", event: "Deschiderea taberelor de iarnă și Paște" },
    { year: "2023", event: "Peste 2500 de absolvenți și 50+ ediții de tabere" },
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
                Tabere de Engleză Pro Erudio
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Peste 14 ani de experiență în organizarea taberelor educaționale
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
                Pro Erudio organizează tabere de limbă engleză din 2010, cu convingerea că cea mai bună 
                modalitate de a învăța o limbă străină este prin imersie și experiențe de neuitat. 
                Taberele noastre combină cursuri intensive de engleză cu aventură, sport și cultură.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Misiunea noastră este să oferim copiilor și adolescenților oportunitatea de a învăța 
                engleza într-un mediu internațional, sigur și distractiv, unde fac prieteni din toată 
                lumea și creează amintiri pentru o viață.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Peste 50 de ediții de tabere organizate</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Destinații în România, UK și Irlanda</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Profesori certificați Cambridge și echipă dedicată</span>
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
              Profesorii și animatorii care fac taberele noastre speciale
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Întrebări despre Tabere?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Vrei să afli mai multe despre taberele noastre? Suntem aici să răspundem la toate 
            întrebările tale despre program, locații, prețuri și înscrieri.
          </p>
          <div className="flex flex-wrap gap-8">
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
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Rezervă un Loc la Tabără!
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Înscrierile pentru taberele 2025 sunt deschise. Locurile sunt limitate!
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card border-0 shadow-2xl">
              <CardContent className="p-8">
                <RegistrationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
