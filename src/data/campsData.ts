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

/* =======================
   DOAR DEFAULT-URI COMUNE
======================= */

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

    // DOAR astea două pot fi default
    registrationInfo: typeof DEFAULT_REGISTRATION;
    requiredDocuments: string[];

    form: {
        selectValue: string;
        selectLabel: string;
    };
    sections?: CampSection[];
    visibility?: CampVisibility;
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

function makeFacilities(kind: "uk" | "dublin" | "romania-mountain" | "romania-city"): CampFacility[] {
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
        { icon: Trophy, label: "Teren multisport." },
        { icon: Users, label: "Loc de joacă pentru copii." },
        { icon: Building, label: "Sală multifuncțională." },
        {
            icon: Calendar,
            label:
                "4 saloane de evenimente",
        },
        { icon: Utensils, label: "2 restaurante." },
        { icon: Compass, label: "Parcare amenajată." },
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
            title: "Despre Tabără",
            paragraphs: [
                "Dublin este un centru cultural major în Irlanda, orașul în care s-au născut sau în care au trăit mulți scriitori remarcabili, cunoscuți în toată lumea. Primul scriitor de renume din Dublin a fost Jonathan Swift (1667-1745), autorul Călătoriilor lui Gulliver, dar cel mai mare dintre ei a fost James Joyce (1882-1941), care a revoluționat literatura prin romanul sau “Ulise” in 1922, roman remarcabil și prin faptul ca este plin de detalii despre Dublinul din anii 1920. Alți patru scriitori originari din Dublin și care au primit premiul Nobel pentru literatură sunt: William Butler Yeats în 1923, George Bernard Shaw în 1925, Samuel Beckett în 1969, Seamus Heaney în 1995. Dublin este cel mai mare centru de învățământ din Irlanda, cu trei universități. Universitatea din Dublin se află în centrul orașului și este cea mai veche din Irlanda, fondată în secolul XVI. Singurul său colegiu constitutiv, Trinity College (TCD) a fost consacrat printr-un act semnat de către regina Elisabeta I a Angliei. Universitatea Națională a Irlandei (NUI) fondată în 1854, este acum cea mai mare universitate din Irlanda, cea mai recentă fiind Universitatea Orașului Dublin (DCU) fondată în 1975. Această universitate este specializată în afaceri, inginerie, știința și industrie.",
                "Dublin este un important centru cultural irlandez, remarcându-se prin recunoașterea ca Oraș UNESCO al Literaturii în 2010. Orașul abundă în muzee, galerii de artă, instituții culturale și o scenă literară activă, influențată de mari scriitori și muzicieni. Dublinul dispune de o infrastructură culturală bogată, incluzând nu mai puțin de 62 de muzee, 51 de biblioteci publice, trei universități și 53 de galerii de artă..",
            ],
        },

        quickInfo: {
            location: "Dublin City University (DCU), Dublin",
            duration: "8 zile / 7 nopți",
            ageGroup: "12–17 ani",
            dates: "2–9 august 2026",
            price: "940 EUR / participant",
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
            title: "Dublin City University (DCU), Dublin",
            description:
                "Dublin City University (DCU) a fost fondată în 1980, iar de atunci a crescut de la un număr mic de studenți (200 în primul an de funcționare) la peste 19.000 de studenți astăzi. Universitatea dispune de cinci campusuri, trei dintre acestea fiind campusuri academice (Glasnevin, St. Patricks și All Hallows, unde studenții merg la cursuri, învață și socializează), unul sportiv DCU Sports Campus (întinzându-se pe 35 de hectare) și unul dedicat activităților de cercetare și inovație (DCU Alpha). Dublin City University (DCU) este o universitate tânără, dinamică și ambițioasă, care își propune să transforme viețile oamenilor prin educație, cercetare și inovație. Universitatea are o reputație excelentă, clasându-se în top 350 universități din lume, în ciuda faptului că este o universitate relativ tânără.",
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
            "Activitățile sunt numeroase și variate: activități sportive în aer liber și în sala de sport multifuncțională, ateliere (actorie, fotbal, arts & crafts), cluburi de conversație, seminarii pe diferite teme și jocuri de echipă (ex: Treasure Hunt, Bingo). Sunt incluse quiz-uri, vizionări de filme, prezentări de modă și seri tematice. Excursiile includ tururi de jumătate de zi în Dublin (plimbări, shopping, vizite la Muzeul Național de Istorie, Grădina Botanică, St Stephen’s Green etc.) și o excursie de o zi întreagă (posibil la Dún Laoghaire & Bray sau Howth).",
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
        about: {
            title: "Despre Tabără",
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
            price: "GPB 740 / participant",
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
                text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este 2480 lei. După această dată prețul poate suferi modificări.",
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
                            "14.30 – Vizită la Cetatea Neamț",
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
                            "14.00 – Vizită la Casa Memorială Ion Creangă",
                            "15.30 – Vizită la Curtea Domnească de la Piatra Nemți",
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
        },
        quickInfo: {
            location: "Moinești, Județul Bacău",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "28 iunie – 03 iulie 2026",
            price: "Lei 2480",
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
        slug: "tabara-poiana-marului-2026",
        year: 2026,
        campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        hero: {
            badge: "2026",
            title: "Tabără de limba engleză și aventură în România – Poiana Mărului",
            image: heroPoianaMarului,
            imageAlt: "Tabără Poiana Mărului 2026",
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
                            "11.00 – Vizită la Cetățile Hărman și Prejmer",
                            "12.00 – Vizită la Casa Memorială George Enescu din Sinaia",
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
        },
        quickInfo: {
            location: "Poiana Mărului, Județul Brașov",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "12 – 17 iulie 2026",
            price: "Lei 2380",
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
            "Vizită la Cetatea Hărman;",
            "Vizită la Cetatea Prejmer;",
            "Vizită la Peștera Valea Cetății;",
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
            price: "GBP 940",
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
            "Activitățile din tabără sunt numeroase și extrem de variate, fiind gândite pentru a îmbina mișcarea, creativitatea și socializarea: participanții vor lua parte la activități sportive desfășurate atât în aer liber, cât și în sala de sport multifuncțională, la ateliere de cooking, dans, actorie și fotbal, precum și la sesiuni de arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă (precum Capture the Flag), jurnalism și media. Programul include, de asemenea, quiz-uri, vizionări de filme, prezentări de modă și seri tematice, alături de două excursii de o jumătate de zi pentru descoperirea orașului Manchester (cu posibile vizite la MediaCity, Muzeul Științei și Industriilor sau turul Stadionului Manchester City) și o excursie de o zi întreagă, cu destinații posibile precum York, Chester sau Liverpool.",
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
            badge: "2026",
            title: "Tabără de limba engleză și aventură în România – Moinești",
            image: heroMoinești,
            imageAlt: "Tabără Moinești 2026",
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
                text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este 2480 lei. După această dată prețul poate suferi modificări.",
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
                            "14.30 – Vizită la Cetatea Neamț",
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
                            "14.00 – Vizită la Casa Memorială Ion Creangă",
                            "15.30 – Vizită la Curtea Domnească de la Piatra Nemți",
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
        },
        quickInfo: {
            location: "Moinești, Județul Bacău",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "28 iunie – 03 iulie 2026",
            price: "Lei 2480",
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
                            "14.30 – Vizită la Cetatea Neamț",
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
                            "14.00 – Vizită la Casa Memorială Ion Creangă",
                            "15.30 – Vizită la Curtea Domnească de la Piatra Nemți",
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
        },
        quickInfo: {
            location: "Moinești, Județul Bacău",
            duration: "6 zile / 5 nopți",
            ageGroup: "7-14 ani",
            dates: "29 iunie – 04 iulie 2025",
            price: "Lei 2380",
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

    // ================= 2024 =================
    {
        slug: "tabara-predeal-2024",
        year: 2024,
        campName: "Tabără de limba engleză și aventură în România – Predeal",
        hero: {
            badge: "2024",
            title: "Tabără de limba engleză și aventură în România – Predeal",
            image: heroGrosvenor,
            imageAlt: "Predeal 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Predeal, România (placeholder)",
            duration: "7 zile / 6 nopți (placeholder)",
            ageGroup: "10–16 ani (placeholder)",
            dates: "Vara 2024 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Engleză aplicată + conversație",
            "Drumeții & activități montane",
            "Jocuri de echipă",
            "Ateliere creative",
            "Dezvoltare personală",
            "Supraveghere completă",
        ],
        locationDescription: {
            title: "Predeal – tabără la munte",
            description:
                "Program montan cu engleză aplicată și activități outdoor. Accent pe teamwork, autonomie și experiențe memorabile.",
            image: heroGrosvenor,
            imageAlt: "Predeal",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: ["Cazare", "Mese", "Ateliere engleză", "Program activități", "Coordonare"],
        notIncludedInPrice: ["Transport (dacă nu este inclus)", "Cheltuieli personale"],
        activitiesDescription:
            "Drumeții, jocuri de echipă, ateliere de engleză și seri tematice. Programul final depinde de locație și condițiile meteo.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-predeal-2024",
            selectLabel: "Tabără de limba engleză și aventură în România – Predeal 2024",
        },
    },

    {
        slug: "tabara-poiana-marului-2024",
        year: 2024,
        campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        hero: {
            badge: "2024",
            title: "Tabără de limba engleză și aventură în România – Poiana Mărului",
            image: heroGrosvenor,
            imageAlt: "Poiana Mărului 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Poiana Mărului, România (placeholder)",
            duration: "7 zile / 6 nopți (placeholder)",
            ageGroup: "10–16 ani (placeholder)",
            dates: "Vara 2024 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Engleză prin joc și conversație",
            "Activități outdoor",
            "Jocuri & competiții",
            "Ateliere creative",
            "Seri tematice",
            "Echipă de coordonare",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără în natură",
            description:
                "Program structurat: engleză aplicată, activități de echipă și experiențe outdoor pentru energie și progres.",
            image: heroGrosvenor,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: ["Cazare", "Mese", "Ateliere engleză", "Program activități", "Coordonare"],
        notIncludedInPrice: ["Transport (dacă nu este inclus)", "Cheltuieli personale"],
        activitiesDescription:
            "Activități în aer liber, ateliere de engleză, jocuri de echipă și seri tematice. Programul final se adaptează grupului.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-poiana-marului-2024",
            selectLabel: "Tabără de limba engleză și aventură în România – Poiana Mărului 2024",
        },
    },

    {
        slug: "tabara-marea-britanie-2024",
        year: 2024,
        campName: "Tabără în Marea Britanie – Little Canada Activity Centre",
        hero: {
            badge: "2024",
            title: "Tabără în Marea Britanie – Little Canada Activity Centre",
            image: heroGrosvenor,
            imageAlt: "Little Canada 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "UK – Little Canada (placeholder)",
            duration: "8 zile / 7 nopți (placeholder)",
            ageGroup: "11–16 ani (placeholder)",
            dates: "Vara 2024 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Experiență internațională",
            "Aventură + activități outdoor",
            "Program de grup & socializare",
            "Excursii (după program)",
            "Suport & coordonare",
            "Progres în engleză (dacă se aplică)",
        ],
        locationDescription: {
            title: "Little Canada – centru de activități în UK",
            description:
                "Centru de aventură cu activități variate. Programul include provocări, jocuri de echipă și experiențe care cresc încrederea și autonomia.",
            image: heroGrosvenor,
            imageAlt: "Little Canada",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: ["Cazare", "Mese", "Program activități", "Coordonare", "Materiale"],
        notIncludedInPrice: ["Transport avion", "Transferuri (dacă nu sunt incluse)", "Asigurări", "Cheltuieli personale"],
        activitiesDescription:
            "Activități indoor/outdoor, jocuri de echipă și provocări de aventură. Programul final depinde de centrul ales și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-marea-britanie-2024",
            selectLabel: "Tabără în Marea Britanie – Little Canada Activity Centre 2024",
        },
    },

    {
        slug: "scoala-de-vara-marea-britanie-2024",
        year: 2024,
        campName: "Școală de vară de limba engleză în Marea Britanie – Winchester",
        hero: {
            badge: "2024",
            title: "Școală de vară de limba engleză în Marea Britanie – Winchester",
            image: heroGrosvenor,
            imageAlt: "Winchester 2024",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Winchester, UK (placeholder)",
            duration: "8 zile / 7 nopți (placeholder)",
            ageGroup: "12–17 ani (placeholder)",
            dates: "Vara 2024 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Cursuri de engleză + conversație",
            "Excursii & obiective culturale",
            "Activități de grup",
            "Suport complet",
            "Experiență internațională",
            "Program echilibrat",
        ],
        locationDescription: {
            title: "Winchester – școală de vară în UK",
            description:
                "Program educațional cu cursuri și activități culturale. Ideal pentru dezvoltarea comunicării și a încrederii în vorbire.",
            image: heroGrosvenor,
            imageAlt: "Winchester",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: ["Cazare", "Mese", "Cursuri engleză", "Materiale", "Activități/excursii", "Coordonare"],
        notIncludedInPrice: ["Transport avion", "Transferuri (dacă nu sunt incluse)", "Asigurări", "Cheltuieli personale"],
        activitiesDescription:
            "Cursuri + activități urbane, proiecte de grup și sesiuni de conversație. Programul final se comunică înainte de plecare.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "scoala-de-vara-marea-britanie-2024",
            selectLabel: "Școală de vară de limba engleză în Marea Britanie – Winchester 2024",
        },
    },

    // ================= 2023 =================
    {
        slug: "tabara-de-engleza-poiana-marului-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Poiana Mărului",
        hero: {
            badge: "2023",
            title: "Tabăra de Engleză - Poiana Mărului",
            image: heroGrosvenor,
            imageAlt: "Poiana Mărului 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Poiana Mărului, România (placeholder)",
            duration: "7 zile / 6 nopți (placeholder)",
            ageGroup: "10–16 ani (placeholder)",
            dates: "Vara 2023 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Engleză zilnic, prin metode interactive",
            "Activități outdoor & jocuri",
            "Ateliere creative",
            "Lucru în echipă",
            "Seri tematice",
            "Coordonare și supraveghere",
        ],
        locationDescription: {
            title: "Poiana Mărului – tabără în natură",
            description:
                "Program pentru copii care vor să practice engleza într-un cadru prietenos, cu activități în aer liber și mult teamwork.",
            image: heroGrosvenor,
            imageAlt: "Poiana Mărului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: ["Cazare", "Mese", "Curs/atelier engleză", "Program activități", "Coordonare"],
        notIncludedInPrice: ["Transport (dacă nu este inclus)", "Cheltuieli personale"],
        activitiesDescription:
            "Engleză prin joc, proiecte scurte, activități de echipă și provocări outdoor. Programul exact depinde de locație și grup.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-de-engleza-poiana-marului-2023",
            selectLabel: "Tabăra de Engleză - Poiana Mărului 2023",
        },
    },

    {
        slug: "tabara-de-engleza-valea-oltului-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Valea Oltului",
        hero: {
            badge: "2023",
            title: "Tabăra de Engleză - Valea Oltului",
            image: heroGrosvenor,
            imageAlt: "Valea Oltului 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Valea Oltului, România (placeholder)",
            duration: "7 zile / 6 nopți (placeholder)",
            ageGroup: "10–16 ani (placeholder)",
            dates: "Vara 2023 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Engleză aplicată și conversație",
            "Activități în natură",
            "Jocuri & competiții",
            "Ateliere",
            "Teamwork",
            "Coordonare completă",
        ],
        locationDescription: {
            title: "Valea Oltului – tabără în natură",
            description:
                "Tabără cu focus pe engleză și activități în aer liber. Programul urmărește autonomie, colaborare și comunicare în engleză.",
            image: heroGrosvenor,
            imageAlt: "Valea Oltului",
        },
        locationFacilities: makeFacilities("romania-mountain"),
        includedInPrice: ["Cazare", "Mese", "Curs/atelier engleză", "Program activități", "Coordonare"],
        notIncludedInPrice: ["Transport (dacă nu este inclus)", "Cheltuieli personale"],
        activitiesDescription:
            "Jocuri, provocări de echipă, sesiuni de engleză, drumeții (după caz) și seri tematice.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-de-engleza-valea-oltului-2023",
            selectLabel: "Tabăra de Engleză - Valea Oltului 2023",
        },
    },

    {
        slug: "tabara-de-engleza-marea-britanie-2023",
        year: 2023,
        campName: "Tabăra de Engleză - Marea Britanie",
        hero: {
            badge: "2023",
            title: "Tabăra de Engleză - Marea Britanie",
            image: heroGrosvenor,
            imageAlt: "UK 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Marea Britanie (placeholder)",
            duration: "8 zile / 7 nopți (placeholder)",
            ageGroup: "11–16 ani (placeholder)",
            dates: "Vara 2023 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Engleză + interacțiune internațională",
            "Program de aventură",
            "Excursii (după program)",
            "Teamwork & socializare",
            "Suport complet",
            "Experiență internațională",
        ],
        locationDescription: {
            title: "Marea Britanie – tabără internațională",
            description:
                "Program tip camp internațional: activități de aventură și interacțiune în engleză. Ideal pentru progres și încredere.",
            image: heroGrosvenor,
            imageAlt: "UK",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: ["Cazare", "Mese", "Program activități", "Coordonare", "Materiale"],
        notIncludedInPrice: ["Transport avion", "Transferuri (dacă nu sunt incluse)", "Asigurări", "Cheltuieli personale"],
        activitiesDescription:
            "Activități outdoor & indoor, jocuri de echipă și excursii. Programul final se comunică înainte de plecare.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "tabara-de-engleza-marea-britanie-2023",
            selectLabel: "Tabăra de Engleză - Marea Britanie 2023",
        },
    },

    {
        slug: "scoala-de-vara-marea-britanie-2023",
        year: 2023,
        campName: "Școală de vară - Marea Britanie",
        hero: {
            badge: "2023",
            title: "Școală de vară - Marea Britanie",
            image: heroGrosvenor,
            imageAlt: "Școală de vară UK 2023",
        },
        about: {
            title: "Despre Tabără",
            paragraphs: [
                "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
                "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme.",
            ],
        },

        quickInfo: {
            location: "Marea Britanie (placeholder)",
            duration: "8 zile / 7 nopți (placeholder)",
            ageGroup: "12–17 ani (placeholder)",
            dates: "Vara 2023 (completează exact perioada)",
            price: "— (completează prețul)",
        },
        highlights: [
            "Cursuri de engleză + conversație",
            "Excursii culturale",
            "Activități de grup",
            "Program echilibrat",
            "Suport complet",
            "Experiență internațională",
        ],
        locationDescription: {
            title: "Școală de vară în Marea Britanie",
            description:
                "Program educațional orientat pe comunicare, cu activități și excursii care pun engleza în practică zilnic.",
            image: heroGrosvenor,
            imageAlt: "UK Summer School",
        },
        locationFacilities: makeFacilities("uk"),
        includedInPrice: ["Cazare", "Mese", "Cursuri engleză", "Materiale", "Activități/excursii", "Coordonare"],
        notIncludedInPrice: ["Transport avion", "Transferuri (dacă nu sunt incluse)", "Asigurări", "Cheltuieli personale"],
        activitiesDescription:
            "Cursuri + activități culturale, proiecte de grup și conversație. Programul final se comunică înainte de plecare.",
        activityImages: IMGSET_DEFAULT,
        discounts: [
            { type: "Continuitate", value: "—", condition: "Completează dacă se aplică" },
            { type: "Frați", value: "—", condition: "Completează dacă se aplică" },
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
        requiredDocuments: DEFAULT_REQUIRED_DOCS,
        form: {
            selectValue: "scoala-de-vara-marea-britanie-2023",
            selectLabel: "Școală de vară - Marea Britanie 2023",
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
