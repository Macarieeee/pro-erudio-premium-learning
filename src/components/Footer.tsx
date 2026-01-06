import { Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-background mb-1">Telefon</h4>
              <a href="tel:+40123456789" className="text-background/70 hover:text-background transition-colors">
                0724 527 838 (Roxana Popescu)
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-background mb-1">Email</h4>
              <a href="mailto:contact@languageschool.ro" className="text-background/70 hover:text-background transition-colors">
                office@proerudio.ro
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-background mb-1">Program</h4>
              <p className="text-background/70">
                Luni - Vineri: 09:00 - 20:00<br />
                Sâmbătă: 09:00 - 14:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; 2026 Pro Erudio. Toate drepturile rezervate. Build by Macarie Mihai-Alexandru</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;