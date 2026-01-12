import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DeclaratieConsimtamant = () => {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background py-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Declarație de consimțământ
            </h1>

            <div className="prose prose-lg max-w-none text-foreground">
              <p>
                Declar prin aceasta că sunt de acord cu participarea copilului
                meu/minorului aflat sub tutela mea la cursurile organizate de
                <strong> Centrul Pro Erudio SRL</strong>.
              </p>

              <p>
                Îmi exprim în mod expres și neechivoc acordul privind
                prelucrarea următoarelor date cu caracter personal ale
                Minorului aflat sub tutela mea: nume și prenume, vârstă,
                școala de proveniență, de către Organizator pe întreaga
                durată a desfășurării cursurilor.
              </p>

              <p>
                Totodată, sunt de acord ca societatea <strong>Centrul Pro
                Erudio SRL</strong>, cu sediul în <strong>Bd. George Coșbuc,
                nr. 69, Sector 5, București, România</strong>, să fie
                autorizată să proceseze datele mele personale introduse în
                formularul de înregistrare client, precum și datele colectate
                în cadrul tranzacțiilor comerciale, în următoarele scopuri:
                furnizarea de informații prin e-mail, SMS, telefon sau
                platforme de social media referitoare la campanii de
                marketing, oferte speciale, evenimente și/sau alte forme de
                publicitate, precum și contactarea în vederea desfășurării
                sondajelor de opinie.
              </p>

              <p>
                Consimțământul privind prelucrarea datelor cu caracter personal
                este voluntar și poate fi revocat în orice moment, cu efect
                ulterior, printr-o notificare gratuită către <strong>Centrul
                Pro Erudio SRL</strong>, transmisă verbal sau în scris (e-mail
                către <strong>office@proerudio.ro</strong>).
              </p>

              <p>
                Revocarea consimțământului nu afectează legalitatea utilizării
                datelor realizate anterior retragerii acestuia.
              </p>

              <p className="text-center font-semibold mt-10">
                Vă mulțumim pentru colaborare!
              </p>

              <p className="text-center font-bold mt-4">
                PRO ERUDIO SCHOOL OF ENGLISH
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DeclaratieConsimtamant;
