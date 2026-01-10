import { Link } from "react-router-dom";
import imagine8motive from "@/assets/8-motive-sa-imi-trimit-copilul-in-tabara.jpg"; // schimbă cu imaginea ta
import { Button } from "@/components/ui/button";

export default function ReasonsCampSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-card p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            8 motive să-mi trimit copilul într-o tabără
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT */}
            <div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                Când vă gândiţi la dezvoltarea copilului dumneavoastră şi plănuiţi cu atâta grijă educaţia sa şi activităţile extracurriculare ce îl vor ajută să devină un adult de succes şi fericit, nu uitaţi că verile sunt o oportunitate, nu timp pierdut. O  tabăra este un mod  ideal de a experimenta activităţi noi (inclusiv exersarea limbii engleze cu trainer nativ), de a se responsabiliza, dar mai ales de a se distra şi a-şi face prieteni noi.

                {"\n\n"}
                Dacă va întrebaţi care sunt beneficiile participării la tabăra, iată o lista sumară:
              </p>

              <div className="mt-6">
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
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={imagine8motive}
                  alt="Copil în tabără – 8 motive"
                  className="w-full h-[280px] md:h-[360px] object-cover"
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
