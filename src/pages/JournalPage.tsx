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
    dates: `27 Iulie - 3 August 2025`,
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
      content: `În a treia zi de tabără am fost foarte activi încă de dimineață. După micul dejun ne-am împărțit în două grupuri, în funcție de preferințe. O echipă a mers însoțită de Reyhan la un parc de trambuline absolut formidabil, unde am țopăit, rostogolit, întrecut în sărituri și tumbe în aer sau luat la trântă cu niște ciocane uriașe pe bârne… sau luat la țintă cu mingi mici de plastic, în care puteai să și înoti sau să te scufunzi… În fine, fiecare a găsit ceva de făcut pe gustul lui acolo, inclusiv să își completeze micul dejun cu un sendviș uriaș sau o înghețata în asteptarea prânzului. Cea de-a doua grupă a mers la Laser Quest, unde s-au împușcat după pofta inimii. Bonusul a fost că aceasta activitate s-a desfășurat într-un mall imens, iar cei dornici de shopping au putut să petreacă ceva timp și prin magazine. Desigur că timpul a fost insuficient, dar ne-am propus să revenim.

      Imediat după prânz (a fost coadă mare la cantină de data aceasta și nu am mai avut timp să mergem în camere, așa că ne-am propus să identificam orele cu mai puțină aglomerație ca să scurtăm timpul de așteptare) am mers la orele de limba engleza în fabuloasa cladire în stil Victorian. Au fost doua sesiuni de curs, cu jumătate de oră pauză între ele, dar mulți nu au mai ajuns în camere, au preferat să  socializeze în Parcul Peel, zona perfectă pentru relaxare. Orele de engleză au fost interactive, bazate pe discuții, proiecte, cu activități în perechi și echipe, așa cum noi suntem deja obșinuiti să lucrăm. 

      Activitatea de seara a fost distractivă și diversă. Am avut de ales între piscină și jocuri de masă la interior sau atelier de dans. Ne-am împărțit fiecare pe unde a vrut, dar se pare că cei care au ales jocurile de masă au tras lozul câștigător. S-a jucat sah, Monopoly, Jenga, jocuri de cărți, s-a pictat pe pietre și s-a modelat cu argilă. Desigur, unii au făcut de toate, mutându-se de la stație la stație, inclusiv de la dans la șah :). A fost super distracție, mai ales ca aveam posibilitatea să alegem muzica…
`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1330787151831980&type=3"
    },
    {
      day: "Ziua 4",
      content: `În a patra zi de tabără deja avem rutina stabilită: ne întâlnim la cazare, mergem la masă, apoi la activitatea de dimineață, prânz, cursuri, activitatea de seara și ziua este gata… În dimineata aceasta luăm autobuzul spre Manchester. Un double-decker aproape gol (nu pentru mult timp că doar noi suntem 45…), așa că mergem la etaj, să avem priveliște. După aprximativ o jumătate de oră ajungem la Muzeul Stiinței și Industriilor unde aflăm despre dezvoltarea orașului industrial Manchester. Aflăm despre modul de viață în Epoca Industrială, despre comerțul cu lână și industria bumbacului, despre prima moară de bumbac care datează din 1780, despre prima șină de cale ferată care leagă Manchestrul de Liverpool în 1830 pentru a înlesni transportul între cele două orașe etc. Aflăm cu stupoare că în a doua jumătate a secolului al XVIII-lea doar jumătate dintre copii atingeau vârsta de doi ani, iar la cinci ani ajungeau doar 104 din 1000. Procente copleșitoare, informații care te tulbură, mașinării de tot felul, o dimineată plină.

      În rest, programul zilnic își urmează cursul obișnuit, iar seara avem din nou de ales între atelierul de jocuri, cel de vopsit tricouri și cel de baking. Ca și data trecută, unii au reușit să participe la mai multe și să lege noi prietenii în timp ce se distrează.
`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1332021865041842&type=3"
    },
    {
      day: "Ziua 5",
      content: `Am depășit deja jumătatea timpului pe care îl avem de petrecut la Manchester și nu știm când a trecut... 

      În a cincea zi de tabără am mers la Galeria de Artă Whitworth din Manchester. Această galerie, pe langă obișnuitele exponate, are și o parte interactivă, în sensul că am putut să ne punem la încercare talentul artistic cu pensula pe pânză... A fost foarte simpatic, iar unii dintre noi chiar au reușit să contureze ceva cu sens... Ca la orice punct de atracție în Marea Britanie, și aici am găsit o cafenea cu prăjituri spectaculoase. Pe scurt, la această vizită fiecare a găsit ceva de făcut, văzut sau gustat.

      După prânz și cursurile de engleză, am avut o serie de activități în Parcul Peel. Am jucat volei, fotbal, badminton, am sărit coarda sau pur și simplu ne-am distrat la terenul de joacă. Organizatorii au avut și pături, deci cine a dorit a putut și să joace cărți sau se relaxeze pe iarbă cu telefonul în mână ori de vorbă cu prietenii.

      Seara ar fi trebuit să se încheie cu un moment disco, dar au fost ceva probleme tehnice care s-au remediat destul de târziu, când majoritatea copiilor deja se retrăseseră spre camere. Am obținut, totuși, promisiunea că a doua zi să se țină din nou discoteca, speram să nu mai existe probleme.
`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1332985374945491&type=3"
    },
    {
      day: "Ziua 6",
      content: `A sosit și mult așteptata zi în care să facem turul ghidat al Stadionului Etihad, faimosul stadion al echipei Manchester City. A fost absolut grandios. Nu doar că am avut acces la stadionul propriu-zis și am putut să facem poze cu gazonul, lojele, am trecut prin tunelul prin care jucătorii intră pe teren, dar am văzut vestiarele, am atins tricourile celor mai faimoși fotbaliști ai lumii, am stat pe bancile pe care se așează și fotbaliștii clubului. Dar punctul de mare atracție al vizitei a fost sala în care se fac conferințele de presă întrucât am putut să facem poze la masă cu Joseph (Pep) Guardiola în persoană. Amintiri unice, emoții de neuitat… Desigur, plecarea a durat mai mult decât am anticipat fiindcă ultima oprire a fost la magazine, de unde fiecare a vrut să plece cu o amintire, mai mult sau mai puțin costisitoare.

      Așa cum ni se promisese, seara am avut disco. Aranjați care mai de care (în special fetele), am dansat și cântat melodii alese de noi sau alții, a fost foarte frumos! 
`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1334672534776775&type=3 "
    },
    {
      day: "Ziua 7",
      content: `În ultima zi de tabără am mers în excursia de o zi la Chester, unul dintre cele mai frumoase orășele din Marea Britanie. Am aflat despre istoria asezării care datează de pe vremea romanilor, când s-a constituit ca o fortăreață militară (79BC) cu numele Deva Victrix. După retragerea romană orașul a fost ocupat de anglo-saxoni, cei care au fortificat pereții cetății pentru a se apăra de raidurile vikingilor. Mai tarziu, cucerirea Normandă a adus orașul sub conducerea ducelui de Chester (de unde și numele), după care localitatea a devenit un port important, pus în umbră de Liverpool abia în secolul al XVIII-lea. Orașul cunoaște un nou moment de dezvoltare în perioada victoriană, din această perioadă datând foarte multe clădiri, care îi și conferă o culoare aparte. 

      Vizita noastră a început cu un tur pietonal în centrul Chester-ului, a continuat cu vizitarea faimoasei și grandioasei catedrale, după care am mers la un tur ghidat cu vaporul, când am văzut majoritatea clădirilor emblematice pentru oraș. După ce am vizitat și un edificiu roman, am început lunga plimbare pe cei trei kilometri de ziduri de apărare care încercuiesc orașul. Minunate priveliști pe cel mai bine păstrat și cel mai lung zid de apărare din Marea Britanie.

      Obosiți, dar fericiți, am ajuns în campus chiar la timp pentru o cină mai târzie decât de obicei (cina era în general la ora 18.00). Activitatea de seară a fost opțională, dar toți au ales să aparticipe la jocuri în Peel Parc, doar este ultima seară petrecută în această tabără și trebuie să profităm la maxim de fiecare moment.
 
`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1335540731356622&type=3  "
    },
    {
      day: "Ziua 8 - ultima zi de tabără ",
      content: `Ultima zi de tabără a fost tristă fiindcă trebuia să ne despărțim de prieteni dragi. După ce am făcut poze în fel și chip cu certificatele primite la curs (am avut și mândria ca două dintre elevele noastre să fie desemnate Student of the Week pentru implicare din timpul cursurilor și cunoștințele de limbă engleză), am vrut neapărat să ne luam la revedere de la toti activity leaders englezi. Fiindcă unii au fost greu de găsit, chiar am întârziat puțin plecarea, noroc că domnul șofer a fost super înțelegător.

      A urmat lunga călătorie înapoi spre casă, cu escală la Amsterdam și mult timp liber la Duty Free, moment tocmai bun să mai cumpărăm câte ceva celor dragi. 

`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1335540731356622&type=3"
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
      {/* <section className="relative pt-16">
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
      </section> */}

      {/* Quick Info */}
      {/* <section className="py-12 bg-secondary/30">
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
      </section> */}

      {/* Journal Intro */}
      <section className="py-16 mt-10">
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

