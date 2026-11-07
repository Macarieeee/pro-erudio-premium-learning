import { Link } from "react-router-dom";
import imagine8motive from "@/assets/poiana_shelters.jpg";
import { Button } from "@/components/ui/button";

export default function ReasonsCampSection() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                8 motive să-mi trimit copilul într-o tabără
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                Când vă gândiţi la dezvoltarea copilului dumneavoastră şi plănuiţi cu atâta grijă educaţia sa şi activităţile extracurriculare ce îl vor ajută să devină un adult de succes şi fericit, nu uitaţi că verile sunt o oportunitate, nu timp pierdut. O  tabăra este un mod  ideal de a experimenta activităţi noi (inclusiv exersarea limbii engleze cu trainer nativ), de a se responsabiliza, dar mai ales de a se distra şi a-şi face prieteni noi.

                {"\n\n"}
                Dacă va întrebaţi care sunt beneficiile participării la tabăra, iată o lista sumară:
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 transition duration-300 ease-in-out"
                >
                  {/* înlocuiește cu ruta/URL-ul articolului */}
                  <a
  href="https://www.proerudio.ro/8-motive-sa-mi-trimit-copilul-in-tabara/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center"
>
  Citește articolul
</a>

                </Button>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-auto min-h-10 py-2 whitespace-normal text-center"
                >
                  <Link to="/jurnale">
                    Citește jurnalele taberelor noastre →
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={imagine8motive}
                  alt="Copii în tabără aruncând șepcile în aer, în pădure"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
