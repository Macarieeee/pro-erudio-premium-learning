import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Building, MapPin, Clock, Users } from "lucide-react";
import { journals, journalList } from "@/data/journals";

const JournalPage = () => {
  const { slug } = useParams();

  const journal = useMemo(() => (slug ? journals[slug] : undefined), [slug]);

  if (!journal) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Intro */}
      <section className="py-16 mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {journal.title}
            </h2>
            {journal.subtitle && (
              <p className="text-xl text-muted-foreground mb-2">{journal.subtitle}</p>
            )}
            {journal.campus && (
              <p className="text-lg text-foreground font-medium">{journal.campus}</p>
            )}
            <p className="text-lg text-primary font-semibold">{journal.dates}</p>
          </div>
        </div>
      </section>

      {/* Quick Info (opțional) */}
      {/* {journal.quickInfo && (
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locație</p>
                  <p className="font-semibold text-foreground">{journal.quickInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durată</p>
                  <p className="font-semibold text-foreground">{journal.quickInfo.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vârstă</p>
                  <p className="font-semibold text-foreground">{journal.quickInfo.ageGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Entries */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {journal.entries.map((entry, index) => (
              <Card key={index} className="bg-card border-border overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-bold">
                      {entry.day}
                    </span>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {entry.content.split("\n\n").map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {entry.galleryLink && (
                    <a
                      href={entry.galleryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Vezi galeria foto completă aici!
                    </a>
                  )}

                  {entry.images?.length ? (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {entry.images.slice(0, 4).map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm"
                        >
                          <img
                            src={img}
                            alt={`Galerie ${entry.day} - ${imgIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alte jurnale (din data) */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Building className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Alte Jurnale de Tabere Pro Erudio
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {journalList
              .filter((j) => j.slug !== journal.slug)
              .map((j) => (
                <a
                  key={j.slug}
                  href={`/jurnal/${j.slug}`}
                  className="block"
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                    <div className="h-45 overflow-hidden">
                      <img
                        src={j.heroImage}
                        alt={j.heroAlt || j.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-4 text-center">
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {j.dates}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {j.navbarLabel}
                      </h3>
                      {j.campus && (
                        <p className="text-sm text-muted-foreground">{j.campus}</p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JournalPage;
