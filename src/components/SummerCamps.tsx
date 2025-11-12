import summerImage from "@/assets/summer-camp.jpg";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users } from "lucide-react";

const SummerCamps = () => {
  return (
    <section id="vara" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cursuri de vară și tabere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vacanțe de neuitat care combină învățarea cu aventura și distracția
          </p>
        </div>

        <div className="space-y-12">
          {/* Tabere în România */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Tabere de vară în România
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Tabere de zi și rezidențiale în locații pitorești din țară. Copiii învață engleza într-un mod natural, prin jocuri, sport, arte și activități outdoor.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <span>Delta Dunării, Munții Apuseni, Brașov</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary mr-3" />
                  <span>Iulie - August (sesiuni de 1-2 săptămâni)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 text-primary mr-3" />
                  <span>Grupe mici (max 12 copii/grup)</span>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Află mai mult
              </Button>
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img src={summerImage} alt="Summer camp" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tabere în UK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img src={summerImage} alt="UK summer camp" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Tabere în Marea Britanie
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Experiență completă de imersiune în limba și cultura britanică. Cursuri la școli de renume din UK, cazare la familii sau în campusuri universitare, excursii la London, Oxford, Cambridge.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <span>Brighton, Oxford, Cambridge, Edinburgh</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary mr-3" />
                  <span>Iulie - August (sesiuni de 2-4 săptămâni)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 text-primary mr-3" />
                  <span>Însoțitori români + cadre didactice britanice</span>
                </div>
              </div>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Află mai mult
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerCamps;
