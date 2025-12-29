import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Acasă", href: "/" },
    { label: "Despre Noi", href: "/despre-noi" },
  ];

  const campYears = ["2023", "2024", "2025", "2026"];

  return (
    <nav className="fixed top-0 w-full bg-secondary/95 backdrop-blur-sm z-50 pb-2 pt-2">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <img src={logo} alt="Pro Erudio Logo" className="h-16 w-auto" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-secondary-foreground/90 hover:text-secondary-foreground transition-colors font-medium font-large"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-secondary-foreground/90 hover:text-primary-foreground transition-colors font-medium font-large"
                >
                  {item.label}
                </a>
              )
            ))}

            {/* Tabere Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium">
                Tabere
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[100px]">
                  {campYears.map((year) => (
                    <div key={year} className="relative group/year">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-foreground hover:bg-accent transition-colors">
                        <span>{year}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute right-full top-0 pr-2 opacity-0 invisible group-hover/year:opacity-100 group-hover/year:visible transition-all duration-200">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                          <Link
                            to={`/tabara-poiana-marului-${year}`}
                            className="block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                          >
                            Tabăra Poiana Mărului {year}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jurnale de Tabără Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium">
                Jurnale de Tabără
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[100px]">
                  {campYears.map((year) => (
                    <div key={year} className="relative group/year">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-foreground hover:bg-accent transition-colors">
                        <span>{year}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute right-full top-0 pr-2 opacity-0 invisible group-hover/year:opacity-100 group-hover/year:visible transition-all duration-200">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                          <Link
                            to={`/jurnal-poiana-marului-${year}`}
                            className="block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                          >
                            Jurnal Poiana Mărului {year}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/teste-amplasament">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-full px-6 font-large">
                Test amplasament
              </Button>
            </Link>

          </div>

          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {menuItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}

            <div className="py-2">
              <p className="text-primary-foreground font-medium mb-2">Tabere</p>
              <div className="pl-4 space-y-2">
                {campYears.map((year) => (
                  <Link
                    key={year}
                    to={`/tabara-poiana-marului-${year}`}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Poiana Mărului {year}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2">
              <p className="text-primary-foreground font-medium mb-2">Jurnale de Tabără</p>
              <div className="pl-4 space-y-2">
                {campYears.map((year) => (
                  <Link
                    key={year}
                    to={`/jurnal-poiana-marului-${year}`}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Jurnal Poiana Mărului {year}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/teste-amplasament">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6">
                Test amplasament
              </Button>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
