// src/data/campsData.ts
import type { LucideIcon } from "lucide-react";
import {
    School,
    Dumbbell,
    Clapperboard,
    Waves,
    FlaskConical,
    Library,
    Circle,
    Home,
    Utensils,
    Coffee,
    Store,
    Mountain,
    MapPin,
    Compass,
    Trophy,
    Users,
    Building,
    Calendar,
    BedDouble,
    Bath,
    Presentation,
    TentTree,
    Gamepad2,
    Trees,
    PawPrint,
    ParkingCircle,
    Sofa,
} from "lucide-react";

// NOTE: folosesc assets existente (din CampPage-ul tău actual) ca să nu ai erori la build.
// Ideal: înlocuiești cu imagini specifice fiecărei tabere.
import heroGrosvenor from "@/assets/Grosvenor Hall.jpg";
import activity1 from "@/assets/Grosvenor Hall - Activity.gif";
import activity2 from "@/assets/Grosvenor Hall - Activity2.jpg";
import activity3 from "@/assets/Grosvenor Hall - Activity3.webp";
import activity4 from "@/assets/Grosvenor Hall - Activity4.png";
import kitTabaraImage from "@/assets/Kit Tabara Pro Erudio.jpg";
import menuImage from "@/assets/meniuUK.jpg";
import programUK from "@/assets/programUK.jpg";
import programImage from "@/assets/Program.jpg";
import heroDublinUniversity from "@/assets/Dublin City University.webp";
import aboutDublin from "@/assets/Dublin About.jpg";
import activityDublin1 from "@/assets/Activity1-Dublin.jpg";
import activityDublin2 from "@/assets/Activity2-Dublin.jpg";
import activityDublin3 from "@/assets/Activity3-Dublin.jpg";
import activityDublin4 from "@/assets/Activity4-Dublin.jpg";
import heroMoinești from "@/assets/Moinesti2026.jpg";
import heroPoianaMarului from "@/assets/PoianaMarului2026.jpg";
import programDublinImage from "@/assets/ProgramDublin.png";
import moinestiAbout from "@/assets/MoinestiAbout.jpg";
import poianaMaruluiAbout from "@/assets/PoianaMaruluiAbout.jpeg";
import heroManchester2025 from "@/assets/scoala-de-vara-manchesterB.jpg";
import aboutManchester2025 from "@/assets/university_of_salford_campus_tour-1080p.00_00_01_09.Still001.jpg";
import activityManchester1 from "@/assets/university_of_salford_campus_tour-1080p.00_00_39_23.Still004.jpg";
import activityManchester2 from "@/assets/university_of_salford_campus_tour-1080p.00_02_57_09.Still008.jpg";
import activityManchester3 from "@/assets/university_of_salford_campus_tour-1080p.00_04_48_24.Still010.jpg";
import activityManchester4 from "@/assets/university_of_salford_campus_tour-1080p.00_07_02_15.Still012.jpg";
import heroMoinești2025 from "@/assets/Tabara-moinestib.jpg";
import heroPoianaMarului2025 from "@/assets/Tabara-poiana-maruluiB.jpg";
import heroPredeal2024 from "@/assets/predeal-b.jpg";
import predealAbout from "@/assets/predealAbout.webp";
import liddingtonHero from "@/assets/Liddington2.jpg";
import liddingtonAbout from "@/assets/Liddington-harta-scaled.jpg"
import activityLiggdington1 from "@/assets/activitati-1.jpg";
import activityLiggdington2 from "@/assets/activitati-2.jpg";
import activityLiggdington3 from "@/assets/activitati-3.jpg";
import activityLiggdington4 from "@/assets/Liddington-cazare.jpg";
import meniuLiddington from "@/assets/meniu.jpg";
import heroWinchester2024 from "@/assets/winchesterb.jpg";
import aboutWinchester2024 from "@/assets/winchester-1.jpg";
import activityWinchester1 from "@/assets/winchester-2.jpg";
import activityWinchester2 from "@/assets/Queens.jpg";
import activityWinchester3 from "@/assets/panel-and-post-signs-mob-banner.jpg";
import activityWinchester4 from "@/assets/24-ip-winchester-centre-profile-1-1.jpg";
import programWinchesterImage from "@/assets/24-ip-winchester-sample-programme-1.jpg";
import heroValeaOltului2023 from "@/assets/Tabara-Valea-Oltului-b.jpg";
import aboutValeaOltului2023 from "@/assets/ValeaOltuluiAbout.jpg";
import heroOsmington2023 from "@/assets/OsmingtonB.jpg";
import aboutOsmington2023 from "@/assets/harta-centru.jpg";
import heroPortsmouth2023 from "@/assets/scoala-de-vara-de-limba-engleza-University-of-Portsmouth-B.jpg";
import aboutPortsmouth2023 from "@/assets/aisel_slides_02.png";
import activityPortsmouth1 from "@/assets/Portsmouth3.jpg";
import activityPortsmouth2 from "@/assets/portsmouth-3.jpg";
import activityPortsmouth3 from "@/assets/portsmouth-2.jpg";
import activityPortsmouth4 from "@/assets/portsmouth-1.jpg";
import moinesti1 from "@/assets/MoinestiExtra1.jpg";
import moinesti2 from "@/assets/MoinestiExtra2.jpg";
import moinesti3 from "@/assets/MoinestiExtra3.jpg";
import moinesti4 from "@/assets/MoienstiExtra4.jpg";
import moinesti5 from "@/assets/MoinestiExtra5.jpg";
import moinesti6 from "@/assets/MoinestiExtra6.jpg";
import moinesti7 from "@/assets/Moinesti7.jpg";
import moinesti8 from "@/assets/Moinesti8.jpg";
import poianaMarului1 from "@/assets/PoianaExtra1.jpg";
import poianaMarului2 from "@/assets/PoianaExtra2.jpg";
import poianaMarului3 from "@/assets/PoianaExtra3.jpg";
import poianaMarului4 from "@/assets/PoianaExtra4.jpg";
import poianaMarului5 from "@/assets/PoianaExtra5.jpg";
import poianaMarului6 from "@/assets/PoianaExtra6.jpg";
import poianaMarului7 from "@/assets/Poiana7.jpg";
import poianaMarului8 from "@/assets/Poiana8.jpg";

/* =======================
   DOAR DEFAULT-URI COMUNE
======================= */

export type CampSEO = {
  title: string;
  description: string;
  image: string; // URL absolut
};

const SITE_URL = "https://tabere.proerudio.ro";

export function getCampSEO(camp: any): CampSEO {
  const title = `${camp.campName} | Pro Erudio`;

  // încearcă să ia o descriere scurtă dacă ai ceva similar; altfel fallback
  const description =
    camp?.shortDescription ||
    camp?.description ||
    "Descoperă tabăra Pro Erudio: program, locație, activități și înscriere.";

  const image = `${SITE_URL}/og/${camp.slug}.jpg`;

  return { title, description, image };
}


export const DEFAULT_REGISTRATION = {
    steps: [
        "Pentru rezervări vă rugăm să completaţi formularul din partea de jos a paginii sau să ne trimiteţi un email.",
        "Plata avansului se face după confirmarea locului și a logisticii (transport/cazare) pentru grup.",
        "Pentru orice alte informaţii, vă rugăm să nu ezitaţi să ne contactaţi la telefon sau pe email.",
    ],
    contact: {
        phone: "0741 389 897 (Roxana Popescu)",
        email: "office@proerudio.ro",
    },
};

export type CampVisibility = {
    showAbout?: boolean;
    showFacilities?: boolean;
    showProgramImage?: boolean;
    showLuggageImage?: boolean;
    showOtherCamps?: boolean;
    showRegistrationForm?: boolean;
    showRequiredDocs?: boolean;
    showDiscounts?: boolean;
    showActivities?: boolean;
    showPriceDetails?: boolean;
};

export const DEFAULT_REQUIRED_DOCS = [
    "Formularul de înscriere completat",
    "Copie CI/Pașaport (în funcție de destinație)",
    "Declarație notarială cu acordul ambilor părinți (pentru taberele externe)",
    "Avans la înscriere (conform ofertei)",
];

export const ROMANIA_REQUIRED_DOCS = [
    "Formularul de înscriere completat",
    "Avans la înscriere (conform ofertei)",
];

/* =======================
   TIPURI
======================= */

export type CampFacility = {
    icon: LucideIcon;
    label: string;
};



export type CampSection =
    | { type: "richText"; title: string; paragraphs: string[] }
    | { type: "bullets"; title?: string; subtitle?: string; items: string[] }
    | { type: "twoCols"; title: string; left: string[]; right: string[] }
    | { type: "note"; title?: string; text: string }
    | {
        type: "gridBullets";
        title: string;
        columns?: 1 | 2 | 3;
        cards: {
            subtitle: string;
            items: string[];
        }[];
    }
    | { type: "image"; title?: string; src: string; alt: string };

type GalleryImage = { src: string; alt?: string };
export type CampConfig = {
    slug: string; // ex: "tabara-poiana-marului-2026"
    year: number;
    campName: string;

    hero: {
  badge: string;
  title: string;
  image: string;
  imageAlt: string;
  objectPosition?: string; // ex: "center", "bottom", "50% 80%"
};

    about: {
        title: string;
        paragraphs: string[];
        extraTitle?: string;
  extraParagraphs?: string[];
    };

    quickInfo: {
        location: string;
        duration: string;
        ageGroup: string;
        dates: string;
        price: string;
    };

    highlights: string[];

    locationDescription: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };

    locationFacilities: CampFacility[];

    includedInPrice: string[];
    notIncludedInPrice: string[];

    activitiesDescription: string;
    activityImages: string[];

    discounts: { type: string; value: string; condition: string }[];

    otherCamps: { name: string; location: string; type: string; image?: string; to: string }[];


luggageImage?: {
  src: string;
  alt: string;
  title?: string; // <-- nou
};
    programImage: { src: string; alt: string };

    menuImage?: { src: string; alt: string };

    // DOAR astea două pot fi default
    registrationInfo: typeof DEFAULT_REGISTRATION;
    requiredDocuments: string[];

    form: {
        selectValue: string;
        selectLabel: string;
    };
    sections?: CampSection[];
    visibility?: CampVisibility;
    galleries?: Partial<Record<
    | "about"
    | "facilities"
    | "includedInPrice"
    | "notIncludedInPrice"
    | "activities"
    | "discounts"
    | "other",
    GalleryImage[] | string[]
  >>;
};

/* =======================
   HELPERS (fără defaults ascunse)
======================= */

const IMGSET_DEFAULT = [activity1, activity2, activity3, activity4];

function otherCampsForYear(year: number) {
    return [
        { name: `Tabere România ${year}`, location: "România", type: "Aventură", image: heroGrosvenor },
        { name: `Tabere UK ${year}`, location: "Marea Britanie", type: "Internațională", image: heroGrosvenor },
        { name: `Școli de vară ${year}`, location: "Europa", type: "Educațională", image: heroGrosvenor },
        { name: `Tabere tematice ${year}`, location: "România", type: "Tematică", image: heroGrosvenor },
    ];
}

function makeFacilities(kind: "uk" | "dublin" | "romania-mountain" | "romania-city" | "predeal" | "liddington" | "winchester"): CampFacility[] {
    if (kind === "uk") {
        return [
            { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
            { icon: Dumbbell, label: "Centre sportive" },
            { icon: Clapperboard, label: "Studiouri media / de dans" },
            { icon: Waves, label: "Piscină interioară" },
            { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
            { icon: Library, label: "Bibliotecă și librării" },
            { icon: Circle, label: "Terenuri de fotbal" },
            { icon: Home, label: "Sală de festivități" },
            { icon: Utensils, label: "Cantină" },
            { icon: Coffee, label: "Cafenea" },
            { icon: Store, label: "Magazine" },
        ];
    }
if (kind === "winchester") {
  return [
    { icon: School, label: "Săli de clasă bine echipate, inclusiv săli multimedia" },
    { icon: Dumbbell, label: "Centre sportive" },
    { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
    { icon: Circle, label: "Terenuri de sport (fotbal, baschet, volei, badminton etc.)" },
    { icon: Home, label: "Sală de festivități" },

    { icon: Users, label: "Spații comune" },
    { icon: Sofa, label: "IP Ocean Lounge (spațiu de socializare deschis toată ziua)" },
    { icon: Utensils, label: "Cantină" },
    { icon: Coffee, label: "Cafenea" },
    { icon: Store, label: "Magazine" },
  ];
}

    if (kind === "liddington") {
  return [
    { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
    { icon: Dumbbell, label: "Sală de sport" },
    { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
    { icon: Circle, label: "Terenuri de sport" },
    { icon: Home, label: "Sală de festivități" },

    { icon: Utensils, label: "Cantină" },
    { icon: Coffee, label: "Cafenea" },
    { icon: Store, label: "Minimarket" },
    { icon: Users, label: "Zone de divertisment și socializare" },
    { icon: Waves, label: "Acces privat la pârâul Wootton" },
    { icon: Trees, label: "Zone de plimbare" },
  ];
}

    if (kind === "dublin") {
        return [
            { icon: School, label: "Săli de curs + workshop rooms" },
            { icon: Library, label: "Spațiu de studiu / bibliotecă" },
            { icon: MapPin, label: "Acces la obiective & transport urban" },
            { icon: Home, label: "Cazare organizată (campus/rezidență)" },
            { icon: Utensils, label: "Mese incluse conform programului" },
            { icon: Users, label: "Grup organizat + însoțitori" },
        ];
    }
  if (kind === "romania-mountain") {
  return [
    { icon: BedDouble, label: "60 de locuri în 16 camere" },
    { icon: Bath, label: "Fiecare cameră are baie proprie" },
    { icon: Utensils, label: "Restaurant" },
    { icon: Presentation, label: "Sală de conferință" },
    { icon: Trophy, label: "Teren de sport multifuncțional" },

    { icon: TentTree, label: "Terasă cu capacitate de 60 de locuri" },
    { icon: Gamepad2, label: "Loc de joacă pentru copii la exterior" },
    { icon: Trees, label: "Curte interioară cu peisaj mirific" },
    { icon: PawPrint, label: "Mică fermă de animale" },
    { icon: ParkingCircle, label: "Parcare proprie" },
  ];
}
if (kind === "predeal") {
  return [
    { icon: BedDouble, label: "24 de spații de cazare (apartamente și garsoniere)" },
    { icon: Bath, label: "Fiecare apartament/garsonieră are baie proprie" },
    { icon: Waves, label: "Piscină interioară" },
    { icon: Utensils, label: "Restaurant cu bucătărie românească" },
    { icon: TentTree, label: "Terasă cu deschidere spre pădure" },

    { icon: Presentation, label: "Sală de conferință (70 persoane) cu videoproiector și ecran" },
    { icon: Gamepad2, label: "Loc de joacă pentru copii la exterior" },
    { icon: Trees, label: "Curte interioară cu peisaj mirific" },
    { icon: ParkingCircle, label: "Parcare proprie" },
  ];
}
    return [
        {
            icon: Home,
            label:
                "Camere cu 3 sau 4 locuri",
        },
        {
            icon: Mountain,
            label:
                "Grădină de vară cu 10 foișoare spațioase",
        },
        {
            icon: Building,
            label:
                "Centru Spa",
        },
        {
            icon: Users,
            label:
                "Piscină exterioară",
        },
        { icon: Trophy, label: "Teren multisport" },
        { icon: Users, label: "Loc de joacă pentru copii" },
        { icon: Building, label: "Sală multifuncțională" },
        {
            icon: Calendar,
            label:
                "4 saloane de evenimente",
        },
        { icon: Utensils, label: "2 restaurante" },
        { icon: Compass, label: "Parcare amenajată" },
    ];
}

/* =======================
   CAMPS DATA (15)
======================= */

export const campsData: CampConfig[] = [
    // ================= 2026 =================
    {
        slug: "scoala-de-vara-dublin-2026",
        year: 2026,
        campName: "Școală de vară de limba ENGLEZĂ la Dublin",
        hero: {
            badge: "2026",
            title: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
            image: heroDublinUniversity, // schimbă cu o poză DCU când o ai
            imageAlt: "Școală de vară de limba ENGLEZĂ la Dublin City University (DCU) 2026",
            objectPosition: "bottom",
        },
        about: {
            title: "Descriere generală",
            paragraphs: [
                "Dublin este un centru cultural major în Irlanda, orașul în care s-au născut sau în care au trăit mulți scriitori remarcabili, cunoscuți în toată lumea. Primul scriitor de renume din Dublin a fost Jonathan Swift (1667-1745), autorul Călătoriilor lui Gulliver, dar cel mai mare dintre ei a fost James Joyce (1882-1941), care a revoluționat literatura prin romanul sau “Ulise” in 1922, roman remarcabil și prin faptul ca este plin de detalii despre Dublinul din anii 1920. Alți patru scriitori originari din Dublin și care au primit premiul Nobel pentru literatură sunt: William Butler Yeats în 1923, George Bernard Shaw în 1925, Samuel Beckett în 1969, Seamus Heaney în 1995. Dublin este cel mai mare centru de învățământ din Irlanda, cu trei universități.",
                "Universitatea din Dublin se află în centrul orașului și este cea mai veche din Irlanda, fondată în secolul XVI. Singurul său colegiu constitutiv, Trinity College (TCD) a fost consacrat printr-un act semnat de către regina Elisabeta I a Angliei. Universitatea Națională a Irlandei (NUI) fondată în 1854, este acum cea mai mare universitate din Irlanda, cea mai recentă fiind Universitatea Orașului Dublin (DCU) fondată în 1975. Această universitate este specializată în afaceri, inginerie, știința și industrie.",
                "Dublin este un important centru cultural irlandez, remarcându-se prin recunoașterea ca Oraș UNESCO al Literaturii în 2010. Orașul abundă în muzee, galerii de artă, instituții culturale și o scenă literară activă, influențată de mari scriitori și muzicieni. Dublinul dispune de o infrastructură culturală bogată, incluzând nu mai puțin de 62 de muzee, 51 de biblioteci publice, trei universități și 53 de galerii de artă.",
            ],
        },
visibility: {
  showPriceDetails: false,
},
        quickInfo: {
            location: "Dublin, Irlanda",
            duration: "8 zile / 7 nopți",
            ageGroup: "13 – 18 ani",
            dates: "2 – 9 august 2026",
            price: "940 EUR",
        },
        highlights: [
            "15 lecții de engleză / săptămână în grupuri internaționale, cu profesori nativi",
            "Cazare în campus universitar (camere duble cu baie proprie)",
            "Pensiune completă",
            "4 excursii de jumătate de zi în Dublin + 1 excursie de o zi întreagă (sâmbăta)",
            "Program zilnic de activități comune + program zilnic tematic",
            "Test inițial de evaluare + certificat de absolvire",
            "1 însoțitor Pro Erudio la 10 copii + transfer aeroport–campus",
        ],
        locationDescription: {
            title: "Dublin City University (DCU)",
            description:
                "Dublin City University (DCU) a fost fondată în 1980, iar de atunci a crescut de la un număr mic de studenți (200 în primul an de funcționare) la peste 19.000 de studenți astăzi. Universitatea dispune de cinci campusuri, trei dintre acestea fiind campusuri academice (Glasnevin, St. Patricks și All Hallows, unde studenții merg la cursuri, învață și socializează), unul sportiv DCU Sports Campus (întinzându-se pe 35 de hectare) și unul dedicat activităților de cercetare și inovație (DCU Alpha). \n \n Dublin City University (DCU) este o universitate tânără, dinamică și ambițioasă, care își propune să transforme viețile oamenilor prin educație, cercetare și inovație. Universitatea are o reputație excelentă, clasându-se în top 350 universități din lume, în ciuda faptului că este o universitate relativ tânără.",
            image: aboutDublin, // schimbă cu o poză DCU când o ai
            imageAlt: "Dublin City University (DCU)",
        },
        locationFacilities: [
            { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
            { icon: Dumbbell, label: "Centre sportive" },
            { icon: Clapperboard, label: "Studiouri media/de dans" },
            { icon: Waves, label: "Piscină interioară" },
            { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
            { icon: Library, label: "Bibliotecă și librării" },
            { icon: Circle, label: "Terenuri de fotbal" },
            { icon: Home, label: "Sală de festivități" },
            { icon: Utensils, label: "Cantină" },
            { icon: Coffee, label: "Cafenea" },
            { icon: Store, label: "Magazine" },
        ],
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămână în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificat de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii: patru de jumătate de zi în timpul săptămânii în Dublin și una de o zi întreagă sâmbăta",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Transfer de la aeroport în campus",
        ],
        notIncludedInPrice: [
            "Transport avion (aproximativ 450 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Asigurare storno (opțional) și de călătorie",
        ],
        activitiesDescription:
            "Activitățile posibile sunt numeroase și variate: activități sportive în aer liber și în sala de sport multifuncțională, ateliere (actorie, fotbal, arts & crafts), cluburi de conversație, seminarii pe diferite teme și jocuri de echipă (ex: Treasure Hunt, Bingo). Sunt incluse quiz-uri, vizionări de filme, prezentări de modă și seri tematice. \n \n Excursiile includ tururi de jumătate de zi în Dublin (plimbări, shopping, vizite la Muzeul Național de Istorie, Grădina Botanică, St Stephen’s Green etc.) și o excursie de o zi întreagă (posibil la Dún Laoghaire & Bray sau Howth). \n \n Programul zilnic al școlii de vară cuprinde cursuri de limba engleză, ateliere de după-amiază (care pot fi vizite la obiective turistice din orașul Dublin) și serate dupa cină.",
        activityImages: [activityDublin1, activityDublin2, activityDublin3, activityDublin4], // înlocuiește cu poze DCU/cazare/masa când le ai
        registrationInfo: {
            steps: [
                "Pentru rezervări vă rugăm să completaţi formularul din partea de jos a paginii sau să ne trimiteţi un email la office@proerudio.ro.",
                "După constituirea grupului veți fi contactat pentru achiziționarea biletului de avion și achitarea avansului de 250 euro.",
                "Diferența până la prețul final al taberei se achită în alte două tranșe: una în februarie (250 euro) și una în mai (440 euro).",
                "Pentru orice alte informaţii, vă rugăm să nu ezitaţi să ne contactaţi la telefon.",
            ],
            contact: {
                phone: "0724 527 838 (Roxana Popescu)",
                email: "office@proerudio.ro",
            },
        },
        requiredDocuments: [
            "Formularul de înscriere completat",
            "Pașaport sau carte de identitate valabile",
            "Declarație notarială cu acordul ambilor părinți",
            "Avans de 250 euro la înscriere",
        ],
        discounts: [
            {
                type: "Continuitate",
                value: "5%",
                condition: "Doar pentru copiii care au participat la programul de tabără din vara 2025",
            },
            {
                type: "Frați/Surori",
                value: "5%",
                condition: "Pentru doi copii ai aceleiași familii",
            },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Ce trebuie să conțină bagajul copiilor" },
        programImage: { src: programDublinImage, alt: "Program orientativ școală de vară Dublin" },
        // aici poți lăsa default sau îl poți scoate dacă oricum îl pui mereu explicit
        // (dar în structura ta CampPage se așteaptă să existe)
        form: {
            selectValue: "scoala-de-vara-dublin-2026",
            selectLabel: "Școală de vară de limba ENGLEZĂ la Dublin (DCU) 2026",
        },
    }
    ,

    {
        slug: "tabara-marea-britanie-grosvenor-hall-2026",
        year: 2026,
        campName: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        hero: {
            badge: "2026",
            title: "Tabără în Marea Britanie – Grosvenor Hall Activity Centre",
            image: heroGrosvenor,
            imageAlt: "Grosvenor Hall 2026",
            objectPosition: "50% 80%",
        },
        visibility: {
  showPriceDetails: false,
},
        about: {
            title: "Despre tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Grosvenor Activity Centre",
            duration: "8 zile / 7 nopți",
            ageGroup: "11 – 16 ani",
            dates: "25 iulie – 01 august 2026",
            price: "740 GPB",
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
            title: "Grosvenor Hall Activity Centre",
            description:
                "Centrul de aventură în care vom merge anul acesta, Grosvenor Hall din Kent, este situat pe coasta de sud-vest a Angliei, aproape de orașul Dover și la două ore distanță de Londra. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de peste 1000 de locuri și se întinde pe 50 de hectare de teren. Grosvenor Hall este un fost conac care cuprinde, pe langă pădure și zone întinse de gazon, un lac spectaculos. Din primul moment când intri in centrul de activități simți că te cuprinde un fior de adrenalină, iar pe măsură ce descoperi tot ceea ce oferă, îți dai seama că aici se găsește ceva de făcut pentru toate gusturile. Centrul de activități Grosvenor Hall cuprinde peste 20 de zone de aventură: terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri, lacuri, păduri etc, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
            image: heroGrosvenor,
            imageAlt: "Grosvenor Hall",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (una de jumătate de zi și una de o zi întreagă săptămânal)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
        ],
        notIncludedInPrice: [
            "transport avion (250-350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în funcție de numărul copiilor înscriși la tabără și se achită cu o lună înaintea plecării)",
            "Asigurare storno/ de călătorie",
        ],
        activitiesDescription:
            "Activitățile din tabără sunt numeroase și foarte variate, fiind concepute atât pentru participare individuală, cât și pentru lucrul în echipă, toate fiind disponibile în cadrul centrului, chiar dacă nu se poate anticipa exact care dintre ele vor fi desfășurate în săptămâna în care grupul va fi prezent. Printre activitățile de zi se numără: Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire. Seara, programul continuă cu activități interactive și recreative precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races. Pe lângă aceste experiențe, participanții vor descoperi istoria și cultura zonei prin două excursii, una de o zi întreagă și una de jumătate de zi, cu posibile destinații două dintre următoarele orașe: Dover (cu vizitarea castelului), Portsmouth (cu vizitarea castelului), Cambridge (unde se face punting pe râu), Canterbury (cu vizitarea catedralei), Brighton (cu intrare la Brighton Sea Life Centre) și Leeds (cu vizitarea castelului).",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Doar pentru copiii care au participat la programul de tabără din vara 2025" },
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: [
            "Formularul de înscriere completat",
            "Pașaport",
            "Declarație notarială cu acordul ambilor părinți",
            "Avans de 250 GBP la înscriere",
            "Autorizație de călătorie în Marea Britanie (ETA)",
        ],
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Tabara in Marea Britanie Grosvenor Hall Activity Centre 2026",
        },
    },

    {
        slug: "tabara-moinesti-2026",
        year: 2026,
        campName: "Tabără de limba engleză și aventură în România – Moinești",
        hero: {
            badge: "2026",
            title: "Tabără de limba engleză și aventură în România – Moinești",
            image: heroMoinești,
            imageAlt: "Tabără Moinești 2026",
            objectPosition: "50% 70%",
        },
        about: {
            title: "Despre tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "note",
                text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este de 2.480 lei (totul inclus: pensiune completă, cursuri, excursii, transport din București). După această dată prețul poate suferi modificări.",
            },
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Oprire la benzinărie pentru gustare",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 3",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.30 – Vizită la *Cetatea Neamț*",
                            "17.00 – Bălăceală în piscină",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 4",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – Vizită la *Casa Memorială Ion Creangă*",
                            "15.30 – Vizită la *Curtea Domnească* de la Piatra Nemți",
                            "17.00 – Bălăceală în piscină",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.00 – Plecare de la pensiune",
                            "14.00 – Oprire la benzinărie pentru o gustare",
                            "18.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază sunt creative, sportive, artistice și culturale și se vor desfășura pe echipe de 7-9 copii. Iată câteva exemple:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Moinești, Județul Bacău",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "28 iunie – 03 iulie 2026",
            price: "2.480 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Moinești – tabără activă în România",
            description:
                "Mario Resort & Event Center Moinești este situat în municipiul Moinești aflat în N-V județului Bacău, în bazinul mijlociu al sistemului de râuri Trotuș-Tazlău, localitate aflata la o distanta de 46 km de Bacău, 8 km de Comănești, 30 km de Tg. Ocna, 44 km de Slănic Moldova și 42 km de Onești.\n \n Cazarea se face în camere duble, triple sau de patru locuri, în funcție de disponibilitatea complexului. În funcție de gradul de ocupare, cazarea se va face la Hotel Mario, Hotel Topaz sau Hotel Safir. Momentan, noi am rezervat 50 de locuri, dar complexul are o capacitate de peste 200 de locuri.",
            image: moinestiAbout,
            imageAlt: "Moinești",
        },
        locationFacilities: makeFacilities("romania-city"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la *Curtea Domnească* din Piatra Neamț;",
            "Vizită la *Cetatea Neamț*;",
            "Vizită la *Casa Memorială Ion Creangă*;",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        galleries: {
  includedInPrice: [
    moinesti1,
    moinesti5,
    moinesti3,
  ],
  notIncludedInPrice: [
    moinesti7,
    moinesti8,
  ],
 other: [
    moinesti4,
    moinesti2,
    moinesti6,
  ],
},
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    {
        slug: "tabara-poiana-marului-2026",
        year: 2026,
        campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        hero: {
            badge: "2026",
            title: "Tabără de limba engleză și aventură în România – Poiana Mărului",
            image: heroPoianaMarului,
            imageAlt: "Tabără Poiana Mărului 2026",
            objectPosition: "70% 80%",
        },
        galleries: {
  includedInPrice: [
    poianaMarului1,
    poianaMarului5,
    poianaMarului3,
  ],
  notIncludedInPrice: [
    poianaMarului7,
    poianaMarului8,
  ],
 other: [
    poianaMarului4,
    poianaMarului2,
    poianaMarului6,
  ],
},
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "note",
                text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este 2380 lei. După această dată prețul poate suferi modificări.",
            },
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la *Cetățile Hărman* și *Prejmer*",
                            "12.00 – Vizită la *Casa Memorială George Enescu* din Sinaia",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2-5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Disco",
                            "22.30 – Stingerea",
                        ],
                    },
                    
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.30 – Plecare de la pensiune",
                            "14.00 – Oprire la benzinărie pentru o gustare",
                            "18.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                    "Seratele se organizează cu tot grupul pentru a le da copiilor ocazia să se împrietenească și cu alți copii, nu doar cu colegii de la activități. Seratele sunt interactive și distractive pentru a consumă și ultimele fărâme de energie ale copiilor și a le asigura un somn adânc toată noaptea."
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Poiana Mărului, Județul Brașov",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "12 – 17 iulie 2026",
            price: "2380 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără activă în România",
            description:
                "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
            image: poianaMaruluiAbout,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Poiana Mărului, tur-retur cu autocarul;",
            "Vizită la *Cetatea Hărman*;",
            "Vizită la *Cetatea Prejmer*;",
            "Vizită la *Peștera Valea Cetății*;",
            "Drumeție în pădure și construire de adăposturi în echipe;",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-poiana-marului-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Poiana Mărului 2026",
        },
    },

    // ================= 2025 =================
    {
        slug: "tabara-marea-britanie-manchester-2025",
        year: 2025,
        campName: "Școală de vară de limba engleză în Marea Britanie – Manchester",
        hero: {
            badge: "2025",
            title: "Școală de vară de limba engleză în Marea Britanie – Manchester",
            image: heroManchester2025,
            imageAlt: "Manchester 2025",
        },
        visibility: {
            showPriceDetails: false,
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Primul mare oraș modern din Marea Britanie, orașul Manchester își datorează caracterul unic trecutului istoric, situându-se în inima Revoluției Industriale când noua pătură socială îmbogățită în special din industria textila a ajutat la înființarea primelor instituții educaționale și a deschis drumul catre educarea clasei muncitoare. Spiritul revoluționar și progresist infuzează atât istoria orașului, cât și pe cea a universității. Mișcările sindicale și mișcările feministe (mișcare sufragetelor) își au aici originile, iar inovații în știință și inginerie cum ar fi puterea atomică, primele programe pe calculator și cel mai tare material din lume (grafenul) continuă să uimească până în zilele noastre.",
                "Cu reputația că dă tonul in sport, cultură și industrie, în 2024 orașul Manchester a fost nominalizat in primele 12 cele mai frumoase locuri de vizitat din lume de către publicația The New York Times. În 2016 Manchester a fost onorat cu titulatura de Oraș European al Științelor. Faimoasele echipe de fotbal din Manchester (Manchester United și Manchester City), alături de facilități de fitness excelente, de la terenuri de cricket până la velodrome dau orașului un aer sportiv. Majoritatea muzeelor și a galeriilor de arta au intrare liberă, ceea ce face ușor de accesat moștenirea culturală a orașului, iar rețeaua de transport în comun facilitează conectarea tuturor zonelor la tarife cu discount pentru elevi.",
            ],
        },

        quickInfo: {
            location: "University of Salford, Manchester",
            duration: "8 zile / 7 nopți",
            ageGroup: "12–17 ani",
            dates: "27 iulie – 03 august 2025",
            price: "940 GBP",
        },
        highlights: [
            "Engleză în context real (oraș universitar)",
            "Excursii & obiective locale",
            "Activități de grup",
            "Proiecte & conversație",
            "Suport complet și însoțitori",
            "Experiență internațională",
        ],
        locationDescription: {
            title: "Școala",
            description:
                "Universitatea din Manchester este cea mai mare universitate din Marea Britanie, fiind formată în 2004 din fuziunea dintre Victoria University of Manchester și UMIST (University of Manchester Institute of Science and Technology). Universitatea din Manchester este o universitate de cărămidă roșie, un produs al mișcării civice universitare de la sfârșitul secolului al XIX-lea. Campusul principal este la sud de centrul orașului Manchester pe Oxford Road. În 2016-2017, universitatea avea 40.490 de studenți și 10.400 de angajați, ceea ce a făcut-o a doua universitate din Marea Britanie (din 167 inclusiv Universitatea Deschisă) și cea mai mare universitate cu un singur loc. Universitatea avea un venit consolidat de 1 miliard de lire sterline în perioada 2017-2018, din care 298.7 milioane de lire sterline proveneau din subvenții și contracte de cercetare (locul 6 la nivel național, după Oxford, UCL, Cambridge, Imperial și Edinburgh). Campusul universitar al Universitatii Salford se situează în apropierea centrului orașului (20 de minute de mers pe jos) și este dotat cu săli de clasă moderne, amfiteatre, numeroase facilități sportive, precum și sală multifuncțională la interior și piscină.",
            image: aboutManchester2025,
            imageAlt: "Manchester",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (două de jumătate de zi și una de o zi întreagă)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Asigurare de călătorie",
        ],
        notIncludedInPrice: [
            "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
            "Asigurare storno (optional)",
            "Cheltuieli personale",
        ],
        activitiesDescription:
            "Activitățile din tabără sunt numeroase și extrem de variate, fiind gândite pentru a îmbina mișcarea, creativitatea și socializarea: participanții vor lua parte la activități sportive desfășurate atât în aer liber, cât și în sala de sport multifuncțională, la ateliere de cooking, dans, actorie și fotbal, precum și la sesiuni de arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă (precum Capture the Flag), jurnalism și media. \n \n Programul include, de asemenea, quiz-uri, vizionări de filme, prezentări de modă și seri tematice, alături de două excursii de o jumătate de zi pentru descoperirea orașului Manchester (cu posibile vizite la MediaCity, Muzeul Științei și Industriilor sau turul Stadionului Manchester City) și o excursie de o zi întreagă, cu destinații posibile precum York, Chester sau Liverpool.",
        activityImages: [activityManchester2, activityManchester3, activityManchester4, activityManchester1],
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "5%", condition: "Completează dacă se aplică" },
        ],
        otherCamps: [
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        luggageImage: { src: menuImage, alt: "Bagaj recomandat", title: "Exemplu meniu zilnic" },
        programImage: { src: programUK, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025",
        },
    },

    {
        slug: "tabara-poiana-marului-2025",
        year: 2025,
        campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        hero: {
            badge: "2025",
            title: "Tabăra de limba engleză și aventură English Explorers Camp",
            image: heroPoianaMarului2025,
            imageAlt: "Tabără Poiana Marului 2025",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la *Mănăstirea Rupestră* de la Șinca Veche;",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2 - 5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.00 – Plecare de la pensiune",
                            "14.00 – Vizită la *Casa Memorială Nicolae Grigorescu* din Câmpina;",
                            "17.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Poiana Mărului, Județul Brașov",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "13 – 18 iulie 2025\n20 – 25 iulie 2024",
            price: "2.280 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără activă în România",
            description:
                "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
            image: poianaMaruluiAbout,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la Curtea Domnească din Piatra Neamț;",
            "Vizită la Cetatea Neamț;",
            "Vizită la Casa Memorială Ion Creangă;",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },

    },

    {
        slug: "tabara-moinesti-2025",
        year: 2025,
        campName: "Tabără de limba engleză și aventură în România – Moinești",
        hero: {
            badge: "2025",
            title: "Tabără de limba engleză și aventură în România – Moinești",
            image: heroMoinești2025,
            imageAlt: "Tabără Moinești 2025",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "note",
                text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2025, prețul este 2380 lei. După această dată prețul poate suferi modificări.",
            },
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Oprire la benzinărie pentru gustare",
                            "14.30 – Cazare și prânz",
                            "16.30-18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 3",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – Vizită la *Casa Memorială George Bacovia* din Bacău",
                            "15.30 – Vizită la *Casa Memorială Mihail Sadoveanu* din Bacău",
                            "17.00 – Bălăceală în piscină",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 4",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – Vizită la *Castelul Ghica* din Dofteana (reședință de vânătoare)",
                            "15.30 – Vizită la *Palatul Ghica* de la Comănești (acum muzeu de etnografie și artă)",
                            "17.00 – Bălăceală în piscină",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.00 – Plecare de la pensiune",
                            "14.00 – Oprire la benzinărie pentru o gustare",
                            "18.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Moinești, Județul Bacău",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "29 iunie – 04 iulie 2025",
            price: "2380 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Moinești – tabără activă în România",
            description:
                "Mario Resort & Event Center Moinești este situat în municipiul Moinești aflat în N-V județului Bacău, în bazinul mijlociu al sistemului de râuri Trotuș-Tazlău, localitate aflata la o distanta de 46 km de Bacău, 8 km de Comănești, 30 km de Tg. Ocna, 44 km de Slănic Moldova și 42 km de Onești. Cazarea se face în camere duble, triple sau de patru locuri, în funcție de disponibilitatea complexului. În funcție de gradul de ocupare, cazarea se va face la Hotel Mario, Hotel Topaz sau Pensiunea Mario. Momentan, noi am rezervat 50 de locuri, dar complexul are o capacitate de peste 200 de locuri.",
            image: moinestiAbout,
            imageAlt: "Moinești",
        },
        locationFacilities: makeFacilities("romania-city"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la *Casa Memorială George Bacovia* din Bacău;",
            "Vizită la *Casa Memorială Mihail Sadoveanu* din Bacău",
            "Vizită la *Castelul Ghica* din Dofteana (reședință de vânătoare);",
            "Vizită la *Palatul Ghica* de la Comănești (acum muzeu de etnografie și artă);",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    // ================= 2024 =================
    {
        slug: "tabara-predeal-2024",
        year: 2024,
        campName: "Tabără de limba engleză și aventură în România – Predeal",
        hero: {
            badge: "2024",
            title: "Tabăra de limba engleză și aventură English Explorers Camp",
            image: heroPredeal2024,
            imageAlt: "Tabără Predeal 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la *Conacul Bellu* din Urlați;",
                            "12.00 – Vizită la *Casa Memorială George Enescu* din Sinaia;",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2 - 5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.30 – Plecare de la pensiune",
                            "14.00 – Vizită la *Muzeul Trenulețelor* din Sinaia",
                            "14.00 – Vizită la *Muzeul Casa de Târgoveț Hagi Prodan* din Ploiești",
                            "17.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Predeal, Județul Prahova",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "30 iunie – 05 iulie 2024",
            price: "2.280 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Predeal – tabără activă în România",
            description:
                "Staţiunea Predeal este situatã în centrul României pe Valea Prahovei, între râurile Prahova şi Timiş, la poalele munţilor Bucegi (la nord-est de aceştia) şi cele ale munţilor Baiului (la nord-vest). \n \nOraşul Predeal este cel mai înalt oras din țară, aflat la altitudinea de 1030m-1110m și o destinație de călătorie adorată de bucureșteni. Oraşul Predeal oferã privelişti încântãtoare, fiind recomandat atât pentru recreere, cât şi pentru refacere din convalescenţã prin aerul sãu cu umiditate ridicatã şi nepoluat. \n \n Hotel Hera 3*** oferă oaspeților săi o oază de confort în mijlocul naturii în orice perioadă a anului. Structura inedită de cazare include 20 apartamente și 4 garsoniere cu suprafețe foarte generoase, dotări complete și vedere spectaculoasă asupra împrejurimilor.",
            image: predealAbout,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("predeal"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la *Conacul Bellu* din Urlați;",
            "Vizită la *Casa Memorială George Enescu* din Sinaia;",
            "Vizită la *Casa de Târgoveț Hagi Prodan* din Ploiești;",
            "Vizită la *Muzeul Trenulețelor* din Sinaia;",
            "Drumeție la *Cabana Trei Brazi*;",
            "Traseu pe aventura parc (optional);",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    {
        slug: "tabara-poiana-marului-2024",
        year: 2024,
        campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                hero: {
            badge: "2024",
            title: "Tabăra de limba engleză și aventură English Explorers Camp",
            image: heroPoianaMarului2025,
            imageAlt: "Tabără Poiana Marului 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la *Mănăstirea Rupestră* de la Șinca Veche;",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2 - 5",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.00 – Plecare de la pensiune",
                            "14.00 – Vizită la *Casa Memorială Nicolae Grigorescu* din Câmpina;",
                            "17.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Poiana Mărului, Județul Brașov",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "14 – 19 iulie 2024\n21 – 26 iulie 2024",
            price: "2.180 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără activă în România",
            description:
                "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
            image: poianaMaruluiAbout,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la Curtea Domnească din Piatra Neamț;",
            "Vizită la Cetatea Neamț;",
            "Vizită la Casa Memorială Ion Creangă;",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    {
        slug: "tabara-marea-britanie-2024",
        year: 2024,
        campName: "Tabără în Marea Britanie – Little Canada Activity Centre",
          hero: {
            badge: "2024",
            title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
            image: liddingtonHero,
            imageAlt: "Little Canada Activity Centre",
        },
        visibility: {
            showPriceDetails: false,
        },
about: {
  title: "Despre Tabără",
  paragraphs: [
    "Anul acesta vă propunem o tabără internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singura diferență este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi.",
  ],

  // 👇 NOU – doar pentru această tabără
  extraTitle: "Cu cine colaborăm?",
  extraParagraphs: [
    "PGL Travel este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
  ],
},
        

        quickInfo: {
            location: "Little Canada Activity Centre",
            duration: "8 zile / 7 nopți",
            ageGroup: "11–15 ani",
            dates: "27 iulie – 03 august 2024",
            price: "730 GBP",
        },
        highlights: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
            "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii",
        ],
        locationDescription: {
            title: "Centrul de activități Little Canada",
            description:
                "Centrul de activități în care vom merge anul acesta, Little Canada este amplasat pe Insula Wight, aflată pe coasta de sud a Angliei, cu iesire la Canalul Mânecii, ceea ce îi conferă un specific aparte. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de 850 de persoane, având o poziție convenabilă pe hartă, la două ore de Londra (cu autocarul) și destul de aproape de obiective turistice importante (Carisbrooke Castle, Isle of Wight Zoo, Tiger and Big Cat Sanctuary, Amazon World, Osborne House, Robin Hill Adventure Park etc), dar si de porturi, cum ar fi Portsmouth și Ryde. \n \n Centrul de pe Insula Wight este amplasat pe malurile pârâului Wootton, la doar 10 minute de port și cuprinde 24 de zone de aventură (terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri etc ) întinse pe 48 de hectare de teren, centrul de activitati pe apa de la Portland (care a fost gazdă Olimpiadei sporturilor de apa din 2012) si acces direct la mare si plaja, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
            image: liddingtonAbout,
            imageAlt: "Manchester",
        },
        locationFacilities: makeFacilities("liddington"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (două de jumătate de zi și una de o zi întreagă)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Asigurare de călătorie",
        ],
        notIncludedInPrice: [
            "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
            "Asigurare storno (optional)",
            "Cheltuieli personale",
        ],
        activitiesDescription:
            "Activitățile desfășurate în cadrul taberei sunt numeroase și extrem de variate, fiind concepute pentru a stimula spiritul de aventură, lucrul în echipă și dezvoltarea personală a participanților. După-amiaza, copiii pot lua parte la activități precum Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire, fiecare dintre acestea fiind adaptată nivelului de vârstă și desfășurată în condiții de siguranță. Seara este dedicată activităților recreative și de socializare, incluzând jocuri și evenimente precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races, menite să consolideze relațiile dintre participanți și să creeze experiențe memorabile într-o atmosferă relaxată și distractivă.",
        activityImages: [activityLiggdington1, activityLiggdington2, activityLiggdington3, activityLiggdington4],
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "5%", condition: "Completează dacă se aplică" },
        ],
        otherCamps: [
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        sections: [
        {
                type: "richText",
                title: "Posibile destinații de excursii",
                paragraphs: [
                    "Portsmouth Historic Dockyard și HMS Victory, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Carisbrooke Castle și Newtown",
                    "Robin Hill Country Park si Blackgand Chine",
                    "Isle of Wight Zoo (Tiger and Cat Sanctuary)",
                    "Osborne House",
                ],

            },
    ],       
        luggageImage: { src: kitTabaraImage, alt: "Bagaj Tabara", title: "Ce trebuie să conțină bagajul copiilor" },
        programImage: { src: programImage, alt: "Program orientativ" },
        menuImage: { src: meniuLiddington, alt: "Meniu orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025",
        },
    },

    {
        slug: "scoala-de-vara-marea-britanie-2024",
        year: 2024,
        campName: "Școală de vară de limba engleză în Marea Britanie – Winchester",
          hero: {
            badge: "2024",
            title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
            image: heroWinchester2024,
            imageAlt: "University of Winchester",
        },
        visibility: {
            showPriceDetails: false,
        },
about: {
  title: "Despre Tabără",
  paragraphs: [
    "Una dintre cele mai frumoase destinații turistice ale Marii Britanii, Winchester este un oraș pitoresc situat pe malurile râului Itchen și cunoscut ca centru istoric și cultural al ținutul Hampshire. Orașul este faimos pentru catedrala Winchester, care are cel mai lung naos medieval din Europa, si pentru Colegiul Winchester, una dintre cele mai vechi instituții de învățământ din Marea Britanie, fondat de Episcopul William de Wykeham în 1382 ca școală de baieți.",
    "La mai puțin de 100 de kilometri distanta de Londra, orașul Winchester este locul în care a trăit și scris Jane Austen, una dintre cele mai importante scriitoare ale secolului al XIX-lea. Tot aici găsim și The Great House sau Chawton House, un conac englezesc vechi de peste 400 ani, locul preferat de Jane Austen ca spațiul de desfășurare a acțiunii în romanele sale"
],

  // 👇 NOU – doar pentru această tabără
  extraTitle: "",
  extraParagraphs: [
    "",
  ],
},
        

        quickInfo: {
            location: "University of Winchester",
            duration: "8 zile / 7 nopți",
            ageGroup: "12 – 18 ani",
            dates: "27 iulie – 03 august 2024",
            price: "890 GBP",
        },
        highlights: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
            "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii",
        ],
        locationDescription: {
            title: "",
            description:
                "Începuturile Universității Winchester și ale orașului sunt strâns legate de Colegiul Winchester, care a fost înființat prin eforturile Episcopului Wykeham, ulterior ajuns Cancelar al Angliei. Cariera lui Wykeham i-a permis dobândirea de averi uriașe, pe care le-a folosit pentru fondarea a două colegii importante chiar și astăzi: New College Oxford și Winchester College. Acestea urmau să furnizeze educație pentru 70 savanți sub motto-ul Manierele fac omul. Acest motto (Manners Makyth Man) încă ghiează viețile celor 700 de elevi care învață la Colegiul Winchester astăzi. \n \n Universitatea din Winchester a fost initial o mică insitituție de formare a profesorilor fondată de Biserica Anglicană în anul 1840. Acum, la această universitate studiază peste 9000 de tineri care pot alege dintre discipline de studiu cum ar fi: artele, managementul afacerilor, tehnologiile digitale, dreptul, medicina, științele sociale etc. Ceremonia de absolvire se ține la Catedrala Winchester, un reper istoric important pentru această zonă geografică.",
            image: aboutWinchester2024,
            imageAlt: "Winchester",
        },
        locationFacilities: makeFacilities("winchester"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (două de jumătate de zi și una de o zi întreagă)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Asigurare de călătorie",
        ],
        notIncludedInPrice: [
            "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
            "Asigurare storno (optional)",
            "Cheltuieli personale",
        ],
        activitiesDescription:
            "Activitățile desfășurate în cadrul taberei sunt numeroase și foarte variate, oferind participanților ocazia de a explora și de a se bucura de experiențe educative, sportive și recreative. Programul include vizitarea orașului, cu activități de shopping și orientare, activități sportive în aer liber și în sala de sport multifuncțională, precum și o gamă largă de ateliere interactive, printre care se numără dans, zumba, actorie, arts & crafts, frisbee, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă, treasure hunt, escape rooms, ateliere de înfrumusețare, tatuaje cu henna și ateliere de preparare a clătitelor. Serile sunt dedicate activităților de divertisment și socializare, incluzând quiz-uri, vizionări de filme, prezentări de modă, seri tematice, karaoke, mima, jocuri de tip Cluedo, precum și board games, toate contribuind la crearea unei atmosfere dinamice și memorabile.",
        activityImages: [activityWinchester1, activityWinchester2, activityWinchester3, activityWinchester4],
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "5%", condition: "Completează dacă se aplică" },
        ],
        otherCamps: [
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],    
        programImage: { src: programWinchesterImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025",
        },
    },

    // ================= 2023 =================
    {
        slug: "tabara-de-engleza-poiana-marului-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Poiana Mărului",
                hero: {
            badge: "2023",
            title: "Tabăra de limba engleză și aventură English Explorers Camp",
            image: heroPoianaMarului2025,
            imageAlt: "Tabără Poiana Marului 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la Gradina Zoologica si *Manastirea Dealu* din Târgoviște;",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2 - 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 7",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.30 – Plecare de la pensiune",
                            "14.00 – Vizită la *Peștera Ialomița*;",
                            "17.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Poiana Mărului, Județul Brașov",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "09 – 14 iulie 2023\n16 – 21 iulie 2023",
            price: "1.980 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără activă în România",
            description:
                "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
            image: poianaMaruluiAbout,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la Curtea Domnească din Piatra Neamț;",
            "Vizită la Cetatea Neamț;",
            "Vizită la Casa Memorială Ion Creangă;",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    {
        slug: "tabara-de-engleza-valea-oltului-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Valea Oltului",
                hero: {
            badge: "2023",
            title: "Tabăra de limba engleză și aventură English Explorers Camp",
            image: heroValeaOltului2023,
            imageAlt: "Tabără Valea Oltului 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },
        sections: [
            {
                type: "twoCols",
                title: "Avantajele participării la tabăra de limba engleză și aventură",
                left: [
                    "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
                    "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
                    "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;",
                ],
                right: [
                    "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
                    "Prin programul de limba engleză care se va desfășura pe două coordonate:",
                    "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
                    "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților.",
                ],
            },
            {
                type: "gridBullets",
                title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
                columns: 2,
                cards: [
                    {
                        subtitle: "Ziua 1",
                        items: [
                            "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
                            "11.00 – Vizită la Gradina Zoologică din Râmnicu Vâlcea și *Mănăstirea Cozia*, Călimănești;",
                            "14.30 – Cazare și prânz",
                            "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
                            "19.30-20.30 – Cina",
                            "20.30 – 22.00 – Scavanger Hunt",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 2 - 6",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
                            "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
                            "13.00 – Masa de prânz",
                            "14.00 – 15.00 – Timp liber",
                            "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
                            "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
                            "19.00 – Cina",
                            "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
                            "21.30 – 22.00 – Dans sau timp liber în camere",
                            "22.30 – Stingerea",
                        ],
                    },
                    {
                        subtitle: "Ziua 7",
                        items: [
                            "08.00 – Deşteptarea muzicală",
                            "08.30 – Înviorarea în ritm de dans",
                            "09.00 – Micul dejun",
                            "09.45 – 11.00 – Festivitate de premiere si socializare",
                            "11.30 – Plecare de la pensiune",
                            "14.00 – Vizită la *Curtea Domnească* și *Mănăstirea Curtea de Argeș*;",
                            "17.00 – Sosire in Bucuresti",
                        ],
                    },
                ],
            },

            {
                type: "richText",
                title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
                paragraphs: [
                    "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
                    "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
                    "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
                    "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
                ],

            },
        ]
        ,
        visibility: {
            showAbout: false,
            showProgramImage: false,
            showLuggageImage: false,
            showActivities: false,
            showDiscounts: false,
        },
        quickInfo: {
            location: "Valea Oltului, Vâlcea",
            duration: "6 zile / 5 nopți",
            ageGroup: "7 - 14 ani",
            dates: "25 – 30 iunie 2023",
            price: "2.080 Lei",
        },
        highlights: [
            "Engleză aplicată prin joc și proiecte",
            "Activități de aventură & teamwork",
            "Ateliere creative",
            "Drumeții / activități în natură (după caz)",
            "Dezvoltare personală: încredere & autonomie",
            "Program structurat și supravegheat",
        ],
        locationDescription: {
            title: "Locație",
            description:
                "Localitatea Brezoi se află în nordul județului Vâlcea, la confluența râului Lotru cu râul Olt, în cea mai mare depresiune intercarpatică din România, cunoscută sub numele de Țara Loviștei. Orașul este înconjurat de păduri de conifere. Brezoi se situează la 35 km nord de Râmnicu Vâlcea și la 66 km sud de Sibiu. De câtiva ani, acest orășel de munte găzduiește diferite festivaluri vara, dintre care cele mai appreciate sunt Bikers For Humanity Rock Fest și Open Air Blues Festival. \n \n Hotelul Class este situat la intrarea în orașul Brezoi când venim dinspre București, pe malul râului Olt, între versanți abrupți acoperiți de nesfârșite păduri.",
            image: aboutValeaOltului2023,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: [
            "6 zile (5 nopţi) cazare cu pensiune completă;",
            "Transport București-Moinești, tur-retur cu autocarul;",
            "Vizită la Gradina Zoologică din Râmnicu Vâlcea;",
            "Vizită la Mănăstirea Cozia, Călimănești;",
            "Vizită la Curtea Domnească și Mănăstirea Curtea de Argeș",
            "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
            "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
            "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;",
        ],
        notIncludedInPrice: [
            "Cheltuieli personale",
            "Excursii opționale (dacă există)",
        ],
        activitiesDescription:
            "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" },
        ],
        otherCamps: [
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
        ],
        luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
        programImage: { src: programImage, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: ROMANIA_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-moinesti-2026",
            selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026",
        },
    },

    {
        slug: "tabara-de-engleza-marea-britanie-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Marea Britanie",
         hero: {
            badge: "2023",
            title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
            image: heroOsmington2023,
            imageAlt: "Osmington",
        },
        visibility: {
            showPriceDetails: false,
        },
about: {
  title: "Despre Tabără",
  paragraphs: [
    "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
  ],

  // 👇 NOU – doar pentru această tabără
  extraTitle: "Cu cine colaborăm?",
  extraParagraphs: [
    "PGL Travel este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
  ],
},
        

        quickInfo: {
            location: "Osmington Bay Activity Centre",
            duration: "8 zile / 7 nopți",
            ageGroup: "11 – 18 ani",
            dates: "29 iulie – 05 august 2023",
            price: "730 GBP",
        },
        highlights: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
            "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii",
        ],
        locationDescription: {
            title: "Centrul de activități Osmington Bay",
            description:
                "Centrul educațional în care vom merge anul acesta, Osminton Bay din Dorset, este situat pe coasta de sud a Angliei, cu iesire la Canalul Mânecii, ceea ce îi conferă un specific aparte. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de 1100 de persoane, având o poziție convenabilă pe hartă, la două ore și jumătate de Londra (cu autocarul) și destul de aproape de orasele istorice Salisbury, Bath, dar si de porturi importante, cum ar fi Portsmouth. \n \n Centrul din Osmington Bay cuprinde 24 de zone de aventură (terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri etc ) întinse pe 42 de hectare de teren, centrul de activitati pe apa de la Portland (care a fost gazdă Olimpiadei sporturilor de apa din 2012) si acces direct la mare si plaja, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
            image: aboutOsmington2023,
            imageAlt: "Osmington Bay",
        },
        locationFacilities: makeFacilities("liddington"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (două de jumătate de zi și una de o zi întreagă)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Asigurare de călătorie",
        ],
        notIncludedInPrice: [
            "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
            "Asigurare storno (optional)",
            "Cheltuieli personale",
        ],
        activitiesDescription:
            "Activitățile desfășurate în cadrul taberei sunt numeroase și extrem de variate, fiind concepute pentru a stimula spiritul de aventură, lucrul în echipă și dezvoltarea personală a participanților. După-amiaza, copiii pot lua parte la activități precum Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire, fiecare dintre acestea fiind adaptată nivelului de vârstă și desfășurată în condiții de siguranță. Seara este dedicată activităților recreative și de socializare, incluzând jocuri și evenimente precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races, menite să consolideze relațiile dintre participanți și să creeze experiențe memorabile într-o atmosferă relaxată și distractivă.",
        activityImages: [activityLiggdington1, activityLiggdington2, activityLiggdington3, activityLiggdington4],
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "5%", condition: "Completează dacă se aplică" },
        ],
        otherCamps: [
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        sections: [
        {
                type: "richText",
                title: "Posibile destinații de excursii",
                paragraphs: [
                    "Stonehenge & Salisbury",
                    "Weymouth",
                    "Bath",
                    "Corfe Castle",
                    "Dorchester",
                    "Bournemouth",
                ],

            },
    ],       
        luggageImage: { src: kitTabaraImage, alt: "Bagaj Tabara", title: "Ce trebuie să conțină bagajul copiilor" },
        programImage: { src: programImage, alt: "Program orientativ" },
        menuImage: { src: meniuLiddington, alt: "Meniu orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025",
        },
    },

    {
        slug: "scoala-de-vara-marea-britanie-2023",
        year: 2023,
        campName: "Școală de vară - Marea Britanie",
          hero: {
            badge: "2023",
            title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
            image: heroPortsmouth2023,
            imageAlt: "Portsmouth",
        },
        visibility: {
            showPriceDetails: false,
        },
about: {
  title: "Despre Tabără",
  paragraphs: [
    "Una dintre cele mai frumoase destinații turistice ale Marii Britanii, Portsmouth este un oras pitoresc situat pe coasta de sud a Marii Britanii și este unul dintre cele mai importante porturi ale Regatului Unit, cu o populatie de aproape 250.000 de locuitori si o densitate a populatie pe metru patrat care o depaseste pe cea a Londrei. La aproximativ 100 de kilmotrei distanta de Londra si 30 de Southampton, portul din Portsmouth dateaza de pe vremea romanilor si este incarcat de istori, fiind la inceputul secolului al XIX-lea cel mai fortificat oras din lume. iar centrul orașului păstrează multe clădiri ce datează din epoca victoriană.",
    "Desi atractia principala pentru vizitatori ramane marea si istoria navala, orarul este incărcat de istorie la tot pasul, un veritabil “muzeu în aer liber”, fiind împânzit de clădiri istorice (este si locul de nastere al lui Charles Dickens) și înconjurat de zidurile vechii cetati, acum transformate in muzee sau sali de spectacole."
],

  // 👇 NOU – doar pentru această tabără
  extraTitle: "",
  extraParagraphs: [
    "",
  ],
},
        

        quickInfo: {
            location: "University of Portsmouth",
            duration: "8 zile / 7 nopți",
            ageGroup: "12 – 18 ani",
            dates: "30 iulie – 06 august 2023",
            price: "840 GBP",
        },
        highlights: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Materiale de studiu",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
            "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii",
        ],
        locationDescription: {
            title: "Școala",
            description:
                "Universitatea din Portsmouth în forma actuală datează din 1992, dar cea mai veche scoala din oras The Portsmouth Grammar School dateaza din anul 1732 si era, desigur, scoala de baieti. Astazi universitatea din Portsmouth numara peste 23.000 students si peste 2.500 de cadre didactice si personal auxiliar si este listata ca fiind printre cele mai bune 100 universitati din lume.",
            image: aboutPortsmouth2023,
            imageAlt: "Portsmouth",
        },
        locationFacilities: makeFacilities("liddington"),
        includedInPrice: [
            "Cazare în campus",
            "Pensiune completă",
            "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
            "Test inițial de evaluare",
            "Certificate de absolvire a cursurilor",
            "Program zilnic de activități comune",
            "Program zilnic tematic",
            "Excursii (două de jumătate de zi și una de o zi întreagă)",
            "Un însoțitor de grup de la Pro Erudio la 10 copii",
            "Asigurare de călătorie",
        ],
        notIncludedInPrice: [
            "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
            "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
            "Asigurare storno (optional)",
            "Cheltuieli personale",
        ],
        activitiesDescription:
            "Activitățile desfășurate în cadrul taberei sunt numeroase și foarte variate, oferind participanților o experiență educativă și recreativă completă. Programul include vizitarea orașului, cu activități de shopping și orientare, activități sportive în aer liber și în sala de sport multifuncțională, precum și o gamă diversificată de ateliere interactive, printre care se numără dans, actorie, fotbal, arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă, precum și activități de jurnalism și media. Serile sunt dedicate activităților de socializare și divertisment, incluzând quiz-uri, vizionări de filme, prezentări de modă și seri tematice. De asemenea, programul cuprinde două excursii de o jumătate de zi, cu destinații precum Portsmouth sau Southampton, Catedrala din Chichester sau Castelul Southsea, precum și o excursie de o zi întreagă, cu posibilitate de vizitare a unor obiective importante precum Londra, Brighton sau Salisbury/Stonehenge, toate acestea contribuind la o experiență memorabilă și educativă pentru participanți.",
        activityImages: [activityPortsmouth1, activityPortsmouth2, activityPortsmouth3, activityPortsmouth4],
        discounts: [
            { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "5%", condition: "Completează dacă se aplică" },
        ],
        otherCamps: [
            {
                name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
                location: "Irlanda de Nord",
                type: "Internațională",
                image: heroDublinUniversity,
                to: "/scoala-de-vara-dublin-2026",
            },
            {
                name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
                location: "Marea Britanie",
                type: "Internațională",
                image: heroGrosvenor,
                to: "/tabara-marea-britanie-grosvenor-hall-2026"
            },
            {
                name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
                location: "România",
                type: "Aventură",
                image: heroPoianaMarului,
                to: "/tabara-poiana-marului-2026",
            },
            {
                name: "Tabără de limba engleză și aventură în România – Moinești",
                location: "România",
                type: "Aventură",
                image: heroMoinești,
                to: "/tabara-moinesti-2026",
            },
        ],
        sections: [
        {
                type: "richText",
                title: "Posibile destinații de excursii",
                paragraphs: [
                    "Stonehenge & Salisbury",
                    "Weymouth",
                    "Bath",
                    "Corfe Castle",
                    "Dorchester",
                    "Bournemouth",
                ],

            },
    ],       
        programImage: { src: programUK, alt: "Program orientativ" },
        registrationInfo: DEFAULT_REGISTRATION,
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025",
        },
    },
];

/* =======================
   LOOKUP
======================= */
export function getCampBySlug(slug: string | undefined) {
    if (!slug) return null;
    return campsData.find((c) => c.slug === slug) ?? null;
}
