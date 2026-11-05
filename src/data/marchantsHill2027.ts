import type { CampConfig } from "./campsData";
import hero from "@/assets/tabara-ProErudio-marchants-hill-2027-centru-in-natura.webp";
import centre from "@/assets/tabara-ProErudio-marchants-hill-2027-cladire-centru.webp";
import bethany from "@/assets/tabara-ProErudio-marchants-hill-2027-cazare-bethany-house.jpg";
import aerial from "@/assets/tabara-ProErudio-marchants-hill-2027-vedere-aeriana.jpg";
import climbing from "@/assets/tabara-ProErudio-marchants-hill-2027-escalada.jpg";
import menu from "@/assets/tabara-ProErudio-marchants-hill-2027-meniu-orientativ.jpg";
import giantSwing from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-leagan-la-inaltime.webp";
import teamClimbing from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-catarare-in-echipa.webp";
import lake from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-lac-activitati-nautice.webp";
import accommodationPdf from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-cazare-balcoane.webp";
import diningRoom from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-intrare-sala-de-mese.webp";
import buffet from "@/assets/marchants-hill/tabara-ProErudio-marchants-hill-2027-bufet-sala-de-mese.webp";

export const marchantsHill2027 = (registrationInfo: CampConfig["registrationInfo"]): CampConfig => ({
  slug: "tabara-marea-britanie-marchants-hill-2027",
  year: 2027,
  campName: "Marchants Hill Activity Centre",
  hero: {
    badge: "Tabără internațională 2027",
    title: "Tabără în Marea Britanie – Marchants Hill Activity Centre",
    image: bethany,
    imageAlt: "Bethany House la Marchants Hill Activity Centre",
    expanded: true,
    objectPosition: "50% 100%",
  },
  quickInfo: {
    location: "Marchants Hill Activity Centre",
    duration: "8 zile / 7 nopți",
    ageGroup: "11–16 ani",
    dates: "24–31 iulie 2027",
    price: "790 GBP",
  },
  about: {
    title: "Despre tabără",
    paragraphs: [
      "Și anul acesta vă propunem o tabără internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singura diferență este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
      "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
    ],
  },
  highlights: [
    "Cursuri de engleză cu profesori vorbitori nativi (dacă se aplică)",
    "Aventură: activități outdoor & indoor",
    "Jocuri și competiții în echipă",
    "Seri tematice și activități de socializare",
    "Excursii la obiective locale",
    "Suport complet și însoțitori",
  ],
  locationDescription: {
    title: "Centrul de activități Marchants Hill",
    description: "Marchants Hill Activity Centre este unul dintre cele mai mari centre de aventură și activități în aer liber administrate de PGL Travel în Anglia și dispune de 730 de locuri de cazare. Acest centru este destinat în special copiilor, adolescenților și grupurilor școlare, inclusiv elevilor internaționali care participă la tabere educaționale.",
    details: {
      paragraphs: [
        "Centrul se află într-o zonă împădurită de aproximativ 18 hectare (45 acres), aproape de rezervația naturală Devil’s Punch Bowl, una dintre cele mai frumoase zone din sudul Angliei, și are o poziție convenabilă pe hartă: la maximum două ore de Londra (cu autocarul) și destul de aproape de obiective turistice importante, precum Castelul Windsor, faimosul oraș universitar Oxford și orașul-port Portsmouth.",
        "Centrul de activități cuprinde 24 de zone de aventură: terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție de plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană și trasee prin tuneluri. Acestea sunt întinse pe suprafețe enorme, care cuprind lacuri și păduri.",
      ],
    },
    image: aerial,
    imageAlt: "Vedere aeriană a centrului Marchants Hill și a terenurilor de sport",
  },
  locationFacilities: [],
  includedInPrice: ["O excursie de o zi și o excursie de o jumătate de zi în sudul Angliei"],
  notIncludedInPrice: [
    "Transport avion (250–350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
    "Transfer de la/la aeroport în campus (se calculează în funcție de numărul copiilor înscriși la tabără și se achită cu o lună înaintea plecării)",
    "Asigurare storno/de călătorie",
  ],
  activitiesDescription: "Programul include zilnic 3 ore de cursuri de limba engleză, dimineața sau după-amiaza, în funcție de nivelul stabilit prin testul de plasare și de disponibilitatea organizatorilor PGL. Activitățile de aventură sunt concepute atât pentru participare individuală, cât și pentru lucrul în echipă. Activitățile exacte din săptămâna taberei vor depinde de programul centrului.",
  activityImages: [climbing, centre],
  sections: [
    { type: "textImage", placement: "afterLocation", title: "Cazare și masă", paragraphs: ["Cazarea se face în cabane moderne, cu băi proprii, în general în camere de 4–6 persoane pentru elevii internaționali.", "Sunt oferite trei mese pe zi, inclusiv opțiuni vegetariene și meniuri adaptate alergiilor sau altor cerințe alimentare."], src: hero, alt: "Marchants Hill Activity Centre, în mijlocul naturii", extraImage: { src: diningRoom, alt: "Intrarea în sala de mese de la Marchants Hill" } },
    { type: "activityCards", groups: [
      { title: "Activități de aventură", theme: "adventure", items: ["Abseiling", "Aeroball", "Archery", "Buggy Building", "Canoeing", "Challenge Course", "Climbing", "Crate Challenge", "Fencing", "Giant Swing", "Jacob’s Ladder", "Orienteering", "Problem Solving", "Raft Building", "Sensory Trail", "Survivor", "Trapeze", "Vertical Challenge", "Zip Wire"] },
      { title: "Activități de seară", theme: "evening", items: ["Ambush", "Campfire", "Capture the Flag", "Disco", "Passport to the World", "PGL Sports Night", "Photo Challenge", "Robot Wars", "Quiz Show", "Snap Shot", "Splash", "Wacky Races"] },
    ] },
    { type: "gallery", images: [
      { src: giantSwing, alt: "Participanți la activitatea Giant Swing la Marchants Hill" },
      { src: teamClimbing, alt: "Cățărări în echipă la Marchants Hill" },
    ] },
    { type: "gridBullets", title: "Excursii incluse în prețul taberei", columns: 2, cards: [
      { subtitle: "Excursie de o zi – destinații posibile", items: ["Londra: Big Ben, Buckingham Palace, London Eye și muzeele orașului, în funcție de itinerariul ales.", "Oxford: oraș universitar renumit, cu arhitectură istorică și colegii celebre."] },
      { subtitle: "Excursie de o jumătate de zi – destinații posibile", items: ["Windsor: oraș cunoscut pentru Castelul Windsor, una dintre cele mai importante reședințe regale britanice.", "Portsmouth: nave istorice, muzee maritime și zona portului.", "Canterbury: oraș medieval cunoscut pentru catedrala sa și străzile istorice."] },
    ] },
    { type: "note", text: "Programul include o excursie de o zi și una de o jumătate de zi. Destinațiile prezentate sunt opțiuni posibile; itinerariul final va fi stabilit de organizatori." },
  ],
  galleries: { other: [
    { src: bethany, alt: "Bethany House, Marchants Hill" },
    { src: lake, alt: "Lacul pentru activități nautice de la Marchants Hill" },
    { src: accommodationPdf, alt: "Clădiri de cazare cu balcoane la Marchants Hill" },
    { src: buffet, alt: "Bufet cu salate și preparate în zona de masă PGL" },
  ] },
  discounts: [],
  otherCamps: [],
  programImage: { src: "", alt: "" },
  menuImage: { src: menu, alt: "Meniu orientativ PGL" },
  registrationInfo,
  requiredDocuments: [],
  form: { selectValue: "Marchants Hill 2027", selectLabel: "Tabără în Marea Britanie – Marchants Hill Activity Centre 2027" },
  visibility: { showProgramImage: false, showLuggageImage: false, showOtherCamps: false, showRequiredDocs: false, showDiscounts: false, showPriceDetails: false },
});
