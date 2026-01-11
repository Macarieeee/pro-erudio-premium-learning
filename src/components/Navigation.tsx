import { useMemo, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const campsByYear = [
  {
    year: 2026,
    camps: [
      { label: "Școala de vară de limbă engleză la Dublin", to: "/scoala-de-vara-dublin-2026" },
      { label: "Tabara in Marea Britanie Grosvenor Hall Activity Centre", to: "/tabara-marea-britanie-grosvenor-hall-2026" },
      { label: "Tabără de limba engleză și aventură în România – Moinești", to: "/tabara-moinesti-2026" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2026" },
    ],
  },
  {
    year: 2025,
    camps: [
      { label: "Școală de vară de limba engleză în Marea Britanie – Manchester", to: "/tabara-marea-britanie-manchester-2025" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2025" },
      { label: "Tabără de limba engleză și aventură în România – Moinești", to: "/tabara-moinesti-2025" },
    ],
  },
  {
    year: 2024,
    camps: [
      { label: "Tabără de limba engleză și aventură în România – Predeal", to: "/tabara-predeal-2024" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2024" },
      { label: "Tabără în Marea Britanie – Little Canada Activity Centre", to: "/tabara-marea-britanie-2024" },
      { label: "Școală de vară de limba engleză în Marea Britanie – Winchester", to: "/scoala-de-vara-marea-britanie-2024" },
    ],
  },
  {
    year: 2023,
    camps: [
      { label: "Tabăra de Engleză - Poiana Mărului", to: "/tabara-de-engleza-poiana-marului-2023" },
      { label: "Tabăra de Engleză - Valea Oltului", to: "/tabara-de-engleza-valea-oltului-2023" },
      { label: "Tabăra de Engleză - Marea Britanie", to: "/tabara-de-engleza-marea-britanie-2023" },
      { label: "Școală de vară - Marea Britanie", to: "/scoala-de-vara-marea-britanie-2023" },
    ],
  },
];

const journalItems = [
  { label: "Jurnal Manchester 2025", slug: "manchester-2025" },
  { label: "Jurnal Moinești 2024", slug: "moinesti-2024" },
  { label: "Jurnal Predeal 2024", slug: "predeal-2024" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // pentru mobile accordion simple
  const [mobileOpen, setMobileOpen] = useState<{
    tabere2026: boolean;
    arhiva: boolean;
    jurnale: boolean;
  }>({
    tabere2026: false,
    arhiva: false,
    jurnale: false,
  });

  const camps2026 = useMemo(() => campsByYear.find((x) => x.year === 2026)?.camps ?? [], []);
  const archiveByYear = useMemo(() => campsByYear.filter((x) => x.year !== 2026), []);
  const journalYears = useMemo(() => campsByYear.map((x) => x.year), []);

  return (
    <nav className="fixed top-0 w-full bg-secondary/95 backdrop-blur-sm z-50 pb-2 pt-2">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Pro Erudio Logo" className="h-16 w-auto" />
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-secondary-foreground/90 hover:text-secondary-foreground transition-colors font-medium font-large"
            >
              Acasă
            </Link>

            {/* Tabere 2026 dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium">
                Tabere 2026
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-[-50px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[360px]">
                  {camps2026.map((camp) => (
                    <Link
                      key={camp.to}
                      to={camp.to}
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                    >
                      {camp.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Arhiva tabere dropdown (ani + lista) */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium">
                Arhivă tabere
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-[-500px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg p-3 min-w-[820px]">
                  <div className="grid grid-cols-2 gap-3">
                    {archiveByYear.map((item) => (
                      <div key={item.year} className="rounded-lg border border-border overflow-hidden">
                        <div className="px-3 py-2 font-semibold text-foreground bg-secondary/40">
                          {item.year}
                        </div>
                        <div className="py-1">
                          {item.camps.map((camp) => (
                            <Link
                              key={camp.to}
                              to={camp.to}
                              className="block px-3 py-2 text-foreground hover:bg-accent transition-colors"
                            >
                              {camp.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Jurnale tabara dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium">
                Jurnale tabără
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-[-100px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[260px]">
                  {journalItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/jurnal/${item.slug}`}
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* <Link to="/test-de-amplasare">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-full px-6 font-large">
                Test amplasament
              </Button>
            </Link> */}
          </div>

          {/* MOBILE burger */}
          <button
            className="lg:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-secondary/95 border-t border-secondary-foreground/20">
          <div
            className="container mx-auto px-4 py-4 space-y-4 overflow-y-auto overscroll-contain"
            style={{ maxHeight: "calc(100vh - 80px)" }} // 80px ≈ înălțimea navbarului tău
          >
            <Link
              to="/"
              className="block text-secondary-foreground/90 hover:text-secondary-foreground transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Acasă
            </Link>

            {/* Tabere 2026 */}
            <div className="py-2">
              <button
                className="w-full flex items-center justify-between text-secondary-foreground font-medium py-2"
                onClick={() => setMobileOpen((s) => ({ ...s, tabere2026: !s.tabere2026 }))}
              >
                <span>Tabere 2026</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen.tabere2026 ? "rotate-180" : ""}`} />
              </button>

              {mobileOpen.tabere2026 && (
                <div className="pl-4 space-y-2 pt-2">
                  {camps2026.map((camp) => (
                    <Link
                      key={camp.to}
                      to={camp.to}
                      className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {camp.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Arhiva tabere */}
            <div className="py-2">
              <button
                className="w-full flex items-center justify-between text-secondary-foreground font-medium py-2"
                onClick={() => setMobileOpen((s) => ({ ...s, arhiva: !s.arhiva }))}
              >
                <span>Arhivă tabere</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen.arhiva ? "rotate-180" : ""}`} />
              </button>

              {mobileOpen.arhiva && (
                <div className="pl-4 space-y-4 pt-2">
                  {archiveByYear.map((item) => (
                    <div key={item.year}>
                      <div className="text-secondary-foreground/90 font-semibold mb-2">{item.year}</div>
                      <div className="space-y-2">
                        {item.camps.map((camp) => (
                          <Link
                            key={camp.to}
                            to={camp.to}
                            className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {camp.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Jurnale tabara */}
            <div className="py-2">
              <button
                className="w-full flex items-center justify-between text-secondary-foreground font-medium py-2"
                onClick={() => setMobileOpen((s) => ({ ...s, jurnale: !s.jurnale }))}
              >
                <span>Jurnale tabără</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen.jurnale ? "rotate-180" : ""}`} />
              </button>

              {mobileOpen.jurnale && (
                <div className="pl-4 space-y-2 pt-2">
                  {journalItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/jurnal/${item.slug}`}
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* <Link to="/test-de-amplasare" onClick={() => setIsOpen(false)}>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6">
                Test amplasament
              </Button>
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
