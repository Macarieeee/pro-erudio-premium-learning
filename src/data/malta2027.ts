import type { CampConfig } from "./campsData";
import { School, Dumbbell, Users, Presentation, Utensils, Store, Waves, Wifi, ShieldCheck } from "lucide-react";
import hero from "@/assets/malta-2027/malta-1148454_1280.jpg";
import campus from "@/assets/malta-2027/Cover Campus-Hub.webp";
import building from "@/assets/malta-2027/Campus_Hub_Malta.jpg";
import reception from "@/assets/malta-2027/6aa1516e7c0e844746c0085a_6aa150f30a4f31aa3f1e8c66_location-menu-reception-2x.jpeg";
import room from "@/assets/malta-2027/dsc02502campus-hub-1-scaled.jpg";
import lounge from "@/assets/malta-2027/dsc02581campus-hub-scaled.jpg";
import pool from "@/assets/malta-2027/dsc02606campus-hub-2-1-1024x683-1.jpg";
import pingpong from "@/assets/malta-2027/dzrELr0g.jpeg";
import school from "@/assets/malta-2027/Hub202-1-2400x1609.jpg";
import dining from "@/assets/malta-2027/ojBEKHXw.jpeg";
import games from "@/assets/malta-2027/WYFBYHKg.jpeg";
import food from "@/assets/malta-2027/YhgpEv4w.jpeg";

export const malta2027 = (registrationInfo: CampConfig["registrationInfo"]): CampConfig => ({
  "slug": "scoala-de-vara-malta-2027",
  "year": 2027,
  "campName": "Școală internațională de limba engleză în Malta",
  "hero": {
    "badge": "Tabără internațională 2027",
    "title": "Școală internațională de limba engleză în Malta",
    "image": hero,
    "imageAlt": "Valletta și coasta mediteraneeană a Maltei",
    "expanded": true
  },
  "quickInfo": {
    "location": "Saint Andrew School, Malta",
    "duration": "8 zile / 7 nopți",
    "ageGroup": "12–18 ani",
    "dates": "1–8 august 2027",
    "price": "1.080 euro"
  },
  "about": {
    "title": "Despre Malta",
    "paragraphs": [
      "Malta îmbină peisajele mediteraneene cu o istorie de mii de ani. Străduțele din piatră aurie, cetățile și porturile pitorești oferă insulei un farmec aparte. Valletta, capitala inclusă în Patrimoniul Mondial UNESCO, și Mdina, cu aleile sale liniștite și clădirile istorice, sunt locuri în care fiecare plimbare devine o ocazie de a descoperi poveștile trecutului.",
      "Marea este un alt motiv pentru a vizita Malta. Apele limpezi, golfurile și plajele invită la înot, snorkeling și excursii cu barca. Poți explora peisajele spectaculoase din zona Grotei Albastre sau poți descoperi insula Gozo, unde satele, coasta și templele Ġgantija completează experiența unei vacanțe bogate în descoperiri.",
      "Pentru cei care vor să își îmbunătățească engleza, Malta oferă și avantajul de a învăța prin experiențe de zi cu zi. Fiind limbă oficială, engleza poate fi exersată la cumpărături, în restaurante, în excursii și în conversațiile cu oameni din alte țări. Atmosfera internațională creează ocazii de socializare și îi încurajează pe cursanți să comunice cu mai multă încredere.",
      "Toate acestea se îmbină cu ritmul relaxat al vieții mediteraneene: mese în aer liber, plimbări pe malul mării și timp petrecut alături de noi prieteni. Pentru elevii care participă la o școală de vară, Malta poate transforma învățarea într-o experiență care aduce împreună limba engleză, cultura și bucuria de a explora."
    ]
  },
  "highlights": [
    "20 de lecții de engleză / 15 ore pe săptămână",
    "Grupe internaționale și certificat de absolvire",
    "Cazare la Campus Hub, cu pensiune completă",
    "Activități zilnice și excursii",
    "Transfer de la și către aeroport inclus",
    "Un însoțitor Pro Erudio pentru fiecare 10 copii"
  ],
  "locationDescription": {
    "title": "Școala și campusul",
    "description": "Cursurile de limbă engleză se organizează la St Andrew’s School, dar sunt susținute de Embassy Summer. Cursurile sunt licențiate și supravegheate de ELT Council, care urmărește calitatea predării și bunăstarea cursanților.",
    "details": {
      "paragraphs": [
        "Elevii sunt cazați la Campus Hub, care aparține și deservește Universitatea din Malta (L-Università ta' Malta / University of Malta). Complexul este singura reședință studențească situată chiar în campusul principal al universității, în localitatea Msida.",
        "Campusul dispune de peste 1.000 de locuri de cazare în diverse tipuri de camere și studiouri. Complexul include o zonă comercială deschisă publicului (Piazza) cu restaurante, cafenele, supermarket, sală de fitness și piscină exterioară."
      ]
    },
    "image": campus,
    "imageAlt": "Piazza și clădirile Campus Hub din Malta",
    "alignImageWithParagraph": true
  },
  "locationFacilities": [
    {
      "icon": School,
      "label": "Săli de clase bine echipate, inclusiv săli multimedia"
    },
    {
      "icon": Dumbbell,
      "label": "Sală de sport"
    },
    {
      "icon": Users,
      "label": "Spații comune interioare și exterioare"
    },
    {
      "icon": Dumbbell,
      "label": "Terenuri de sport"
    },
    {
      "icon": Presentation,
      "label": "Sală de festivități"
    },
    {
      "icon": Utensils,
      "label": "Cantină"
    },
    {
      "icon": Store,
      "label": "Magazine și restaurante, cafenele disponibile în campus"
    },
    {
      "icon": Users,
      "label": "Zone de divertisment și socializare"
    },
    {
      "icon": Waves,
      "label": "Piscină exterioară cu zonă pentru plajă"
    },
    {
      "icon": Wifi,
      "label": "Wi-Fi disponibil în spațiile comune și în camera"
    },
    {
      "icon": ShieldCheck,
      "label": "Pază permanentă, 24 de ore din 24"
    }
  ],
  "includedInPrice": [
    "Cazare cu pensiune completă (micul dejun și cina la Campus Hub, prânzul la cantina școlii).",
    "Curs de engleză generală în grup internațional: 20 de lecții, echivalentul a 15 ore pe săptămână.",
    "Program zilnic de activități.",
    "Transport zilnic cu autobuzul școlii din campus la școală.",
    "Materiale didactice și certificat de absolvire a cursului.",
    "Transferul de la și către aeroport.",
    "O excursie de o zi și una de o jumătate de zi pe săptămână.",
    "Un însoțitor de grup de la Pro Erudio pentru fiecare 10 copii."
  ],
  "notIncludedInPrice": [
    "Transportul cu avionul, în funcție de oferta companiei de zbor la momentul rezervării locului",
    "Asigurare de sănătate (obligatorie) și storno (opțională)",
    "Cheltuieli personale"
  ],
  "activitiesTitle": "Program de excursii și activități",
  "activitiesDescription": "Activitățile desfășurate în cadrul școlii de vară sunt numeroase și foarte variate, oferind participanților o experiență educativă și recreativă completă. Programul include vizitarea orașului, cu activități de shopping și orientare, activități sportive în aer liber și în sala de sport multifuncțională, precum și o gamă diversificată de ateliere interactive, printre care se numără bowling, festivaluri sportive, jocuri de echipă (photo challenge), vânători de comori, petreceri și grătar pe plajă.\n\nSerile sunt dedicate activităților de socializare și divertisment, incluzând quiz-uri, vizionări de filme, prezentări de modă și seri tematice.",
  "activityImages": [
    pingpong,
    games
  ],
  "sections": [
    {
      "type": "textImage",
      "placement": "afterLocation",
      "title": "Cazare la Campus Hub",
      "paragraphs": [
        "Cazarea se face în Campus Hub, o reședință modernă, recent construită, aflată la doar câteva minute de St Andrew’s School cu autobuzul privat. Conceput special pentru viața de student, complexul oferă un echilibru între studiu și relaxare, deci este alegerea ideală pentru cei care își doresc să se bucure de atmosfera unui campus în timpul școlii de vară.",
        "Copiii vor fi cazați în camere de 2–4 persoane, cu o baie comună la două camere, astfel încât maximum 5 copii să folosească aceeași baie. Pe lângă facilitățile moderne, cazarea în campus le oferă participanților ocazia de a petrece timp împreună, de a socializa și de a se bucura de compania prietenilor în spațiile comune."
      ],
      "src": room,
      "alt": "Cameră de cazare la Campus Hub",
      "extraImage": {
        "src": lounge,
        "alt": "Spațiu comun cu mese și jocuri la Campus Hub"
      }
    },
    {
      "type": "textImage",
      "placement": "afterLocation",
      "title": "Mese",
      "paragraphs": [
        "Micul dejun este continental și se servește la cazare. Acesta include suc, ceai, cafea, pâine prăjită, gemuri, cereale, produse de patiserie și fructe sau produse similare.",
        "Prânzul se servește la cantina școlii și constă în preparate calde și reci, inclusiv meniu vegetarian.",
        "În weekend și în timpul excursiei de o zi se oferă prânz la pachet, care include un sandviș, apă și un fruct.",
        "Cina este servită la cazare în sistem bufet."
      ],
      "src": food,
      "alt": "Preparatele calde servite în sistem bufet",
      "extraImage": {
        "src": dining,
        "alt": "Sala de mese și zona de socializare"
      }
    },
    {
      "type": "richText",
      "title": "Cum se desfășoară școala de vară",
      "paragraphs": [
        "Experiența începe la reședință, unde elevii sunt întâmpinați, înregistrați și primesc cheile camerelor. În prima seară, o activitate de bun venit îi ajută să cunoască echipa și ceilalți participanți, să descopere facilitățile centrului și să se familiarizeze cu programul.",
        "În prima zi de școală (a doua zi în tabără), elevii susțin un test de aproximativ o oră, care evaluează gramatica, vocabularul, citirea, scrierea și exprimarea orală, pentru repartizarea într-o grupă potrivită nivelului lor de engleză. Urmează o sesiune de orientare de aproximativ 30 de minute, susținută de un membru al echipei Embassy Summer.",
        "Învățarea continuă dincolo de sala de curs, prin activități organizate zilnic, dimineața, după-amiaza și seara, în cadrul centrului sau în afara acestuia. Programul poate include fotbal, tenis de masă, volei și baschet, ieșiri la plajele Maltei, explorarea orașelor Valletta, Mdina și Marsaxlokk, precum și seri de karaoke, spectacole de talente și jocuri de echipă. Aceste experiențe le oferă elevilor ocazia să exerseze limba engleză, să lege prietenii și să descopere insula."
      ]
    },
    {
      "type": "activityCards",
      "groups": [
        {
          "title": "Sport, explorare și activități",
          "theme": "adventure",
          "items": [
            "Fotbal, tenis de masă, volei și baschet",
            "Bowling și festivaluri sportive",
            "Photo challenge și vânători de comori",
            "Plajă, înot și explorarea insulei"
          ]
        },
        {
          "title": "Activități de seară",
          "theme": "evening",
          "items": [
            "Karaoke și spectacole de talente",
            "Quiz-uri și seri de film",
            "Prezentări de modă și seri tematice",
            "Petreceri, jocuri de echipă și grătar pe plajă"
          ]
        }
      ]
    },
    {
      "type": "richText",
      "title": "Posibile destinații de excursii",
      "paragraphs": [
        "Pe parcursul săptămânii petrecute în Malta, participanții vor îmbina lecțiile de limba engleză cu un program variat de excursii, sport și distracție. Vor avea ocazia să descopere cele mai frumoase locuri din Malta, prin excursii și vizite la Esplora Science Centre, Limestone Heritage, sesiuni de shopping la Valletta, Mdina, Birgu, Mosta și Marsaxlokk, să exploreze insula Comino și Blue Grotto, să se bucure de plajă, înot, croaziere și activități la parcul acvatic.",
        "Desigur, o săptămână este prea scurtă pentru toate activitățile posibile, dar sigur vom avea și noi parte de o parte dintre aceste experiențe care se anunță memorabile"
      ]
    },
    {
      "type": "gridBullets",
      "title": "Program orientativ – săptămâna în Malta",
      "columns": 2,
      "cards": [
        {
          "subtitle": "Duminică",
          "items": [
            "Dimineața: Sosirea participanților",
            "După-amiaza: Bowling",
            "Seara: Jocuri de bun venit"
          ]
        },
        {
          "subtitle": "Luni",
          "items": [
            "Dimineața: Test de nivel / Lecții de engleză",
            "După-amiaza: Excursie pe insula Comino",
            "Seara: Petrecere"
          ]
        },
        {
          "subtitle": "Marți",
          "items": [
            "Dimineața: Lecții de engleză",
            "După-amiaza: Rocky Beach",
            "Seara: Jocuri și activități de grup"
          ]
        },
        {
          "subtitle": "Miercuri",
          "items": [
            "Dimineața: Lecții de engleză",
            "După-amiaza: Mosta Rotunda și Mdina",
            "Seara: Festival sportiv"
          ]
        },
        {
          "subtitle": "Joi",
          "items": [
            "Dimineața: Lecții de engleză",
            "După-amiaza: Vizită în Birgu",
            "Seara: Petrecere"
          ]
        },
        {
          "subtitle": "Vineri",
          "items": [
            "Dimineața: Lecții de engleză",
            "După-amiaza: Plajă sau activități opționale",
            "Seara: BBQ pe plajă"
          ]
        },
        {
          "subtitle": "Sâmbătă",
          "items": [
            "Dimineața: Plajă sau activități opționale",
            "După-amiaza: Plajă sau activități opționale",
            "Seara: Vânătoare de comori în Mdina"
          ]
        }
      ]
    },
    {
      "type": "note",
      "text": "Programul este orientativ. Activitățile și excursiile pot suferi modificări. Pachetul include o excursie de o zi și una de o jumătate de zi pe săptămână; destinațiile prezentate sunt opțiuni posibile."
    }
  ],
  "galleries": {
    "facilities": [
      {
        "src": building,
        "alt": "Exteriorul reședinței Campus Hub"
      },
      {
        "src": reception,
        "alt": "Recepția Campus Hub"
      },
      {
        "src": pool,
        "alt": "Piscina exterioară și terasa Campus Hub"
      },
      {
        "src": school,
        "alt": "Clădire și spații comune în campus"
      }
    ]
  },
  "discounts": [
    {
      "type": "Continuitate",
      "value": "5%",
      "condition": "Reducere de continuitate"
    },
    {
      "type": "Frați",
      "value": "5%",
      "condition": "Reducere pentru frați"
    }
  ],
  "otherCamps": [],
  "programImage": {
    "src": hero,
    "alt": "Malta"
  },
  "registrationInfo": {
    "steps": [
      "Pentru rezervări vă rugăm să completați formularul din partea de jos a paginii sau să ne trimiteți un email.",
      "Plata biletului de avion se face după semnarea contractului de participare la școala de vară și confirmarea rezervării locului.",
      "Tranșele de plată sunt: la rezervarea locului (250 euro), în februarie (350 euro) și în iunie (480 euro)."
    ],
    "contact": registrationInfo.contact
  },
  "requiredDocuments": [],
  "form": {
    "selectValue": "Malta 2027",
    "selectLabel": "Școală internațională de limba engleză în Malta 2027"
  },
  "visibility": {
    "showProgramImage": false,
    "showLuggageImage": false,
    "showOtherCamps": false,
    "showRequiredDocs": false,
    "showDiscounts": true,
    "showPriceDetails": true
  }
});
