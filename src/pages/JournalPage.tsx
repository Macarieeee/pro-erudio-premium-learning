import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ExternalLink, Building } from "lucide-react";
import summerCampImage from "@/assets/summer-camp.jpg";

interface JournalPageProps {
  year: string;
  campName: string;
}

const JournalPage = ({ year, campName }: JournalPageProps) => {
  const campDetails = {
    location: "Poiana Mărului, Brașov",
    duration: "7 zile / 6 nopți",
    ageGroup: "8-16 ani",
    dates: `15-22 Iulie ${year}`,
  };

  const journalEntries = [
    {
      day: "Ziua 1",
      content: `Prima zi de tabără a început extrem de devreme întrucât avionul era la ora 7.00. Cu emoții și somnoroși sau nu 😊, ne-am întâlnit cu toții, părinți și copii, la ora 4.30 la Aeroportul Otopeni, zona Plecări. Totul a decurs conform planurilor, nimeni nu a întârziat sau a avut dificultăți la îmbarcare, scurta escală de la Amsterdam a fost fix cât să schimbăm avioanele în mare grabă, așa că la 10.20, ora Marii Britanii, am aterizat pe aeroportul din Manchester, destinația călătoriei noastre. De acolo am fost preluați cu autocarul pentru transferul spre Universitatea din Salford, iar în jurul orei 13.30 am sosit în campus.

După o primire foarte călduroasă (am mâncat pizza cu mare poftă că ne era și foame, YUM!) ne-am primit cheile de la camere, deci până acum totul la superlativ, prea bine să fie adevărat 😊. Partea neplăcută a fost că încă se făcea curățenie în cameră și, deși inițial ni s-a spus că putem să mergem să ne odihnim fiecare în patul lui la ora 15.30, așteptarea a fost mai lungă decât ne gândeam...Nu a fost o problemă foarte mare întrucât ni s-a pus la dispoziție o zonă în care să ne relaxăm, iar cei mai curioși dintre noi au plecat puțin în recunoaștere prin campus. Campusul este superb, cu clădiri tipic englezești, o alternanță modern (cu sticlă și forme neregulate) și tradițional (acoperite cu cărămidă roșie), cu foarte multe spații verzi și flori, o împletire armonioasă între natură și eleganță arhitecturală. Și camerele sunt spectaculos de frumoase, ca niște camere de hotel (fiecare cameră cu baie proprie), dar cu spații comune pe fiecare apartament, spațiu care deja presimțim că va fi folosit ca zonă de socializare în timpul liber.

Cina a fost acceptabilă, după standarde englezești, dar suficient de bună și variată ca să ne dea energie pentru o plimbare după masă. Oricum, oboseala drumului, schimbarea de fus orar și somnul scurt din noaptea anterioară ne-a făcut să căutăm să ne retragem în camerele noastre mai devreme decât în serile ce vor urma.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329458625298166&type=3"
    },
    {
      day: "Ziua 2",
      content: `A doua zi a început tot devreme, dar de data aceasta dimineața ne-a găsit odihniți și nerăbdători să descoperim mai mult din ceea ce are să ne ofere programul de tabără. La ora 8.00 ne-am întâlnit cu toții în fața clădirilor de cazare (există acolo o zonă special dedicată, cu băncuțe și arbuști) pentru a merge la cantină. Distanța dintre cazare și cantină era de aproximativ un sfert de oră, dar clădirea în care se țineau cursurile era chiar lângă cantină, deci trebuia să avem grijă în fiecare dimineață să ne luăm din cameră tot ce aveam nevoie, organizarea face mereu diferența.

La ora 9.00 au început cursurile de limbă engleză, iar în prima parte copiii au primit un test (inclusiv o probă orală), la care s-au descurcat remarcabil, motiv pentru care au fost plasați în grupe mai mult ai noștri cu ai noștri întrucât nivelul lor de limbă engleză este mult peste media de cunoștințe ale celorlalte naționalități. Motiv de bucurie, dar și de tristețe întrucât unul dintre obiectivele taberei este să socializeze în grupuri internaționale. Sigur vom mai avea ocazii...

Prima activitate de după-amiază a fost prezentarea programului, a echipei, a regulilor taberei etc și o scurtă plimbare prin campus pentru a ne arăta distanțele cele mai scurte dintre punctele de interes. Campusul este enorm și activitățile pot fi programate în diferite zone, deci această orientare a fost foarte binevenită.

A doua activitate de după-amiază a fost un Scavenger Hunt pentru a ne consolida informațiile primite la atelierul anterior despre unde se află diferite clădiri și a ne ajuta să ne cunoaștem mai bine. S-au format echipe internaționale, deci a trebuit să colaborăm și cu copii din alte țări pentru îndeplinirea sarcinilor de lucru.

Activitatea de seară a fost un deliciu culinar sub îndrumarea haioasei Sabrina. Am făcut cupcakes 😊. Cu unt, cu creme de mai multe feluri, decorate, pufoase și înmiresmate cu fel de fel de esențe, pe scurt delicioase. Iar când le pregătești alături de prieteni și cu propriile mâini, clar le vei savura. Unde pui că primești ca bonus și rețeta, pe care o poți reinterpreta acasă pe gustul tău 😊.

Mergem la culcare epuizați, dar fericiți. Ne întrebăm ce aventuri ne așteaptă ziua următoare…`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3"
    },
    {
      day: "Ziua 3",
      content: `Ziua a treia a venit cu și mai multe surprize plăcute. După micul dejun, am plecat la cursurile de engleză unde am lucrat în grupuri mici pe proiecte creative. Profesorii sunt foarte prietenoși și ne încurajează să vorbim cât mai mult în engleză.

După-amiaza am avut prima noastră excursie în afara campusului - o plimbare prin centrul orașului Manchester. Am vizitat Piața Principală, am făcut poze lângă statuile celebre și am descoperit arhitectura victoriană impresionantă a orașului. Magazinele erau tentante, dar ne-am păstrat banii pentru suveniruri la final.

Seara am avut "International Night" unde fiecare naționalitate a prezentat ceva din cultura sa. Noi, românii, am prezentat dansuri tradiționale și am povestit despre tradițiile noastre. A fost o seară memorabilă plină de dans, muzică și râsete.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3"
    },
    {
      day: "Ziua 4",
      content: `Ziua patru a fost dedicată sportului și competițiilor. Dimineața, după cursuri, am avut un turneu de fotbal între naționalități. Echipa României s-a descurcat foarte bine, ajungând până în semifinale!

După-amiaza am participat la ateliere de artă și meșteșuguri - am făcut brățări prieteniei și am pictat tricouri. Fiecare și-a personalizat tricoul cu amintiri din tabără.

Seara am avut Movie Night în aer liber. Am stat pe pături pe iarbă și am urmărit un film clasic britanic cu popcorn. Atmosfera a fost magică sub cerul înstelat al Angliei.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3"
    },
    {
      day: "Ziua 5",
      content: `A cincea zi a fost ziua excursiei mari! Am plecat cu autocarul spre Liverpool, orașul Beatles. Am vizitat celebrul Cavern Club, locul unde Beatles și-au început cariera, și am făcut poze la statuile lor de pe malul râului Mersey.

Am avut timp liber pentru shopping și am mâncat tradiționalul Fish & Chips la un restaurant de pe Dock. Priveliștea portului era spectaculoasă, cu clădiri istorice și nave moderne.

Seara, odată întorși în campus, am avut karaoke. Nu trebuie să spun că hiturile Beatles au fost cele mai cântate piese ale serii!`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3"
    },
    {
      day: "Ziua 6",
      content: `Ultima zi completă în tabără a fost plină de emoții. Dimineața am avut ultimele cursuri de engleză și am primit certificatele de participare. Profesorii ne-au felicitat pentru progresul făcut și ne-au încurajat să continuăm să învățăm.

După-amiaza a fost dedicată pregătirilor pentru seara de gală. Am repetat spectacolele, ne-am pregătit costumele și am decorat sala de festivități.

Seara de gală a fost punctul culminant al taberei. Fiecare grup a prezentat câte ceva: dans, teatru, cântece. Am râs, am aplaudat și chiar am lăcrimat puțin când am realizat că aventura se apropie de final. Ne-am făcut promisiuni să păstrăm legătura și să ne revedem.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3"
    },
  ];

  const otherJournals = [
    { name: "Jurnal Tabăra UK - Londra", location: "Londra, UK", type: "Internațională" },
    { name: "Jurnal Tabăra Marea Neagră", location: "Costinești", type: "Vacanță" },
    { name: "Jurnal Tabăra de Iarnă", location: "Predeal", type: "Schi & Engleză" },
    { name: "Jurnal Tabăra de Paște", location: "Bran", type: "Tematică" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Same as Camp Page */}
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
                Jurnal de Tabără {year}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {campName}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Jurnal de tabără - Povestea aventurii noastre
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

      {/* Journal Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Școală internațională de vară de limbă engleză în Marea Britanie
            </h2>
            <p className="text-xl text-muted-foreground mb-2">Jurnal de tabără</p>
            <p className="text-lg text-foreground font-medium">Universitatea din Salford (Manchester)</p>
            <p className="text-lg text-primary font-semibold">{campDetails.dates}</p>
          </div>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {journalEntries.map((entry, index) => (
              <Card key={index} className="bg-card border-border overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-bold">
                      {entry.day}
                    </span>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {entry.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {entry.galleryLink && (
                    <a 
                      href={entry.galleryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Vezi galeria foto completă aici!
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Journals */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Building className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Alte Jurnale de Tabere Pro Erudio
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {otherJournals.map((journal, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={summerCampImage} 
                    alt={journal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-4 text-center">
                  <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {journal.type}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {journal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {journal.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JournalPage;

