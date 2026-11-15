import type { CampConfig } from "./campsData";
import { BedDouble, Bath, Utensils, Trophy, Trees, Presentation, Car } from "lucide-react";
import { TerraceIcon } from "@/components/icons/TerraceIcon";
import hotel from "@/assets/maldaresti-2027/hotel victoria.jpg";
import heroImage from "@/assets/maldaresti-2027/20260630_123317.jpg";
import room from "@/assets/maldaresti-2027/camera.jpg";
import room2 from "@/assets/maldaresti-2027/camera 2.jpg";
import bathroom from "@/assets/maldaresti-2027/909507657.jpg";
import restaurant from "@/assets/maldaresti-2027/restaurant.jpg";
import restaurant2 from "@/assets/maldaresti-2027/restaurant 2.jpg";
import terrace from "@/assets/maldaresti-2027/terasa.jpg";
import garden from "@/assets/maldaresti-2027/crang.jpg";
import relaxation from "@/assets/maldaresti-2027/relaxare.jpg";
import activitiesPhoto1 from "@/assets/maldaresti-2027/20260630_080514.jpg";
import activitiesPhoto2 from "@/assets/maldaresti-2027/IMG-20260628-WA0130.jpg";
import galleryPhoto1 from "@/assets/maldaresti-2027/20260630_185544.jpg";
import galleryPhoto2 from "@/assets/maldaresti-2027/IMG-20260701-WA0114.jpg";
import galleryPhoto3 from "@/assets/maldaresti-2027/IMG-20260703-WA0148.jpg";
import programPhoto1 from "@/assets/maldaresti-2027/20260628_130704.jpg";
import programPhoto2 from "@/assets/maldaresti-2027/20260628_131541.jpg";

export const maldaresti2027: CampConfig = {
  slug: "tabara-de-limba-engleza-maldaresti-2027",
  year: 2027,
  campName: "Tabăra de engleză și aventură – Măldărești",
  hero: { badge: "English Explorers Camp 2027", title: "Tabăra de engleză și aventură – Măldărești", image: heroImage, imageAlt: "Participanți la tabără în excursie la cetate", objectPosition: "center bottom" },
  quickInfo: { location: "Măldărești, județul Vâlcea", duration: "6 zile / 5 nopți", ageGroup: "7–14 ani", dates: "4–9 iulie 2027", price: "2.480 Lei" },
  about: {
    title: "English Explorers Camp",
    paragraphs: [
      "6 zile de aventură, engleză, prietenii și experiențe memorabile! Învățarea limbii engleze se îmbină cu distracția, explorarea, creativitatea și descoperirea unor locuri fascinante.",
      "Prin cursuri interactive de limba engleză și activități recreative, creative și sportive, copiii învață, se descoperă, își fac noi prieteni și câștigă încredere în propriile forțe. Activitățile sunt susținute de profesori și traineri internaționali de la Pro Erudio School of English.",
    ],
  },
  highlights: ["Trei ateliere interactive de limba engleză în fiecare dimineață", "Două ateliere de după-amiază și provocări în echipe de 7–9 copii", "Seri tematice, concursuri și spectacole", "Excursii la Măldărești, Horezu și Potlogi"],
  locationDescription: {
    title: "Hotel Victoria – Măldărești, la poalele Munților Căpățânii",
    description: "Măldărești se află la distanță de mers pe jos de stațiunea Horezu, într-o zonă pitorească de la poalele Munților Căpățânii. Localitatea este cunoscută pentru cule – locuințe boierești fortificate – și pentru farmecul arhitecturii tradiționale și al peisajelor rurale.\n\nCula Greceanu, Cula Duca și Casa Memorială I. G. Duca păstrează poveștile familiilor boierești. Zona Horezu este renumită pentru ceramica tradițională și Mănăstirea Hurezi, repere ale patrimoniului UNESCO.\n\nHotel Victoria este un hotel de 3 stele, situat la câteva minute de mers pe jos de parcul din Horezu. Oferă 26 de spații de cazare în camere de 2 și 3 locuri, fiecare cu baie proprie, și spații generoase pentru activități și relaxare.",
    image: hotel, imageAlt: "Hotel Victoria, cazarea taberei Măldărești 2027",
  },
  locationFacilities: [
    { icon: BedDouble, label: "Hotel de 3 stele, camere de 2 și 3 locuri" },
    { icon: Bath, label: "Baie proprie în fiecare cameră" },
    { icon: Utensils, label: "Restaurant cu bucătărie românească" },
    { icon: Trophy, label: "Teren de sport" },
    { icon: Trees, label: "Loc de joacă, grădină cu băncuțe și hamace, curte interioară" },
    { icon: TerraceIcon, label: "Terasă" },
    { icon: Presentation, label: "Sală de conferință de 70 de locuri, videoproiector și ecran" },
    { icon: Car, label: "Parcare proprie" },
  ],
  galleries: {
    facilities: [{ src: room, alt: "Cameră la Hotel Victoria" }, { src: room2, alt: "Cazare la Hotel Victoria" }, { src: bathroom, alt: "Baie proprie" }, { src: restaurant2, alt: "Restaurantul hotelului" }],
  },
  priceDetailsImages: [{ src: restaurant, alt: "Restaurantul Hotel Victoria" }, { src: terrace, alt: "Terasa hotelului" }],
  includedInPrice: [
    "6 zile / 5 nopți de cazare cu pensiune completă, cu toate mesele incluse.",
    "Transport dus-întors București–Măldărești, cu autocarul.",
    "Vizite la Culele Greceanu și Duca și Casa Memorială I. G. Duca din Măldărești, Mănăstirea Hurezi din Horezu și Ansamblul Brâncovenesc de la Potlogi.",
    "Zilnic, trei ateliere de limba engleză, adaptate vârstei, nivelului și intereselor participanților, susținute de profesori și traineri internaționali Pro Erudio.",
    "Două ateliere interactive în fiecare după-amiază: jocuri, competiții pe echipe, activități artistice, creative, sportive și culturale.",
    "O activitate specială în fiecare seară, alături de întregul grup.",
    "Diplome de participare, șapca echipei și fotografii din tabără pentru fiecare copil.",
    "Medalii pentru membrii echipei câștigătoare.",
  ],
  notIncludedInPrice: ["Cheltuielile personale: suveniruri, gustări suplimentare sau alte cumpărături individuale. Toate serviciile și activitățile menționate în program sunt incluse în tariful de participare."],
  activitiesTitle: "Engleză, creativitate și spirit de echipă",
  activitiesDescription: "Diminețile sunt dedicate cursurilor interactive de limba engleză. Copiii sunt organizați în grupe în funcție de vârstă și nivel. Prin jocuri de rol, dezbateri, proiecte creative și conversații pe teme relevante, își îmbogățesc vocabularul, își dezvoltă fluența și încrederea de a comunica natural.\n\nDupă-amiezile, copiii participă la ateliere organizate în paralel, în echipe de 7–9 participanți. Fiecare are ocazia să se implice activ, să colaboreze și să descopere noi talente. Seara, întregul grup se reunește pentru jocuri, spectacole și provocări distractive.",
  activityImages: [activitiesPhoto1, activitiesPhoto2],
  sections: [
    { type: "gridBullets", title: "Ce activități îi așteaptă?", columns: 2, cards: [
      { subtitle: "Jocuri și competiții pe echipe", items: ["Mime, Draw or Describe, Guess the Character, Photo Contests, Charades, Casino Night, 60 Second Challenges, Media Challenges, Beauty Workshop și Fashion Parade.", "Treasure Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke și Chaos Games."] },
      { subtitle: "Creație și expresie artistică", items: ["Scenete, teatru de umbre, realizarea și editarea de filmulețe video, pictură în natură, origami, modelaj și confecționarea de obiecte decorative."] },
      { subtitle: "Sport, mișcare și aventură", items: ["Fotbal, volei, tenis, baschet, dodgeball, curse de ștafetă, Capture the Flag și jocuri de echipă care dezvoltă cooperarea, coordonarea și încrederea în sine."] },
      { subtitle: "Life Skills – abilități pentru viață", items: ["Pregătim rețete simple, învățăm să gestionăm un buget, creăm și prezentăm un produs, realizăm clipuri video și devenim mentori pentru colegi. Activitățile se desfășoară în limba engleză și dezvoltă creativitatea, gândirea critică, spiritul antreprenorial și comunicarea."] },
    ] },
    { type: "gallery", compact: true, images: [
      { src: galleryPhoto1, alt: "Amintiri din tabără – Măldărești, fotografia 1" },
      { src: galleryPhoto2, alt: "Amintiri din tabără – Măldărești, fotografia 2" },
      { src: galleryPhoto3, alt: "Amintiri din tabără – Măldărești, fotografia 3" },
    ] },
    { type: "benefitCard", theme: "excursions", title: "Descoperim istoria și tradițiile locului", items: ["Culele Greceanu și Duca și Casa Memorială I. G. Duca din Măldărești.", "Mănăstirea Hurezi din Horezu, monument UNESCO și reper al stilului brâncovenesc.", "Ansamblul Brâncovenesc de la Potlogi."] },
    { type: "gridBullets", title: "Ce câștigă copilul tău din această experiență?", columns: 3, cards: [
      { subtitle: "Autonomie și încredere", items: ["Copiii devin mai independenți, mai responsabili și mai organizați. Învață să ia decizii, să își gestioneze timpul și să depășească provocări într-un mediu prietenos și sigur."] },
      { subtitle: "Prieteni și spirit de echipă", items: ["Își dezvoltă comunicarea, empatia și respectul față de ceilalți. Învață să își exprime ideile, să asculte și să găsească soluții creative, contribuind la succesul grupului."] },
      { subtitle: "Engleză cu naturalețe", items: ["Exersează engleza în contexte practice, își îmbunătățesc fluența și spontaneitatea și capătă încredere în exprimare. Limba engleză devine un instrument firesc de comunicare și explorare."] },
    ] },
    {
      "type": "gridBullets",
      "title": "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
      "spaceAbove": true,
      "columns": 2,
      trailingImages: [
        { src: programPhoto1, alt: "Amintiri din tabără – fotografia 1" },
        { src: programPhoto2, alt: "Amintiri din tabără – fotografia 2" },
      ],
      "cards": [
        {
          "subtitle": "Ziua 1 | Aventura începe! Prieteni noi, descoperiri și primele provocări",
          "description": "Prima zi de tabără este despre emoția plecării, descoperirea unor locuri pline de istorie și bucuria de a lega noi prietenii! Pornim împreună într-o aventură în care ne cunoaștem, ne formăm echipele și ne pregătim pentru zile pline de engleză, distracție și experiențe memorabile.",
          "items": [
            "08:00 – Plecare din București, cu autocarul, din Piața Constituției",
            "11:00 – O incursiune în istorie: vizită la Ansamblul Brâncovenesc de la Potlogi, unde descoperim povești fascinante despre trecut și arhitectura brâncovenească",
            "14:30 – Sosire la destinație, cazare, prânz și acomodare",
            "16:30–18:30 – Let's Get to Know Each Other! – Jocuri interactive de cunoaștere, formarea echipelor și prezentarea regulilor taberei, într-o atmosferă relaxată și prietenoasă",
            "19:30–20:30 – Cina",
            "20:30–22:00 – Scavenger Hunt – O provocare plină de mister, indicii și surprize! Copiii pornesc în echipe într-o aventură de explorare, colaborare și descoperire",
            "22:30 – Stingerea luminilor și odihnă pentru o nouă zi de aventură!"
          ]
        },
        {
          "subtitle": "Zilele 2–5 | Zile pline de engleză, aventură și distracție!",
          "description": "Fiecare zi de tabără aduce un mix perfect de învățare interactivă, activități creative, mișcare și momente de relaxare alături de prieteni. De dimineața până seara, copiii se bucură de un program variat, în care energia, curiozitatea și buna dispoziție sunt mereu prezente!",
          "items": [
            "08:00 – Deșteptarea",
            "08:30 – Înviorare în ritm de dans",
            "09:00 – Mic dejun delicios și energie pentru o nouă zi",
            "09:50–10:50 – English Workshop 1: Lecții interactive, conversații și activități adaptate vârstei și nivelului de engleză",
            "11:00–11:50 – English Workshop 2: Jocuri de rol, proiecte creative și provocări de comunicare în limba engleză",
            "12:00–12:50 – English Workshop 3: Jocuri de rol, proiecte creative și provocări de comunicare în limba engleză",
            "13:00 – Prânzul",
            "14:00–15:00 – Timp liber pentru odihnă, socializare și reîncărcarea bateriilor",
            "15:00–16:30 – Atelierul 1: Activități interactive la alegere – jocuri de echipă, competiții, sport sau creație",
            "17:00–18:30 – Atelierul 2: Noi aventuri, provocări și experiențe distractive alături de prieteni",
            "19:00 – Cina",
            "20:00–21:30 – Evening Fun: Seri tematice, concursuri, spectacole, jocuri și activități de divertisment cu întregul grup",
            "21:30–22:00 – Dans, socializare sau timp liber în camere",
            "22:30 – Stingerea luminilor și odihnă pentru o nouă zi de aventură!"
          ]
        },
        {
          "subtitle": "Ziua 6 | Ultimele amintiri, premii și promisiuni de revedere!",
          "description": "Ultima zi de tabără este dedicată celebrării reușitelor, prieteniilor legate și momentelor speciale trăite împreună. Ne bucurăm de ultimele ore petrecute în echipă, descoperim încă un loc plin de istorie și pornim spre casă cu zâmbete, povești și amintiri de neuitat!",
          "items": [
            "08:00 – Deșteptarea",
            "08:30 – Înviorare în ritm de dans",
            "09:00 – Micul dejun",
            "09:45–11:00 – Awards & Memories! – Festivitate de premiere, momente de socializare, fotografii de grup și celebrarea experiențelor trăite împreună",
            "11:30 – Plecarea de la hotel și începutul călătoriei spre casă",
            "12:00 – Vizită la Mănăstirea Hurezi din Horezu, monument inclus în Patrimoniul Mondial UNESCO și una dintre cele mai valoroase realizări ale arhitecturii brâncovenești",
            "18:00 – Sosire în București și revederea cu familia"
          ]
        }
      ]
    },
  ],
  discounts: [],
  otherCamps: [],
  programImage: { src: "", alt: "" },
  registrationInfo: {
    steps: [
      "Completați formularul de înscriere de mai jos sau trimiteți un e-mail la office@proerudio.ro. Vă vom contacta pentru confirmarea rezervării și detalii.",
      "După confirmarea rezervării, achitați avansul în maximum 14 zile, conform ofertei de participare.",
      "Diferența de plată se achită până la 20 iunie 2027.",
      "Formularele și informațiile despre documente și regulile taberei vor fi transmise părinților prin e-mail în luna iunie.",
    ],
    contact: { phone: "0724 527 838", email: "office@proerudio.ro" },
  },
  requiredDocuments: ["Acordul părinților pentru participarea copilului la tabără, completat și semnat de părintele sau reprezentantul legal.", "Avizul epidemiologic, eliberat de medicul de familie cu câteva zile înainte de plecare."],
  form: { selectValue: "Măldărești 2027", selectLabel: "Tabăra de engleză și aventură – Măldărești 2027" },
  visibility: { showProgramImage: false, showLuggageImage: false, showDiscounts: false },
};
