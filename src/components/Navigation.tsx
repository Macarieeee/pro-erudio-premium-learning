import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Acasă", href: "#" },
    { label: "Despre Noi", href: "#despre" },
    { label: "Jurnale de Tabără", href: "#testimoniale" },
  ];

  const campYears = ["2023", "2024", "2025", "2026"];

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-foreground flex items-center justify-center">
              <span className="text-primary font-bold text-lg">L</span>
            </div>
            <a href="/" className="text-xl font-bold text-primary-foreground">
              Language School
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
                Tabere
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[120px]">
                  {campYears.map((year) => (
                    <a
                      key={year}
                      href={`#tabere-${year}`}
                      className="block px-4 py-2 text-foreground hover:bg-accent transition-colors"
                    >
                      {year}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6">
              Test amplasament
            </Button>
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
              <a
                key={item.href}
                href={item.href}
                className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="py-2">
              <p className="text-primary-foreground font-medium mb-2">Tabere</p>
              <div className="pl-4 space-y-2">
                {campYears.map((year) => (
                  <a
                    key={year}
                    href={`#tabere-${year}`}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {year}
                  </a>
                ))}
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full">
              Test amplasament
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
