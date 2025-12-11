import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Acasă", href: "#" },
    { label: "Despre Noi", href: "#despre" },
    { label: "Cursuri", href: "#cursuri" },
    { label: "Tabere de Vară", href: "#tabere" },
    { label: "Testimoniale", href: "#testimoniale" },
  ];

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
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6">
              Consultație Gratuită
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
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full">
              Consultație Gratuită
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;