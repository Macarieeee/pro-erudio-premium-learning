import extraMemories from "@/assets/poiana-marului/1.2.png";
import morningActivities from "@/assets/poiana-marului/20260713_084443.jpg";
import type { CampConfig } from "./campsData";
import { BedDouble, Bath, Utensils, Trophy, Trees } from "lucide-react";
import { TerraceIcon } from "@/components/icons/TerraceIcon";
import hero from "@/assets/poiana-marului/20260716_193314.jpg";
import playground from "@/assets/poiana-marului/20260715_094705.jpg";
import cookingWorkshop from "@/assets/poiana-marului/20260715_152714.jpg";
import teamGames from "@/assets/poiana-marului/20260715_180540.jpg";
import location from "@/assets/PoianaMaruluiAbout.jpeg";
import groupActivities from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-activitati-de-grup.webp";
import campfire from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-foc-de-tabara.webp";
import memories from "@/assets/poiana-marului/tabara-ProErudio-poiana-marului-amintiri-2026.webp";
import marchantsHill from "@/assets/tabara-ProErudio-marchants-hill-2027-cazare-cabane.webp";

export const poianaMarului2027 = (registrationInfo: CampConfig["registrationInfo"]): CampConfig => ({
  slug: "tabara-poiana-marului-2027",
  year: 2027,
  campName: "Tabăra de engleză și aventură – Poiana Mărului",
  activitiesTitle: "Program zilnic de activități",
  hero: { badge: "English Explorers Camps 2027", title: "Tabăra de engleză și aventură – Poiana Mărului", image: hero, imageAlt: "Participanți la tabăra ProErudio Poiana Mărului sărbătorind împreună", objectPosition: "50% 65%" },
  quickInfo: { location: "Poiana Mărului, județul Brașov", duration: "6 zile / 5 nopți", ageGroup: "7–14 ani", dates: "18–23 iulie 2027", priceLabel: "Preț promoțional", price: "2.380 lei" },
  about: {
    title: "English Explorers Camps",
    paragraphs: [
      "6 zile de aventură, prietenii noi și engleză învățată cu zâmbetul pe buze! Fiecare dimineață începe cu energie, fiecare activitate aduce o nouă provocare, iar limba engleză devine parte din joacă, explorare și distracție.",
      "În tabără, copiii lasă în urmă rutina zilnică și timpul petrecut în fața ecranelor pentru a descoperi o lume plină de aventură, creativitate, competiții amuzante și prietenii care pot dura o viață.",
      "Totul într-un cadru natural spectaculos, sub îndrumarea profesorilor de limba engleză și a trainerilor internaționali de la Pro Erudio School of English. Mai mult decât o tabără: o experiență care îi ajută să crească!",
    ],
  },
  highlights: ["Dimineața – 3 ore de cursuri interactive de limba engleză", "După-amiaza – 2 runde de ateliere de aventură în natură și provocări pe echipe", "Seara – Activități creative, sportive și concursuri pe echipe", "Vizite la obiective turistice importante"],
  locationDescription: {
    title: "Aventură în inima naturii",
    description: "Situată într-un peisaj montan de poveste, la aproximativ 900 m altitudine, Pensiunea Poiana Mărului Ranch oferă cadrul ideal pentru o vacanță activă, departe de agitația orașului.\n\nAer curat, păduri, peisaje spectaculoase și spații generoase pentru joacă și activități în aer liber – ingredientele perfecte pentru o experiență de neuitat!\n\nCopiii vor fi cazați într-o pensiune clasificată cu patru margarete, cu camere dotate cu baie proprie, restaurant, teren de sport multifuncțional, loc de joacă, curte interioară și 2 terase spațioase. Aici, confortul se îmbină cu farmecul naturii.",
    image: location, imageAlt: "Pensiunea Poiana Mărului Ranch",
    imageHeight: 330,
    objectPosition: "center bottom",
  },
  locationFacilities: [
    { icon: BedDouble, label: "Pensiune de patru margarete" },
    { icon: Bath, label: "Camere cu baie proprie" },
    { icon: Utensils, label: "Restaurant" },
    { icon: Trophy, label: "Teren de sport multifuncțional" },
    { icon: Trees, label: "Loc de joacă și curte interioară" },
    { icon: TerraceIcon, label: "2 terase spațioase" },
  ],
  priceDetailsImages: [
    { src: cookingWorkshop, alt: "Copii la un atelier de gătit în tabără" },
    { src: teamGames, alt: "Participanți la un joc pe echipe în aer liber" },
  ],
  includedInPrice: [
    "6 zile și 5 nopți de cazare cu pensiune completă.",
    "Transport cu autocarul București – Poiana Mărului – București.",
    "Program zilnic de limba engleză susținut de profesori Pro Erudio și traineri internaționali.",
    "Ateliere creative, culturale, sportive și de aventură.",
    "Activități de seară și competiții pe echipe.",
    "Vizite la *Conacul Pană-Filipescu* și Casa Memorială *George Enescu*.",
    "Drumeție în pădure și activități de construire a adăposturilor.",
    "Diplomă de participare, fotografii și șapca echipei pentru fiecare copil.",
    "Medalii pentru echipa câștigătoare.",
  ],
  notIncludedInPrice: ["Cheltuielile personale."],
  activitiesDescription: "În tabăra *English Explorers*, limba engleză înseamnă comunicare, curaj, spontaneitate și descoperire! Diminețile sunt dedicate atelierelor interactive, în care copiii învață prin jocuri, provocări, conversații și activități de grup. La aceste ateliere, plasarea copiilor se face în funcție de vârstă și de nivelul cunoștințelor de limba engleză.\n\nDupă-amiezile și serile continuă cu activități în limba engleză coordonate de profesori, traineri internaționali și animatori. Engleza este folosită în situații reale, într-un mediu relaxat și motivant. Dintre cele mai îndrăgite obiective ale acestor ateliere amintim *Trainer For 15 Minutes*, *Kids Got Talent*, *60 Second Challenges* și atelierele în care copiii trebuie să creeze un filmuleț, un set de poze sau chiar un poster bazat pe situații clare.\n\nLa atelierele de după-amiază, copiii sunt organizați în echipe de aproximativ 7–9 participanți, unul dintre cele mai importante obiective ale taberei fiind dezvoltarea abilităților de lucru în echipă. Echipele sunt eterogene ca vârstă, astfel încât copiii mai mari să își dezvolte abilități de lideri atunci când coordonează activitățile grupului. Cei mai mici sunt implicați în toate activitățile și învață că efortul de echipă înseamnă participarea activă a fiecărui membru. În plus, competițiile prietenoase, misiunile și provocările creative dezvoltă inițiativa, responsabilitatea și încrederea în sine.",
  activityImages: [campfire, groupActivities, playground],
  activityImagesLayout: "tall-left",
  sections: [
    { type: "benefitCard", title: "Engleza prinde viață!", items: ["Copiii vorbesc în engleză cu mai multă încredere și naturalețe.", "Își îmbogățesc vocabularul prin experiențe practice.", "Reacționează spontan la instrucțiuni și provocări în limba engleză.", "Comunică și colaborează cu ceilalți într-un mediu relaxat și motivant."] },
    { type: "gridBullets", title: "Ce aventuri îi așteaptă?", columns: 2, cards: [
      { subtitle: "Exploratori în natură", items: ["Drumeții prin pădure, construirea de adăposturi în echipă și provocări inspirate din tehnicile de supraviețuire. Copiii descoperă natura, își testează ingeniozitatea și învață să lucreze împreună."] },
      { subtitle: "Detectivi și vânători de comori", items: ["Treasure Hunt, Scavenger Hunt, Escape Rooms, misiuni secrete și competiții contra cronometru. Fiecare echipă are o strategie, iar fiecare copil poate contribui la victorie!"] },
      { subtitle: "Artiști și creatori", items: ["Pictură în natură, origami, confecționare de bărcuțe, colivii și parașute, modelaj, teatru și provocări creative."] },
      { subtitle: "Campioni ai distracției", items: ["Fotbal, volei, baschet, dodgeball, Capture the Flag, ștafete și jocuri dinamice în aer liber. Mișcare, energie și fair-play!"] },
      { subtitle: "Vedetele serii", items: ["Talent Show, Karaoke, Quiz Night, Hogwarts Express, Chaos Games și seri tematice pline de surprize.", "Serile reunesc întregul grup, oferindu-le copiilor ocazia să socializeze, să râdă și să creeze amintiri împreună."] },
      { subtitle: "Abilități pentru viață", items: ["Învățăm să gătim și cât de importantă este alimentația pentru o viață sănătoasă.", "Învățăm să facem un buget și valoarea banilor la atelierul de educație financiară."] },
    ] },
    { type: "benefitCard", theme: "excursions", title: "Descoperim și explorăm România!", items: ["*Conacul Pană-Filipescu* din Filipeștii de Pădure – file de poveste din istoria României.", "Casa Memorială *George Enescu* din Sinaia – o experiență culturală acasă la faimosul compozitor."] },
    { type: "gridBullets", title: "Ce câștigă copilul tău din această experiență?", columns: 2, cards: [
      { subtitle: "Mai multă independență", items: ["Copiii învață să se descurce în situații noi, să ia decizii și să devină mai responsabili."] },
      { subtitle: "Mai multă încredere în sine", items: ["Fiecare provocare depășită, idee exprimată și reușită le oferă curaj să încerce lucruri noi."] },
      { subtitle: "Prieteni noi și spirit de echipă", items: ["Învață să comunice, să asculte, să colaboreze și să se bucure împreună de succes."] },
      { subtitle: "Engleză folosită cu naturalețe", items: ["Prin interacțiuni zilnice și activități captivante, limba engleză devine un instrument firesc de comunicare."] },
      { subtitle: "Amintiri care rămân", items: ["Experiențe autentice, aventuri, râsete și povești pe care le vor împărtăși cu entuziasm la întoarcerea acasă."] },
      { subtitle: "Departe de telefon", items: ["Învață că distracția cea mai valoroasă este departe de ecrane, motiv pentru care limităm accesul copiilor la telefon la maximum 2 ore pe zi, adică minimul necesar pentru a comunica cu familia."] },
    ] },
    { type: "bullets", title: "Cum arată o zi în tabără?", image: { src: morningActivities, alt: "Copii la înviorarea de dimineață pe terenul de sport" }, items: ["08:00–09:00 – Trezire, înviorare și mic dejun", "09:45–12:45 – Ateliere interactive de limba engleză", "13:00–15:00 – Prânz și timp liber", "15:00–16:30 – Ateliere creative, sportive și de aventură", "16:30–17:00 – Pauză de fruct", "17:00–18:30 – Ateliere pe echipe", "19:00–19:30 – Cină", "20:00–22:00 – Jocuri de grup, seri tematice și disco", "22:30 – Stingerea"] },
    { type: "note", text: "Programul este orientativ și poate fi adaptat în funcție de condițiile meteo și de activitățile planificate." },
    { type: "image", title: "Amintiri din ediția 2026", showcase: true, src: memories, alt: "Colaj cu activități și participanți la tabăra ProErudio Poiana Mărului 2026", compact: true, extraImage: { src: extraMemories, alt: "Amintiri din tabăra Poiana Mărului 2026" } },
    { type: "journalLink", title: "Organizăm această tabără din 2020!", text: "Dacă doriți să răsfoiți jurnalul de tabără din 2025, vă invităm să descoperiți activitățile și amintirile participanților.", to: "/jurnal/poiana-marului-2025" },
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
