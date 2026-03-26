// src/data/journals.ts
import summerCampImage from "@/assets/summer-camp.jpg";

// Manchester 2025 images
import ziua11 from "@/assets/Ziua1-1.jpg";
import ziua12 from "@/assets/Ziua1-2.jpg";
import ziua13 from "@/assets/Ziua1-3.jpg";
import ziua14 from "@/assets/Ziua1-4.jpg";
import ziua21 from "@/assets/Ziua2-1.jpg";
import ziua22 from "@/assets/Ziua2-2.jpg";
import ziua23 from "@/assets/Ziua2-3.jpg";
import ziua24 from "@/assets/Ziua2-4.jpg";
import ziua31 from "@/assets/Ziua3-1.jpg";
import ziua32 from "@/assets/Ziua3-2.jpg";
import ziua33 from "@/assets/Ziua3-3.jpg";
import ziua34 from "@/assets/Ziua3-4.jpg";
import ziua41 from "@/assets/Ziua4-1.jpg";
import ziua42 from "@/assets/Ziua4-2.jpg";
import ziua43 from "@/assets/Ziua4-3.jpg";
import ziua44 from "@/assets/Ziua4-4.jpg";
import ziua51 from "@/assets/Ziua5-1.jpg";
import ziua52 from "@/assets/Ziua5-2.jpg";
import ziua53 from "@/assets/Ziua5-3.jpg";
import ziua54 from "@/assets/Ziua5-4.jpg";
import ziua61 from "@/assets/Ziua6-1.jpg";
import ziua62 from "@/assets/Ziua6-2.jpg";
import ziua63 from "@/assets/Ziua6-3.jpg";
import ziua64 from "@/assets/Ziua6-4.jpg";
import ziua71 from "@/assets/Ziua7-1.jpg";
import ziua72 from "@/assets/Ziua7-2.jpg";
import ziua73 from "@/assets/Ziua7-3.jpg";
import ziua74 from "@/assets/Ziua7-4.jpg";
import ziua81 from "@/assets/Ziua8-1.jpg";
import ziua82 from "@/assets/Ziua8-2.jpg";
import ziua83 from "@/assets/Ziua8-3.jpg";
import ziua84 from "@/assets/Ziua8-4.jpg";
import moinesti11 from "@/assets/Moinesti11.jpg";
import moinesti12 from "@/assets/Moinesti12.jpg";
import moinesti13 from "@/assets/Moinesti13.jpg";
import moinesti14 from "@/assets/Moinesti14.jpg";
import moinesti21 from "@/assets/Moinesti21.jpg";
import moinesti22 from "@/assets/Moinesti22.jpg";
import moinesti23 from "@/assets/Moinesti23.jpg";
import moinesti24 from "@/assets/Moinesti24.jpg";
import moinesti31 from "@/assets/Moinesti31.jpg";
import moinesti32 from "@/assets/Moinesti32.jpg";
import moinesti33 from "@/assets/Moinesti33.jpg";
import moinesti34 from "@/assets/Moinesti34.jpg";
import moinesti41 from "@/assets/Moinesti41.jpg";
import moinesti42 from "@/assets/Moinesti42.jpg";
import moinesti43 from "@/assets/Moinesti43.jpg";
import moinesti44 from "@/assets/Moinesti44.jpg";
import moinesti51 from "@/assets/Moinesti51.jpg";
import moinesti52 from "@/assets/Moinesti52.jpg";
import moinesti53 from "@/assets/Moinesti53.jpg";
import moinesti54 from "@/assets/Moinesti54.jpg";
import moinesti61 from "@/assets/Moinesti61.jpg";
import moinesti62 from "@/assets/Moinesti62.jpg";
import moinesti63 from "@/assets/Moinesti63.jpg";
import moinesti64 from "@/assets/Moinesti64.jpg";
import predeal11 from "@/assets/Predeal11.jpg";
import predeal12 from "@/assets/Predeal12.jpg";
import predeal13 from "@/assets/Predeal13.jpg";
import predeal14 from "@/assets/Predeal14.jpg";
import predeal21 from "@/assets/Predeal21.jpg";
import predeal22 from "@/assets/Predeal22.jpg";
import predeal23 from "@/assets/Predeal23.jpg";
import predeal24 from "@/assets/Predeal24.jpg";
import predeal31 from "@/assets/Predeal31.jpg";
import predeal32 from "@/assets/Predeal32.jpg";
import predeal33 from "@/assets/Predeal33.jpg";
import predeal34 from "@/assets/Predeal34.jpg";
import predeal41 from "@/assets/Predeal41.jpg";
import predeal42 from "@/assets/Predeal42.jpg";
import predeal43 from "@/assets/Predeal43.jpg";
import predeal44 from "@/assets/Predeal44.jpg";
import predeal51 from "@/assets/Predeal51.jpg";
import predeal52 from "@/assets/Predeal52.jpg";
import predeal53 from "@/assets/Predeal53.jpg";
import predeal54 from "@/assets/Predeal54.jpg";
import predeal61 from "@/assets/Predeal61.jpg";
import predeal62 from "@/assets/Predeal62.jpg";
import predeal63 from "@/assets/Predeal63.jpg";
import predeal64 from "@/assets/Predeal64.jpg";
import marului11 from "@/assets/marului11.jpg"
import marului12 from "@/assets/marului12.jpg"
import marului13 from "@/assets/marului13.jpg"
import marului14 from "@/assets/marului14.jpg"
import marului21 from "@/assets/marului21.jpg"
import marului22 from "@/assets/marului22.jpg"
import marului23 from "@/assets/marului23.jpg"
import marului24 from "@/assets/marului24.jpg"
import marului31 from "@/assets/marului31.jpg"
import marului32 from "@/assets/marului32.jpg"
import marului33 from "@/assets/marului33.jpg"
import marului34 from "@/assets/marului34.jpg"
import marului41 from "@/assets/marului41.jpg"
import marului42 from "@/assets/marului42.jpg"
import marului43 from "@/assets/marului43.jpg"
import marului44 from "@/assets/marului44.jpg"
import marului51 from "@/assets/marului51.jpg"
import marului52 from "@/assets/marului52.jpg"
import marului53 from "@/assets/marului53.jpg"
import marului54 from "@/assets/marului54.jpg"
import marului61 from "@/assets/marului61.jpg"
import marului62 from "@/assets/marului62.jpg"
import marului63 from "@/assets/marului63.jpg"
import marului64 from "@/assets/marului64.jpg"



export type JournalEntry = {
  day: string;
  content: string;
  galleryLink?: string;
  images?: string[];
};

export type Journal = {
  slug: string; // ex: "manchester-2025"
  navbarLabel: string; // cum apare în dropdown
  title: string; // titlul mare
  subtitle?: string; // "Jurnal de tabără"
  campus?: string; // ex: "Universitatea din Salford (Manchester)"
  dates: string;
  heroImage?: string;
  heroAlt?: string;

  quickInfo?: {
    location: string;
    duration: string;
    ageGroup: string;
  };

  entries: JournalEntry[];
};

export const journals: Record<string, Journal> = {
  "poiana-marului-2025": {
  slug: "poiana-marului-2025",
  navbarLabel: "JURNAL EXPLORER CAMPS POIANA MĂRULUI 2025",
  title: "Tabără de limba engleză și aventură în România",
  subtitle: "Jurnal de tabără",
  campus: "Poiana Mărului, Jud. Brașov",
  dates: "14-19 iulie 2025",
  heroImage: marului14,
  heroAlt: "Poiana Mărului 2025",
  quickInfo: {
    location: "Poiana Mărului, Brașov",
    duration: "6 zile / 5 nopți",
    ageGroup: "—",
  },
  entries: [
    {
      day: "Ziua 1",
      content: `La ora 8.00 dimineața ne-am adunat în Piața Constituției pentru a ne îmbarca spre a doua aventură din vara aceasta, veseli și pregătiți de noi provocări pe echipe.

Ca de obicei, profităm de drumul cu autocarul pentru a vizita și obiective turistice din țară. Nu prea multe și mereu altele, pentru că noi știm că, din perspectiva copiilor, vizitele sunt frumoase doar dacă sunt puține, scurte și ghidate, adică presărate cu povești interesante. De data aceasta, am mers la Mănăstirea Rupestră de la Șinca Veche, un loc plin de mister și frumusețe.

În timpul mersului cu autocarul, am participat la multe concursuri cu întrebări ca să îmbinăm plăcutul cu utilul, învățăm și adunăm puncte pentru echipe, așa că timpul a trecut pe nesimțite. Am răspuns și la întrebări despre ce am aflat în timpul vizitei, ca informația să se consolideze și să rămânem cu amintiri vii peste ani despre cele văzute acolo.

La ora 14.30 am ajuns la pensiune, am mâncat și ne-am cazat repede, astfel încât în jurul orei 17.00 ne-am adunat pe terenul de fotbal pentru prima serie de activități. După ce am ascultat cu atenție regulile taberei, am format un cerc și, prin joc, am aflat câte ceva unii despre alții, ca să pregătim terenul pentru formarea echipelor. Odată echipele stabilite și fișele completate cu informații despre fiecare membru, ne-am strâns pentru prima provocare pe echipe: prezentarea Regatului, cu toate titlurile nobiliare acordate membrilor echipei, blazon și, desigur, confecționarea coroanei regulamentare. A fost distracție mare întrucât fiecare echipă a încercat să surprindă prin originalitate și creativitate.

După cină, ne-am adunat din nou în curtea din fața hotelului pentru o cursă cu întrebări, un fel de scavenger hunt reinterpretat. Seara s-a terminat cu primele puncte acordate echipelor. Bravo, copii!`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1316219186622110&type=3",
      images: [marului11, marului12, marului13, marului14],
    },
    {
      day: "Ziua 2 - Explore Life!",
      content: `În prima dimineață din tabără ne-am trezit foarte devreme, curioși să descoperim ce vom face. Am aflat repede întrucât prima activitate începe chiar înainte de micul dejun. Și ce altceva putem face dis-de-dimineață decât să ne dezmorțim la gimnastică și dans.

După micul dejun bufet suedez, am început cursurile interactive de limba engleză. Și cum tema zilei este Explore Life!, am discutat, în funcție de vârstă și nivel, despre diferite aspecte ale vieții: de la alimentație sănătoasă până la activități de timp liber și divertisment. Am realizat proiecte în echipe, am făcut prezentări și am participat la competiții, așa că cele aproape trei ore au trecut cât ai clipi.

După masa de prânz și ora de telefon, la ora 15.00 a început primul atelier din după-amiază, „Vacation on a budget”. Copiii au trebuit să organizeze o vacanță de cinci zile pentru o familie cu doi copii. Surpriza a fost că fiecare echipă a avut alt buget în care să se încadreze. Au verificat prețuri la cazare și masă, au stabilit itinerarii și au proiectat activități pentru timpul liber. Au ales destinații exotice sau nu, conform bugetului. Felicitări, copii! V-ați descurcat de minune.

La al doilea set de ateliere de după-amiază, am avut treabă multă într-o bucătărie improvizată pe terasa pensiunii. Împărțiți în două serii, mai întâi am făcut sandvișuri cu design special, demne de domnițele și cavalerii din regat, pe care le-am și mâncat apoi cu mare poftă. La a doua serie, am făcut aluat pentru clătite cu mâinile noastre, le-am copt, umplut cu Nutella și le-am mâncat pe nerăsuflate. Totul este delicios atunci când lucrezi cu echipa.

Atelierele de seară au fost jocuri în echipă, „60 Second Challenges”. Provocările au fost diverse și ne-am testat diferite abilități: coordonarea, când a trebuit să cărăm un pahar de apă cu ajutorul unei parașute, ținta, atât la una fixă, cât și la una mobilă, dexteritatea la un joc de ștafetă și multe altele.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1316974459879916&type=3",
      images: [marului21, marului22, marului23, marului24],
    },
    {
      day: "Ziua 3 - Explore the Past!",
      content: `Cea de-a treia zi de tabără a început cu ploaie, așa că exercițiile de stretching s-au întâmplat la interior, în sala de conferințe. Dar, spre bucuria noastră, treptat s-a înseninat și am putut face dansurile în curte.

La atelierele de limba engleză am explorat trecutul. La unele grupe am explorat Egiptul Antic și am creat o bandă desenată în care copiii au fost protagoniști. Copiii au călătorit cu mașina timpului, au vizitat piramidele și s-au întâlnit cu Cleopatra. La altele s-a discutat despre marii exploratori ai lumii și despre pirați faimoși. Indiferent ce au ales profesoarele pentru elevii lor, activitățile au fost interactive și temele de discuție interesante.

În ciuda vremii schimbătoare, am reușit să mergem la o scurtă drumeție în pădure ca să construim adăposturi din crengi și frunze. Și nu orice fel de adăposturi, ci castelul Regatului, cu grădini regale, dormitoare, mese împărătești și toate acareturile necesare unui trai la curtea regelui.

A urmat cina și activitatea de seară „Team Feuds”, o adaptare a celebrului show „Ce spun românii?”. Echipele noastre s-au duelat amical în cuvinte și idei, desigur în limba engleză, deci toată lumea a ieșit câștigătoare. Bravo, copii! Ați demonstrat că lucrul în echipă face orice posibil.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1318826139694748&type=3",
      images: [marului31, marului32, marului33, marului34],
    },
    {
      day: "Ziua 4 - Explore Art!",
      content: `În a patra zi de tabără tema a fost legată de arte. La cursurile de limbă engleză de dimineață am discutat despre diferite feluri de arte frumoase: arhitectura, dansul, literatura, pictura, sculptura, muzica și cinematografia. În funcție de vârstă și interese, ne-am și încercat talentul la diferite forme de artă: s-a pictat, s-a cântat, s-au inventat scenarii și chiar s-au pus în scenă, s-a dansat. Pe scurt, a fost super interesant.

La primul atelier de după-amiază am creat o reclamă la o invenție care să ne schimbe viața în bine. Am avut tot felul de idei: memoratoare, cititoare de minți, schimbătoare de haine, dispozitive care traduc limbajul animalelor, brățări care te avertizează dacă te apropii de răufăcători și multe altele. Desigur, ideea era ca celelalte echipe să fie convinse să cumpere invenția noastră. A fost haz mare la prezentarea proiectelor, cu întrebări din public și argumente care mai de care mai convingătoare.

Al doilea atelier a fost „Photo Challenge”. La prima categorie echipele au ilustrat în imagini expresii idiomatice precum break a leg, hold your horses sau have butterflies in the stomach, iar la cea de-a doua echipele au trebuit să ilustreze într-o fotografie un concept abstract, cum ar fi curaj, echilibru sau empatie. Creativitate, compoziție artistică, abilități fotografice, cunoștințe de limba engleză și prezentări argumentate — activitatea a pus la încercare diverse abilități ale copiilor.

La activitatea de seară, echipele au confecționat un copac din hârtie reciclată. Dar nu orice copac, ci unul năzdrăvan, care să spună povestea regatului lor. Sarcina a părut ușoară, dar nu a fost deloc simplă. Copacul trebuia să aibă cel puțin 30 de centimetri înălțime, să stea în picioare nesprijinit și să fie frumos decorat, astfel încât povestea care îl însoțește să capete viață și credibilitate. Bravo, echipe! Ați făcut o treabă excelentă.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1319427499634612&type=3",
      images: [marului41, marului42, marului43, marului44],
    },
    {
      day: "Ziua 5 – Explore your Skills!",
      content: `După cursurile de limbă engleză, în cea de-a cincea zi de tabără, am avut atelierele „Trainer for 15 minutes”, ateliere la care copiii au ocazia să îi învețe pe prietenii lor ceva ce lor le iese foarte bine. Și am avut de toate: de la sporturi, precum fotbal, baschet, dansuri, judo și karate, la activități artistice, precum origami și desen, activități muzicale, dezlegare de cuburi Rubik și multe altele.

Al doilea atelier a fost format din șase stații cu jocuri, la care echipele au participat câte două sau individual. Am avut jocuri de coordonare în echipă, dexteritate, creativitate și strategie. Bravo, echipe! Ați fost la înălțime.

Seara s-a încheiat cu spectacolul „Kids Got Talent” organizat de tinerii noștri talentați și cu petrecere cu muzică, dans, tort și mesaje emoționante pe șepci, pentru că este ultima seară petrecută împreună, iar până vara viitoare este vreme multă. O să ne fie dor.`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1324125122498183&type=3",
      images: [marului51, marului52, marului53, marului54],
    },
    {
      day: "Ziua 6",
      content: `Ultima zi de tabără este plină de emoție. Echipele primesc ultimele puncte, se stabilește clasamentul distracției, se primesc diplomele, se fac ultimele poze înainte de plecarea de la pensiune, se primesc telefoanele și se fac ultimele schimburi de conturi de Instagram, cu promisiunea că vor ține legătura și se vor revedea și vara viitoare.

Pe drumul de întoarcere facem un popas la Casa Memorială Nicolae Grigorescu, unde domnul ghid ne povestește despre viața și activitatea marelui pictor român, ca să încheiem tabăra pe o notă de mândrie națională.

La revedere, tabără dragă! Pe vara viitoare!`,
      galleryLink: "https://www.facebook.com/media/set/?set=a.1321030106141018&type=3",
      images: [marului61, marului62, marului63, marului64],
    },
  ],
},
  "manchester-2025": {
    slug: "manchester-2025",
    navbarLabel: "JURNAL ȘCOALĂ INTERNAȚIONALĂ 2025",
    title: "Școală internațională de vară de limbă engleză în Marea Britanie",
    subtitle: "Jurnal de tabără",
    campus: "Universitatea din Salford (Manchester)",
    dates: "27 Iulie - 3 August 2025",
    heroImage: ziua51,
    heroAlt: "Manchester 2025",

    quickInfo: {
      location: "Manchester, Marea Britanie",
      duration: "7 zile / 6 nopți",
      ageGroup: "8-16 ani",
    },

    entries: [
      {
        day: "Ziua 1",
        content: `Prima zi de tabără a început extrem de devreme întrucât avionul era la ora 7.00. Cu emoții și somnoroși sau nu 😊, ne-am întâlnit cu totii, părinți și copii, la ora 4.30 la Aeroportul Otopeni, zona Plecări. Totul a decurs conform planurilor, nimeni nu a întârziat sau a avut dificulțăți la îmbarcare, scurta escală de la Amsterdam a fost fix cât să schimbăm avioanele în mare grabă, așa că la 10.20, ora Marii Britanii, am aterizat pe aeroportul din Manchester, destinația călătoriei noastre. De acolo am fost preluați cu autocarul pentru transferul spre Universitatea din Salford, iar în jurul orei 13.30 am sosit în campus. 

După o primire foarte călduroasă (am mâncat pizza cu mare poftă că ne era și foame, YUM!) ne-am primit cheile de la camere, deci până acum totul la superlativ, prea bine să fie adevărat 😊. Partea neplăcută a fost că încă se făcea curățenie în cameră și, deși inițial ni s-a spus că putem să mergem să ne odihnim fiecare în patul lui la ora 15.30, așteptarea a fost mai lunga decât ne gândeam...Nu a fost o problemă foarte mare întrucât ni s-a pus la dispoziție o zonă în care să ne realxăm, iar cei mai curioși dintre noi au plecat puțin în recunoastere prin campus. Campusul este superb, cu clădiri tipic englezești, o alternanță modern (cu sticlă și forme neregulate) și tradițional (acoperite cu cărămidă roșie), cu foarte multe spații verzi și flori, o împletire armonioasă între natură și eleganță arhitecturală. Și camerele sunt spectaculos de frumoase, ca niste camere de hotel (fiecare cameră cu baie proprie), dar cu spații comune pe fiecare apartament, spațiu care deja presimțim că va fi folosit ca zonă de socializare în timpul liber. 

Cina a fost acceptabilă, după standarde englezești, dar suficient de bună si variată ca să ne dea energie pentru o plimbare după masă. Oricum, oboseala drumului, schimbarea de fus orar și somnul scurt din noaptea anterioară ne-a făcut să căutăm să ne retragem în camerele noastre mai devreme decât în serile ce vor urma. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1329458625298166&type=3",
        images: [ziua21, ziua22, ziua23, ziua24],
      },
      {
        day: "Ziua 2",
        content: `A doua zi a început tot devreme, dar de data aceasta dimineața ne-a găsit odihniți și nerăbdători să descoperim mai mult din ceea ce are să ne ofere programul de tabără. La ora 8.00 ne-am întâlnit cu toții în fața clădirilor de cazare (există acolo o zonă special dedicată, cu băncuțe și arbuști) pentru a merge la cantină. Distanța dintre cazare și cantină era de aproximativ un sfert de oră, dar clădirea în care se țineau cursurile era chiar lângă cantină, deci trebuia sa avem grija în fiecare dimineață să ne luam din cameră tot ce aveam nevoie, organizarea face mereu diferența. 

La ora 9.00 au început cursurile de limbă engleză, iar în prima parte copiii au primit un test (inclusiv o probă orală), la care s-au descurcat remarcabil, motiv pentru care au fost plasați în grupe mai mult ai noștri cu ai noștri întrucât nivelul lor de limbă engleză este mult peste media de cunoștințe ale celorlalte nationalități. Motiv de bucurie, dar și de tristețe întrucât unul dintre obiectivele taberei este să socializeze în grupuri internaționale. Sigur vom mai avea ocazii... 

Prima activitate de după-amiază a fost prezentarea programului, a echipei, a regulilor taberei etc și o scurtă plimbare prin campus pentru a ne arăta distanțele cele mai scurte dintre punctele de interes. Campusul este enorm și activitațile pot fi programate în diferite zone, deci această orientare a fost foarte binevenită. 

A doua activitate de după-amiază a fost un Scavenger Hunt pentru a ne consolida informațiile primite la atelierul anterior despre unde se află diferite clădiri și a ne ajuta să ne cunoaștem mai bine. S-au format echipe internaționale, deci a trebuit să colaborăm și cu copii din alte țări pentru îndeplinirea sarcinilor de lucru. 

Activitatea de seară a fost un deliciu culinar sub îndrumarea haioasei Sabrina. Am făcut cupcakes 😊. Cu unt, cu creme de mai multe feluri, decorate, pufoase și înmiresmate cu fel de fel de esențe, pe scurt delicioase. Iar când le pregătești alături de prieteni și cu propriile mâini, clar le vei savura. Unde pui că primești ca bonus și rețeta, pe care o poți reinterpreta acasă pe gustul tău 😊. 

Mergem la culcare epuizați, dar fericiți. Ne întrebăm ce aventuri ne așteaptă ziua următoare… `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3",
        images: [ziua11, ziua12, ziua13, ziua14],
      },
      {
        day: "Ziua 3",
        content: `În a treia zi de tabără am fost foarte activi încă de dimineață. După micul dejun ne-am împărțit în două grupuri, în funcție de preferințe. O echipă a mers însoțită de Reyhan la un parc de trambuline absolut formidabil, unde am țopăit, rostogolit, întrecut în sărituri și tumbe în aer sau luat la trântă cu niște ciocane uriașe pe bârne… sau luat la țintă cu mingi mici de plastic, în care puteai să și înoti sau să te scufunzi… În fine, fiecare a găsit ceva de făcut pe gustul lui acolo, inclusiv să își completeze micul dejun cu un sendviș uriaș sau o înghețata în asteptarea prânzului. Cea de-a doua grupă a mers la Laser Quest, unde s-au împușcat după pofta inimii. Bonusul a fost că aceasta activitate s-a desfășurat într-un mall imens, iar cei dornici de shopping au putut să petreacă ceva timp și prin magazine. Desigur că timpul a fost insuficient, dar ne-am propus să revenim. 

Imediat după prânz (a fost coadă mare la cantină de data aceasta și nu am mai avut timp să mergem în camere, așa că ne-am propus să identificam orele cu mai puțină aglomerație ca să scurtăm timpul de așteptare) am mers la orele de limba engleza în fabuloasa cladire în stil Victorian. Au fost doua sesiuni de curs, cu jumătate de oră pauză între ele, dar mulți nu au mai ajuns în camere, au preferat să  socializeze în Parcul Peel, zona perfectă pentru relaxare. Orele de engleză au fost interactive, bazate pe discuții, proiecte, cu activități în perechi și echipe, așa cum noi suntem deja obșinuiti să lucrăm.  

Activitatea de seara a fost distractivă și diversă. Am avut de ales între piscină și jocuri de masă la interior sau atelier de dans. Ne-am împărțit fiecare pe unde a vrut, dar se pare că cei care au ales jocurile de masă au tras lozul câștigător. S-a jucat sah, Monopoly, Jenga, jocuri de cărți, s-a pictat pe pietre și s-a modelat cu argilă. Desigur, unii au făcut de toate, mutându-se de la stație la stație, inclusiv de la dans la șah :). A fost super distracție, mai ales ca aveam posibilitatea să alegem muzica… `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1330787151831980&type=3",
        images: [ziua31, ziua32, ziua33, ziua34],
      },
      {
        day: "Ziua 4",
        content: `În a patra zi de tabără deja avem rutina stabilită: ne întâlnim la cazare, mergem la masă, apoi la activitatea de dimineață, prânz, cursuri, activitatea de seara și ziua este gata… În dimineata aceasta luăm autobuzul spre Manchester. Un double-decker aproape gol (nu pentru mult timp că doar noi suntem 45…), așa că mergem la etaj, să avem priveliște. După aprximativ o jumătate de oră ajungem la Muzeul Stiinței și Industriilor unde aflăm despre dezvoltarea orașului industrial Manchester. Aflăm despre modul de viață în Epoca Industrială, despre comerțul cu lână și industria bumbacului, despre prima moară de bumbac care datează din 1780, despre prima șină de cale ferată care leagă Manchestrul de Liverpool în 1830 pentru a înlesni transportul între cele două orașe etc. Aflăm cu stupoare că în a doua jumătate a secolului al XVIII-lea doar jumătate dintre copii atingeau vârsta de doi ani, iar la cinci ani ajungeau doar 104 din 1000. Procente copleșitoare, informații care te tulbură, mașinării de tot felul, o dimineată plină. 

În rest, programul zilnic își urmează cursul obișnuit, iar seara avem din nou de ales între atelierul de jocuri, cel de vopsit tricouri și cel de baking. Ca și data trecută, unii au reușit să participe la mai multe și să lege noi prietenii în timp ce se distrează. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1332021865041842&type=3",
        images: [ziua41, ziua42, ziua43, ziua44],
      },
      {
        day: "Ziua 5",
        content: `Am depășit deja jumătatea timpului pe care îl avem de petrecut la Manchester și nu știm când a trecut...  

În a cincea zi de tabără am mers la Galeria de Artă Whitworth din Manchester. Această galerie, pe langă obișnuitele exponate, are și o parte interactivă, în sensul că am putut să ne punem la încercare talentul artistic cu pensula pe pânză... A fost foarte simpatic, iar unii dintre noi chiar au reușit să contureze ceva cu sens... Ca la orice punct de atracție în Marea Britanie, și aici am găsit o cafenea cu prăjituri spectaculoase. Pe scurt, la această vizită fiecare a găsit ceva de făcut, văzut sau gustat. 

După prânz și cursurile de engleză, am avut o serie de activități în Parcul Peel. Am jucat volei, fotbal, badminton, am sărit coarda sau pur și simplu ne-am distrat la terenul de joacă. Organizatorii au avut și pături, deci cine a dorit a putut și să joace cărți sau se relaxeze pe iarbă cu telefonul în mână ori de vorbă cu prietenii. 

Seara ar fi trebuit să se încheie cu un moment disco, dar au fost ceva probleme tehnice care s-au remediat destul de târziu, când majoritatea copiilor deja se retrăseseră spre camere. Am obținut, totuși, promisiunea că a doua zi să se țină din nou discoteca, speram să nu mai existe probleme.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1332985374945491&type=3",
        images: [ziua51, ziua52, ziua53, ziua54],
      },
      {
        day: "Ziua 6",
        content: `A sosit și mult așteptata zi în care să facem turul ghidat al Stadionului Etihad, faimosul stadion al echipei Manchester City. A fost absolut grandios. Nu doar că am avut acces la stadionul propriu-zis și am putut să facem poze cu gazonul, lojele, am trecut prin tunelul prin care jucătorii intră pe teren, dar am văzut vestiarele, am atins tricourile celor mai faimoși fotbaliști ai lumii, am stat pe bancile pe care se așează și fotbaliștii clubului. Dar punctul de mare atracție al vizitei a fost sala în care se fac conferințele de presă întrucât am putut să facem poze la masă cu Joseph (Pep) Guardiola în persoană. Amintiri unice, emoții de neuitat… Desigur, plecarea a durat mai mult decât am anticipat fiindcă ultima oprire a fost la magazine, de unde fiecare a vrut să plece cu o amintire, mai mult sau mai puțin costisitoare. 

Așa cum ni se promisese, seara am avut disco. Aranjați care mai de care (în special fetele), am dansat și cântat melodii alese de noi sau alții, a fost foarte frumos!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1334672534776775&type=3",
        images: [ziua61, ziua62, ziua63, ziua64],
      },
      {
        day: "Ziua 7",
        content: `În ultima zi de tabără am mers în excursia de o zi la Chester, unul dintre cele mai frumoase orășele din Marea Britanie. Am aflat despre istoria asezării care datează de pe vremea romanilor, când s-a constituit ca o fortăreață militară (79BC) cu numele Deva Victrix. După retragerea romană orașul a fost ocupat de anglo-saxoni, cei care au fortificat pereții cetății pentru a se apăra de raidurile vikingilor. Mai tarziu, cucerirea Normandă a adus orașul sub conducerea ducelui de Chester (de unde și numele), după care localitatea a devenit un port important, pus în umbră de Liverpool abia în secolul al XVIII-lea. Orașul cunoaște un nou moment de dezvoltare în perioada victoriană, din această perioadă datând foarte multe clădiri, care îi și conferă o culoare aparte.  

Vizita noastră a început cu un tur pietonal în centrul Chester-ului, a continuat cu vizitarea faimoasei și grandioasei catedrale, după care am mers la un tur ghidat cu vaporul, când am văzut majoritatea clădirilor emblematice pentru oraș. După ce am vizitat și un edificiu roman, am început lunga plimbare pe cei trei kilometri de ziduri de apărare care încercuiesc orașul. Minunate priveliști pe cel mai bine păstrat și cel mai lung zid de apărare din Marea Britanie. 

Obosiți, dar fericiți, am ajuns în campus chiar la timp pentru o cină mai târzie decât de obicei (cina era în general la ora 18.00). Activitatea de seară a fost opțională, dar toți au ales să aparticipe la jocuri în Peel Parc, doar este ultima seară petrecută în această tabără și trebuie să profităm la maxim de fiecare moment. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1335540731356622&type=3",
        images: [ziua71, ziua72, ziua73, ziua74],
      },
      {
        day: "Ziua 8 - ultima zi de tabără",
        content: `Ultima zi de tabără a fost tristă fiindcă trebuia să ne despărțim de prieteni dragi. După ce am făcut poze în fel și chip cu certificatele primite la curs (am avut și mândria ca două dintre elevele noastre să fie desemnate Student of the Week pentru implicare din timpul cursurilor și cunoștințele de limbă engleză), am vrut neapărat să ne luam la revedere de la toti activity leaders englezi. Fiindcă unii au fost greu de găsit, chiar am întârziat puțin plecarea, noroc că domnul șofer a fost super înțelegător. 

A urmat lunga călătorie înapoi spre casă, cu escală la Amsterdam și mult timp liber la Duty Free, moment tocmai bun să mai cumpărăm câte ceva celor dragi.  `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1336400084604020&type=3",
        images: [ziua81, ziua82, ziua83, ziua84],
      },
    ],
  },

  // Exemplu pentru al doilea jurnal (completezi tu ulterior)
  "moinesti-2025": {
    slug: "moinesti-2025",
    navbarLabel: "JURNAL ENGLISH EXPLORERS CAMP 2025",
    title: "Tabără de limba engleză și aventură în România",
    subtitle: "Jurnal de tabără",
    campus: "Moinești, România",
    dates: "29 iunie – 4 iulie 2025",
    heroImage: moinesti43,
    heroAlt: "Moinești 2024",
    quickInfo: {
      location: "Moinești, România",
      duration: "—",
      ageGroup: "—",
    },
    entries: [{
        day: "Ziua 1",
        content: `La ora 8.00 am pornit din Piata Constitutie catre Moinesti cu entuziasm, asa cum ne sta bine la inceput de tabara :). La ora 11.30 am facut un scurt popas de mancat sandvisuri si intins picioarele, drumul este lung, dar noi rezistam eroic. In autocar facem o multime de jocuri (cultura generala, atentie, rapiditate in gandire etc) ca sa treaca mai repede timpul si sa castigam deja puncte pentru viitoarele echipe. 

Odată ajunși la cazare, in jurul orei 14.00, am luat prânzul. Am avut de ales dintre 3 feluri de ciorbe/supe, 4 preparate din carne (pulpe dezosate in sos la tava, ceafa/piept de pui la gratar si chiftelute de pui), alaturi de diferite garnituri (cartofi piure, prajiti sau la cuptor, paste in sos de smantana si mamaliguta) si salate (de rosii, de varza sau castraveti de vara murati). Am avut si desert o prajitura cu blat de nuca de cocos si crema de ciocolata. Apa minerala si plata la discretie pe mese. Adica destule variante pentru toate gusturile. Si toate gustoase! 

Dupa mai putin de o ora de relaxare in camere, ne-am intalnit in fata salii de conferinte Antonia pentru prima serie de activitati. Am inceput cu 2 jocuri de cunoastere si am continuat cu formarea echipelor si activitati in echipe. A urmat prezentarea blazoanelor si a rolurilor fiecarui co-echipier intrucat in tabara de anul acesta fiecare echipa reprezinta un regat. Inainte de cina am aflat si regulile taberei, ca sa evitam orice neintelegere... 

Cina a fost la fel de varianta si gustoasa ca si pranzul. Am avut snitele, diferite feluri de carne la cuptor, carnati, diferite de tipuri de cartofi, paste, orez, salate si desert. Am mancat pe saturate ca sa avem energie si pentru activitatile de seara. 

Atelierul de seara a fost un TASK RACE care a avut, printre alte sarcini de lucru, si crearea unei coroane reprezentative pentru regatul fiecarei echipe. Intre timp am ramas fara baterie, deci vom completa albumul si cu creatiile celorlalte echipe, dar cu pozele facute cu telefoanele copiilor 🙂. Lucru in echipa cu adevarat! Multumim, copii! 

Seara s-a incheiat cu impartirea stickerelor, ca de obicei. La ora 23.00 era liniste in toate camerele, toata lumea dormea bustean. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1304164541160908&amp;type=3",
        images: [moinesti11, moinesti12, moinesti13, moinesti14],
      },
      {
        day: "Ziua 2",
        content: `A doua zi a început foarte devreme. La ora 7.00 deja era forfotă pe coridoare, deci încalzirea pe ritm de dans a fost exact ceea ce ne trebuia înainte de micul dejun copios și divers, așa cum ne-am obișnuit deja să fie mesele aici. 

Cursurile de limbă engleză au fost împărtițe în două sesiuni cu un sfert de oră pauză între ele. La cursurile de dimineață nu se ține cont de echipe, ci de vârste și nivelul de cunoștințe de limbă engleză, deci avem ocazia să cunoaștem mai bine și alți copii. La cursuri am discutat despre impartanța știintei în viețile oamenilor și am făcut fel de fel de activități interactive plecând de la această temă pentru a ne perfecționa exprimarea în limba engleză și lărgi vocabularul tematic. A fost foarte interesant și totodată instructiv! 

Atelierele de după-amiază au fost super simpatice. La primul, copiii au confecționat prototipul unei invenții care să le facă viața mai ușoară și apoi să îi facă o reclamă ca să îi convingă pe prietenii lor să o cumpere. Am avut de toate: cutii în care introduci tema și o scoți gata efectuata, brățări care îi țin departe pe copiii neprietenoși, dulapuri în care intri în haine obișnuite și ieși îmbrăcat cum îți dorești, poțiuni care îți asortează îmbrăcămintea, imprimante de haine și chiar niște dispozitive de apucat lucrurile de la distanță cu efort minim. Toate inspirate și foarte frumos explicate! Bravo, copii! 

La al doilea atelier i-am provocat pe copii cu proiectarea unei vacanțe pentru o familie cu doi copii. Elementul surpriză a fost ca fiecare echipă a avut o suma diferită la dispoziție. Obiectivul acestei activități a fost să bugeteze o vacanță întrucât educația financiară este bine să înceapă la o vârstă mică, pentru copii este important să știe valoarea banilor. Întrucât știm că nu ei stabilesc destinații, activități, transport și mese în vacanță, le-am dat voie să folosească internetul pentru a afla prețuri realiste.  

Este adevărat că nu este ușor să pleci în vacanta 5 zile cu un buget de 300 euro și că este greu să cheltuiești 5000 euro într-o vacanță la Costinești, dar echipele noastre au reușit. Acum știm că 70 euro este prea puțin pentru benzină până în Grecia și că un bilet la tren până la Mamaia costă mai mult de 5 euro 😅. Cât despre cazări și cheltuiala pentru o masă, prețurile pot varia atât de mult, încât poți găsi soluții pentru diferite bugete. Ceea ce este minunat, dar trebuie sa alegi cu înțelepciune 🥰. Excellent work, teams! 🫶 

Între activitatile de după-amiază și cină am avut ceva timp liber, așa că cei mici s-au dat pe tiroliană câte ture au vrut ei, iar cei mari au jucat ping-pong sau au socializat de voie.  

Activitatea de seară a venit cu provocări pe echipe. Am avut curse cu ștafetă, activități de coordonare (echipa mută paharul cu apă pus pe parașută), dexteritate (lovituri la țintă, aruncă cercul pe trompa elefantului), toate activitățile vizând creșterea unității echipei și credem că au fost un succes. Bravo, echipe! 🥰 `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1305826244328071&type=3",
        images: [moinesti21, moinesti22, moinesti23, moinesti24],
      },
      {
        day: "Ziua 3",
        content: `În cea de-a treia zi am început, ca de obicei :), cu încălzirea (exerciții de înviorare urmate de exerciții mai dinamice și, bineînțeles, de dansurile preferate). După încălzire, copiii au mers în echipe la micul dejun și apoi la cursurile de limbă engleză la care au discutat despre istorie, tema zilei fiind "Explore the Past!". Am discutat despre pirați faimoși și mituri legate de aceștia, evenimente misterioase din trecut, exploratori cunoscuți sau animale preistorice.  

După prânz, am plecat cu autocarul să vizităm orașul Bacău, unde am văzut Casa Memorială "George Bacovia", locul unde acesta a compus aproape toata opera care l-a consacrat. Copiii au descoperit istoria familiei poetului cu ajutorul doamnei ghid, care le-a povestit într-un mod captivant anecdote din viața lui și chiar ne-a pus o înregistrare cu vocea poetului recitând "Amurg violet".  

Înainte de a pleca înapoi spre hotel, am poposit pe Insula de agrement de pe Râul Bistrița, o alta mândrie locală, si ne-am răcorit cu înghețată sau suc, după preferințe. A urmat cina și activitatea de seară "Team Feuds", o adaptare a celebrului show "Ce spun românii?". Echipele noastre s-au duelat amical în cuvinte și idei, desigur că în limba engleză, deci toată lumea a ieșit câștigătoare :). Bravo, echipe! 💪 `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1306676177576411&type=3",
        images: [moinesti31, moinesti32, moinesti33, moinesti34],
      },
      {
        day: "Ziua 4",
        content: `În cea de-a patra zi de tabără am explorat artele. La grupele de limbă engleză cu elevi mari și nivel bun de cunoaștere a limbii engleze am tradus poezii de George Bacovia in grupuri de 3 copii, desigur fiind inspirați de vizita din ziua anterioară. La cei mai micuți am discutat despre artele vizuale, despre muzica și dans, teatru și cinematografie, după cum ne-au ghidat doamnele profesoare. Desigur că ne-am demonstrat abilitățile practice în activități în perechi și grupuri mici, așa cum ne stă bine să facem în tabără. 

După prânz am făcut o scurtă excursie întrucât este păcat să ajungi într-un loc nou și să nu vezi ce îți oferă zona. Astfel, am vizitat două obictive emblematice pentru zona (supranumită și Valea Loarei de România), primul fiind Castelul Ghika de la Dofteana, care a fost construit la 1894 cu rol de casă de vânătoare, iar în timpul comunismului a fost utilizat ca spital de boli pulmonare, și ulterior orfelinat și internat pentru copii. Al doilea obiectiv a fost Palatul Ghika de la Comănești, construit în anul 1890, în stilul baroc târziu şi eclectic, de ,,meşteri italieni’’ la comanda proprietarului moşiei, Dimitrie Ghika. Parcul si palatul au fost resedinta familiei pana in 1946, dupa care a primit numeroase destinatii care au dus la degradarea acestuia. Acum în palat functioneaza Muzeul de Etnografie si Arta.  

La întoarcerea din excursie, cine a mai avut energie înainte de cină a făcut o baie grozavă în piscina interioară sau a petrecut timp de calitate cu prieteni dragi la locul de joacă.  

Activitatea de seară a fost foarte creativa. În echipe a trebuit să confecționăm un pom din hărtie rulată și să prezențăm povestea copacului, desigur ținând cont de mai multe elemente cheie. A fost foarte simpatic, dar deloc simplu de realizat. Provocare acceptata, reușită sigură. Bravo, copii! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1307487994161896&type=3",
        images: [moinesti41, moinesti42, moinesti43, moinesti44],
      },
      {
        day: "Ziua 5",
        content: `Penultima zi de tabără a fost fabuloasă întrucât a fost dedicată sporturilor. La cursurile de dimineață am discutat despre sport și beneficiile lui și chiar am inventat un sport sau luat parte la diferite probe sportive, în funcție de vârstă și interesul participanților.  

Dupa-amiaza a fost efervescentă întrucât am petrecut-o la piscina exterioară, unde am avut parte și de petrecere cu muzică și multă, multă spumă. Ca sa nu mai povestim că am primit și înghețată sau sucuri din partea casei, ca să fie petrecerea petrecere adevărată. 

Seara a fost și ea grandioasă. După spectacolul de talente (și ce copii talentași am avut!!!) a urmat focul de tabără cu muzică și popcorn, apoi dans și scris mesaje pe șepci, în hohote de râs și plâns întrucât știm că este ultima seara împreună… Cel puțin ultima din acest an școlar întrucât sigur vom reveni aici și vara viitoare! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1312885916955437&type=3  ",
        images: [moinesti51, moinesti52, moinesti53, moinesti54],
      },
      {
        day: "Ziua 6",
        content: `Ultima zi de tabăra a început tot cu mișcare, ca să avem energie toată ziua . După micul dejun a urmat ultima serie de puncte pentru echipe pentru a putea face clasamentul. Știm de acum, toate echipele au ieșit căștigătoare dacă pleacă din tabără îmbogățiți la minte și suflet, cu noi abilități învățate, mai responsabili și cu un bagaj mare de jocuri pe care să le incerce și cu prietenii  de acasă. 

A urmat festivitatea de înmânare a certificatelor și tradiționala poză de grup, ca să avem dovada că au fost în tabără. Ce frumos a fost totul… 

Cu tristețe că s-a terminat, dar bucuria că va urma și o data viitoare, ne ducem bagajele la autocar și ne îmbarcăm pentru drumul lung de întoarcere acasă. Pe drum, cu acordul părinților, oprim pentru o masa mult râvnită la KFC ca să ne consumăm și ultimii banuți de buzunar, pe care i-am păstrat cu grijă întrucât în tabără oricum nu am avut pe ce sa ii cheltuim. In jurul orei 18.00 am ajuns din nou în Piața Constitutiei, de unde ne-au preluat dragii noștri părinți. Bravo, echipe! Pe vara viitoare! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1315176926726336&type=3",
        images: [moinesti61, moinesti62, moinesti63, moinesti64],
      },],
  },
  "predeal-2024": {
    slug: "predeal-2024",
    navbarLabel: "English Explorers Camp – Predeal 2024",
    title: "Tabără de limba engleză și aventură în România",
    subtitle: "Jurnal de tabără",
    campus: "Predeal, România",
    dates: "30 iunie – 05 iulie 2024",
    heroImage: predeal13,
    heroAlt: "Predeal 2024",
    quickInfo: {
      location: "Predeal, România",
      duration: "—",
      ageGroup: "—",
    },
    entries: [{
        day: "Ziua 1",
        content: `Prima zi de tabără a început devreme. La ora 8.00 eram deja în Piața Constitutiei, pregătiți să ne
îmbarcăm în autocar și să începem aventura!
Ne-am oprit mai întâi la Conacul Bellu din Urlați, pe care l-am vizitat împărțiți în două grupe întrucât
eram prea mulți pentru camerele micuțe. Unii au vizitat foișorul, iar ceilalți conacul propriu-zis. Am
văzut o expoziție de obiecte din epoca eneolotică, precum și obiecte din colecția personală a lui
Alexandru Bellu. Tot aici am mâncat și prânzul împachetat de acasă. Am vizitat crama, unde am văzut
instrumentele de preparare a vinului, dar și butoaiele de depozitare. După plecare, în autocar, am
răspuns la tot felul de întrebări, demonstrând că am fost atenți. Desigur că a contat și faptul că vom
primi puncte pentru echipele viitoare :).
Următoarea oprire a fost la Casa memorială George Enescu. Am aflat detalii despre viața faimosului
compozitor, despre importanța activității sale pentru familia regală, am putut observa cum trăia
maestrul alături de soția sa, am văzut prima vioară a acestuia, primită la doar 4 ani și am audiat un
fragment din Prima Rapsodie Română într-un spațiu special amenajat pentru evenimente din fostul
garaj al familiei Enescu.
Am ajuns la cazare în jurul orei 14.30, încântați, dar flămânzi. Am înfulecat o supă de pui cu tăieței,
apoi cărniță de porc la tava, cu orez și salata de varza, urmate de o porție de fructe (pepene rosu si
caise). Ne-am instalat în camere, ne-am odihnit puțin, apoi ne-am strâns pe teren pentru activitățile
introductive. Am aflat mai multe despre ceilalți copii, am fost împărțiți în echipe și ni s-au testat
cunoștințele despre coechipieri/atenția.
Următoarea activitate a fost prezentarea regulilor taberei și am avut ocazia să punem întrebări
pentru a ne asigura că toate informațiile ajung la fiecare exact cum trebuie. Cina a fost bine venită la
ora 19.30, când ne-am bucurat de un șnițel de pui cu piure și o porție de clătite cu înghețată. Seara
am fost provocați atât fizic, cât și mental pentru a câștiga puncte pentru echipele noastre. Am sărit
peste obstacole, am participat în curse de mai multe feluri, ne-am întrecut în rezistență, ne-am testat
memoria, puterea fizică și dexteritate. Înainte de culcare, eforturile ne-au fost răsplătite cu stickere.
La ora 23.00 toată lumea era în pat, mulți copii deja în tărâmul viselor.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1027486752162023&amp;type=3",
        images: [predeal11, predeal12, predeal13, predeal14],
      },
      {
        day: "Ziua 2",
        content: `După un somn bine meritat, ne-am trezit înainte de ora programată, nerăbdători să ieșim afară la aer
curat. Am început ziua cu un moment de încălzire și înviorare. Alexandra ne-a îndrumat să executăm
mai multe exerciții și două dansuri, astfel încât la ora 9.00, la micul dejun, eram cu toții flămânzi. Am
avut de ales între tot felul de legume proaspete, salată de vinete, zacuscă, cremă de brânză, brânză și
cașcaval, mezeluri și crenvurști, omletă și ouă fierte, unt, gem, cereale de două feluri, iaurt ceai și alte
bunătăți.

A doua zi de tabără a fost ”Explore Imagination” și la cursurile de engleză inventat povești,
reinterpretând opere de artă și creând propriile noastre lucrări artistice. La prânz am mâncat ciorbă
de văcuță, apoi cărniță de pui în sos roșu cu mămăligă și salată. Yummy!
După-amiază am fost împărțiți în trei grupuri, în funcție de vârstă, pentru a ne bălăci în piscină. Am
avut mingiuțe și batoane din spumă, am înotat, ne-am întrecut la meciuri de polo, ba chiar unii dintre
noi am învățat tehnici noi. Între timp, cei care își așteptau rândul la piscină au participat la ateliere
artistice de tot felul, dar toate din aria artistică desen, creare de jocuri sau benzi desenate,
confecționare rame sau creare de benzi desenate. La gustarea de după-amiază am primit nectarine,
pe care le-am devorat instantaneu.
Pentru activitatea de seară am fost provocați să rămânem pe tărâmul imaginației și să ne folosim de
întreaga echipă, de la mic la mare, pentru a găsi sau a confecționa tot felul de obiecte magice,
precum ochelarii rupți ai lui Harry Potter, aripa unei zâne sau ochiul unui căpcăun. A trebuit să
inventăm povești despre cum am intrat în posesia acestor obiecte și să convingem juriul că sunt cât
se poate de reale. Incredibil, toate echipele au fost triumfătoare și au adus toate cele zece obiecte
cerute. Adevărul este ca nu strică să ai la îndemână o sabie cu laser sau un ou de dragon... Mai mult,
poveștile noastre au fost atât de elaborate încât nici nu am mai avut timp de ceremonia sticker-elor,
rămânând să le primim a doua zi de dimineață.
Ne-am retras în camere puțin după ora 22.00 și până la 23.00 dormeam adânc, probabil visând la
personajele fantastice si animalele mitologice care ne-au animat seara.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1028111892099509&amp;type=3",
        images: [predeal21, predeal22, predeal23, predeal24],
      },
      {
        day: "Ziua 3",
        content: `După rutina de dimineață (încălzire și mic dejun), la cursurile de limbă engleză am discutat despre
științe, tematica zilei fiind Explore Science. Cu cei mai mici am făcut experiențe pentru a observa
transformările din natură cu ochii noștri, iar la grupele mai mari am discutat despre ultimele
descoperiri, am inventat dispozitive care să ajute viața omului și am încercat să ghicim ce ne va aduce
viitorul.
La primul atelier de după-amiază, echipele au fost provocate să își folosească imaginația și
cunoștințele pentru a proiecta un pod folosind un număr limitat de materiale reciclabile și orice
elemente care puteau fi culese din natură fără a o răni. Puteți admira în imaginile alăturate proiectele
copiilor. Toate minunate!
La al doilea atelier, echipelor li s-a prezentat un scenariu apocaliptic în care omenirea trebuia să
găsească o altă planetă locuibilă. Micii noștri cercetători trebuie să descrie condițiile de viață de
acolo și să explice cât de ușor i-ar fi omenirii să populeze respectiva planetă! Excellent work, teams!
Ziua a treia de tabără a fost una specială întrucât prima repriză din meciul România-Olanda s-a
desfășurat în timpul cinei și am observat cât de mulți microbiști avem printre noi. După cină, nu am
avut altă opțiune decât să continuăm vizionarea meciului în sala de conferință. Dezamăgirea a fost
mare la finalul celei de a doua repriză, dar ne-am revenit repede la trei runde de întrebări despre
științe. Felicitări tuturor echipelor!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1029430115301020&amp;type=3",
        images: [predeal31, predeal32, predeal33, predeal34],
      },
      {
        day: "Ziua 4",
        content: `Cea de-a patra zi de tabără a fost foarte ploioasă. A plouat torențial dimineața, așa că încălzirea s-a
făcut în premieră în sala de conferințe. Nu a fost ideal, dar, cu putina creativitate, orice este posibil.
A plouat si in timpul atelierelor de limba engleza de dimineata. Totuși în scurtele momente în care s-a
înseninat, am putut să ieșim în curte pentru un joculeț, două. După-amiaza a plouat continuu, deci a
trebuit să găsim soluți de ateliere care să se poată desfășura la interior, Astfel, ne-am intrecut în
talente și abilități, am aplaudat, ne-am mirat, am comentat și ne-am distrat de minune, în ciuda
vremii.
Activitatea de seară a fost Fashion Show. Prima provocare a serii a fost ca membrii echipelor să
lucreze individual sau împreună pentru a lega șireturile de la adidași într-un mod anume, mai
complicat decât un model obișnuit. Primele trei echipe care au reușit să lege șireturile și-au putut
alege un element în plus pentru proba următoare. La proba principală a serii, copiii au primit un săcut
cu diferențe obiecte reciclate, din care să confecționeze o ținută de gală pentru un membru al
echipei. Provocarea a presupus și să aleagă o melodie pe care să defileze pe scena improvizată,
precum și să creeze o poveste a ținutei: cum le-a venit ideea, cine sunt designerii fiecărui obiect
vestimentar, cine este modelul/make-up artistul etc. Felicitări, copii! Sunteți super creativi, iar
prezentările voastre în limba engleză au fost super convingătoare! Great work, teams!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1032985534945478&amp;type=3",
        images: [predeal41, predeal42, predeal43, predeal44],
      },
      {
        day: "Ziua 5",
        content: `Penultima zi de tabără a fost plină. După încălzirea de dimineață și cursurile de limbă engleză, primul atelier de după-amiază a fost "Trainer for 15 minutes". Micii noștri traineri i-au învățat pe prietenii lor cum să deseneze un măr care să arate foarte real, un chip de fată, benzi desenate etc. Alții au avut ateliere de japoneză, șah, de fotbal, karate, bătut la tobe, dans, gimnastică, scrimă și multe altele. Colega noastră din Turcia le-a prezentat copiilor un instrument muzical tradițional și le-a cântat câteva cântece la acest instrument și voce. Felicitări tuturor pentru felul în care ați reușit să împărtășiți cu ceilalți din cunoștințele și pasiunile voastre! 🥳  

Al doilea atelier a fost de o provocare pe echipe. Copiii au trebuit să creeze un movie trailer pornind de la cuvinte cheie. Nu a fost o misiune ușoară, dar, cu energie și creativitate, toate echipele au reușit să producă un scurt filmuleț care să includă toți membrii și să răspundă sarcinilor de lucru. 💖  

Ca în fiecare ultimă seară, copiii s-au întrecut în etalarea talentelor. Am avut de toate! De la dans și cântec la demonstrații de karate, scrimă, prezentări de desen sau desene executate pe loc, scenete și glume, rezolvări de cuburi Rubics etc. Mulțumiri și prezentatorilor noștri, ați fost foarte inspirați cu toții! 💖  

A urmat focul de tabără, cu cântece la chitară și voce. Tehnologia ne-a ajutat să urmărim versurile și distracția a culminat cu dansul pinguinului și o horă, la cererea copiilor, desigur :). A fost o atmosferă grozavă! Bravo, copii! Ne bucurăm să vedem că știți să vă distrați și să trăiți momente de poveste în tabără! 💖 
`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1035027158074649&type=3 ",
        images: [predeal51, predeal52, predeal53, predeal54],
      },
      {
        day: "Ziua 6",
        content: `Ca orice lucru în viață, tot ce începe trebuie să se și termine... Cu promisiunea revederii, ne-am primit diplomele, am făcut poze cu echipa, ne-am scris mesaje pe șepcuțe, am schimbat numere de telefon și ne-am dus bagajul la autocar. Ce frumos a fost totul...  

Pe drumul de întoarcere, am facut un scurt popas la benzinărie pentru o gustare ca se făcuse ora prânzului. Ce bine că am avut voie să ne cumparam ce vrem... Nu chiar orice și nici oricât :) doar știm că părinții ne așteaptă acasă cu bunătăți pe masă, iar regulile taberei în privința alimentației sănătoase se aplică și acum...  

Ultima vizita a fost la Casa de Târgoveț "Hagi Prodan”, unde domnul muzeograf ne-a vorbit despre povestea celei mai vechi case din Ploiești (1785), care are a supravieţuit vremii, vremurilor şi chiar bombardamentelor din timpul celui de-al Doilea Război Mondial. Am primit informații despre ce înseamnă "hagiu" și despre obiceiurile oamenilor din secolele XVIII-XIX, influențele orientului asupra culturii române etc. Tabăra s-a terminat, dar nu și vacanta! Dragi copii, vă dorim o vacanță plină de amintiri plăcute! Pe vara viitoare! Ați fost minunați! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1035516414692390&type=3  ",
        images: [predeal61, predeal62, predeal63, predeal64],
      },],
  },
};

export const journalList = Object.values(journals);
export type JournalSEO = {
  title: string;
  description: string;
  image: string;
};

export const getJournalBySlug = (slug: string) => journals[slug];

export const getJournalSEO = (journal: Journal): JournalSEO => {
  const title = `${journal.navbarLabel} | Pro Erudio`;

  const description =
    journal.campus && journal.dates
      ? `${journal.title}. Descoperă jurnalul de tabără din ${journal.campus}, desfășurat în perioada ${journal.dates}.`
      : `${journal.title}. Descoperă activități, experiențe și momente reale din jurnalul de tabără Pro Erudio.`;

  const image = journal.heroImage
    ? `https://tabere.proerudio.ro${journal.heroImage}`
    : "https://tabere.proerudio.ro/og/herohome.jpeg";

  return {
    title,
    description,
    image,
  };
};