// src/pages/JurnaleTabara.tsx
import { Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// ✅ din fișierul tău journals.ts
import { journalList } from "@/data/journals";
import { Head } from "vite-react-ssg";
// ✅ ajustează dacă la tine se numesc altfel / sunt în alt path
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const JurnaleTabara = () => {
  const canonicalUrl = "https://tabere.proerudio.ro/jurnale";
  return (
    <>
    <Head>
        <title>Jurnale de Tabără | Pro Erudio</title>

        <meta
  name="description"
  content="Descoperă jurnalele de tabără Pro Erudio și vezi activități, experiențe și momente reale din taberele noastre de engleză pentru copii și adolescenți."
/>

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Jurnale de Tabără | Pro Erudio" />
        <meta
  property="og:description"
  content="Vezi jurnalele de tabără Pro Erudio și descoperă experiențele copiilor și adolescenților din taberele noastre de engleză."
/>
        <meta property="og:image" content="https://tabere.proerudio.ro/og/Ziua5-1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Despre noi – Tabere de Engleză Pro Erudio" />
        <meta
          name="twitter:description"
          content="Povestea Pro Erudio, echipa și valorile noastre. Tabere de engleză în România și în străinătate."
        />
        <meta name="twitter:image" content="https://tabere.proerudio.ro/og/herohome.jpeg"  />
      </Head>
      <Navigation />

      {/* Hero / intro */}
      <section className="pt-40 bg-background">
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Jurnale de Tabără Pro Erudio
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Descoperă povești, momente și activități din taberele noastre. Fiecare jurnal surprinde zi cu zi experiența
              copiilor, atmosfera și amintirile create împreună.
            </p>
          </div>
        </div>
      </section>

      {/* EXACT secțiunea ta, doar cu 3 coloane */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ✅ 3 coloane pe desktop */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {journalList.map((j) => (
              <a key={j.slug} href={`/jurnal/${j.slug}`} className="block">
                <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                  <div className="h-40 overflow-hidden">
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

                    {j.campus && <p className="text-sm text-muted-foreground">{j.campus}</p>}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default JurnaleTabara;
