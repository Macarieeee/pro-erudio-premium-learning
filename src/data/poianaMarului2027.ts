import type { CampConfig } from "./campsData";
import { BedDouble, Bath, Utensils, Trophy, Trees, PawPrint } from "lucide-react";
import hero from "@/assets/PoianaMarului2026.jpg";
import location from "@/assets/PoianaMaruluiAbout.jpeg";
import groupActivities from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-activitati-de-grup.webp";
import campfire from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-foc-de-tabara.webp";
import memories from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-amintiri-2026.webp";
import marchantsHill from "@/assets/tabara-ProErudio-marchants-hill-2027-cazare-cabane.webp";

export const poianaMarului2027 = (registrationInfo: CampConfig["registrationInfo"]): CampConfig => ({
  slug: "tabara-poiana-marului-2027",
  year: 2027,
  campName: "Tabăra de engleză și aventură – Poiana Mărului",
  hero: { badge: "English Explorers Camps 2027", title: "Tabăra de engleză și aventură – Poiana Mărului", image: hero, imageAlt: "Poiana Mărului Ranch, județul Brașov", objectPosition: "70% 80%" },
  quickInfo: { location: "Poiana Mărului Ranch, județul Brașov", duration: "6 zile / 5 nopți", ageGroup: "7–14 ani", dates: "18–23 iulie 2027", price: "2.380 Lei – preț promoțional" },
  about: {
    title: "English Explorers Camps",
    paragraphs: [
      "6 zile de aventură, prietenii noi și engleză învățată cu zâmbetul pe buze! Fiecare dimineață începe cu energie, fiecare activitate aduce o nouă provocare, iar limba engleză devine parte din joacă, explorare și distracție.",
      "La Poiana Mărului, copiii lasă în urmă rutina zilnică și descoperă o lume plină de aventură, creativitate, competiții amuzante și prietenii care pot dura o viață.",
      "Totul într-un cadru natural spectaculos, sub îndrumarea profesorilor de limba engleză și a trainerilor internaționali de la Pro Erudio School of English. Mai mult decât o tabără: o experiență care îi ajută să crească!",
    ],
  },
  highlights: ["Ateliere interactive de limba engleză", "Aventură în natură și provocări pe echipe", "Activități creative, sportive și seri tematice", "Excursii culturale și prietenii noi"],
  locationDescription: {
    title: "Aventură în inima naturii",
    description: "Situată într-un peisaj montan de poveste, la aproximativ 900 m altitudine, Pensiunea Poiana Mărului Ranch oferă cadrul ideal pentru o vacanță activă, departe de agitația orașului.\n\nAer curat, păduri, peisaje spectaculoase și spații generoase pentru joacă și activități în aer liber – ingredientele perfecte pentru o experiență de neuitat!\n\nCopiii vor fi cazați într-o pensiune clasificată cu patru margarete, cu camere dotate cu baie proprie, restaurant, teren de sport multifuncțional, loc de joacă, curte interioară și o mică fermă de animale. Aici, confortul se îmbină cu farmecul naturii.",
    image: location, imageAlt: "Pensiunea Poiana Mărului Ranch",
  },
  locationFacilities: [
    { icon: BedDouble, label: "Pensiune de patru margarete" },
    { icon: Bath, label: "Camere cu baie proprie" },
    { icon: Utensils, label: "Restaurant" },
    { icon: Trophy, label: "Teren de sport multifuncțional" },
    { icon: Trees, label: "Loc de joacă și curte interioară" },
    { icon: PawPrint, label: "Mică fermă de animale" },
  ],
  includedInPrice: [
    "6 zile și 5 nopți de cazare cu pensiune completă.",
    "Transport cu autocarul București – Poiana Mărului – București.",
    "Program zilnic de limba engleză susținut de profesori Pro Erudio și traineri internaționali.",
    "Ateliere creative, culturale, sportive și de aventură.",
    "Activități de seară și competiții pe echipe.",
    "Vizite la Conacul Pană-Filipescu și Casa Memorială George Enescu.",
    "Drumeție în pădure și activități de construire a adăposturilor.",
    "Diplomă de participare, fotografii și șapca echipei pentru fiecare copil.",
    "Medalii pentru echipa câștigătoare.",
  ],
  notIncludedInPrice: ["Cheltuielile personale."],
  activitiesDescription: "În tabăra English Explorers, limba engleză înseamnă comunicare, curaj, spontaneitate și descoperire! Diminețile sunt dedicate atelierelor interactive, în care copiii învață prin jocuri, provocări, conversații și activități de grup.\n\nDupă-amiezile și serile continuă cu activități în limba engleză coordonate de profesori, traineri internaționali și animatori. Engleza este folosită în situații reale, într-un mediu relaxat și motivant.\n\nLa atelierele de după-amiază, copiii sunt organizați în echipe de aproximativ 7–9 participanți. Competițiile prietenoase, misiunile și provocările creative dezvoltă inițiativa, responsabilitatea și încrederea în sine.",
  activityImages: [groupActivities, campfire],
  sections: [
    { type: "benefitCard", title: "Engleza prinde viață!", items: ["Copiii vorbesc în engleză cu mai multă încredere și naturalețe.", "Își îmbogățesc vocabularul prin experiențe practice.", "Reacționează spontan la instrucțiuni și provocări în limba engleză.", "Comunică și colaborează cu ceilalți într-un mediu relaxat și motivant."] },
    { type: "gridBullets", title: "Ce aventuri îi așteaptă?", columns: 2, cards: [
      { subtitle: "Exploratori în natură", items: ["Drumeții prin pădure, construirea de adăposturi în echipă și provocări inspirate din tehnicile de supraviețuire. Copiii descoperă natura, își testează ingeniozitatea și învață să lucreze împreună."] },
      { subtitle: "Detectivi și vânători de comori", items: ["Treasure Hunt, Scavenger Hunt, Escape Rooms, misiuni secrete și competiții contra cronometru. Fiecare echipă are o strategie, iar fiecare copil poate contribui la victorie!"] },
      { subtitle: "Artiști și creatori", items: ["Pictură în natură, origami, confecționare de bărcuțe, colivii și parașute, modelaj, teatru și provocări creative."] },
      { subtitle: "Campioni ai distracției", items: ["Fotbal, volei, baschet, dodgeball, Capture the Flag, ștafete și jocuri dinamice în aer liber. Mișcare, energie și fair-play!"] },
      { subtitle: "Vedetele serii", items: ["Talent Show, Karaoke, Quiz Night, Hogwarts Express, Chaos Games și seri tematice pline de surprize.", "Serile reunesc întregul grup, oferindu-le copiilor ocazia să socializeze, să râdă și să creeze amintiri împreună."] },
    ] },
    { type: "benefitCard", theme: "excursions", title: "Descoperim și explorăm România!", items: ["Conacul Pană-Filipescu, Filipeștii de Pădure – file de poveste din istoria României.", "Casa Memorială George Enescu, Sinaia – o experiență culturală acasă la faimosul compozitor."] },
    { type: "gridBullets", title: "Ce câștigă copilul tău din această experiență?", columns: 2, cards: [
      { subtitle: "Mai multă independență", items: ["Copiii învață să se descurce în situații noi, să ia decizii și să devină mai responsabili."] },
      { subtitle: "Mai multă încredere în sine", items: ["Fiecare provocare depășită, idee exprimată și reușită le oferă curaj să încerce lucruri noi."] },
      { subtitle: "Prieteni noi și spirit de echipă", items: ["Învață să comunice, să asculte, să colaboreze și să se bucure împreună de succes."] },
      { subtitle: "Engleză folosită cu naturalețe", items: ["Prin interacțiuni zilnice și activități captivante, limba engleză devine un instrument firesc de comunicare."] },
      { subtitle: "Amintiri care rămân", items: ["Experiențe autentice, aventuri, râsete și povești pe care le vor împărtăși cu entuziasm la întoarcerea acasă."] },
    ] },
    { type: "bullets", title: "Cum arată o zi în tabără?", items: ["08:00–09:00 – Trezire, înviorare și mic dejun", "09:45–12:45 – Ateliere interactive de limba engleză", "13:00–15:00 – Prânz și timp liber", "15:00–18:30 – Ateliere creative, sportive și de aventură", "19:00–19:30 – Cină", "20:00–22:00 – Jocuri de grup, seri tematice și disco", "22:30 – Stingerea"] },
    { type: "note", text: "Programul este orientativ și poate fi adaptat în funcție de condițiile meteo și de activitățile planificate." },
    { type: "image", title: "Amintiri din ediția 2026", src: memories, alt: "Colaj cu activități și participanți la tabăra ProErudio Poiana Mărului 2026", compact: true },
    { type: "richText", title: "O vară plină de povești începe aici!", paragraphs: ["În taberele English Explorers, copiii descoperă că pot mai mult decât credeau, că engleza poate fi distractivă și că cele mai frumoase aventuri sunt cele trăite împreună.", "6 zile. Nenumărate provocări. Prietenii noi. Amintiri pentru o viață!"] },
  ],
  discounts: [],
  otherCamps: [{ name: "Marchants Hill Activity Centre 2027", location: "Marea Britanie", type: "Engleză și aventură", image: marchantsHill, to: "/tabara-marea-britanie-marchants-hill-2027" }],
  programImage: { src: "", alt: "" },
  registrationInfo,
  requiredDocuments: [],
  form: { selectValue: "Poiana Mărului 2027", selectLabel: "Tabăra de engleză și aventură – Poiana Mărului 2027" },
  visibility: { showProgramImage: false, showLuggageImage: false, showDiscounts: false, showRequiredDocs: false },
});
