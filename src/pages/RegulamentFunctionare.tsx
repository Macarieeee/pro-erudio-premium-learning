import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RegulamentFunctionare = () => {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background py-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center pb-6">
              REGULAMENT DE FUNCȚIONARE
            </h1>

            <p className="pb-3 text-foreground">
              Regulamentul centrului cuprinde un set de norme elaborate cu scopul implementării unei activități educaționale de calitate.
            </p>

            <p className="pb-3 text-foreground">
              Regulamentul se adresează copiilor și părinților în relație cu PRO ERUDIO SCHOOL OF ENGLISH, având aplicabilitate deplină în
              interiorul centrului.
            </p>

            <p className="pb-10 text-foreground">
              Regulamentul trebuie respectat de către toți părinții și copiii acestora, participanți la activitățile centrului și în cadrul
              cursurilor online.
            </p>

            {/* 1. PUNCTUALITATE */}
            <h2 className="font-bold text-foreground pb-2">
              1. <span className="uppercase">Punctualitate</span>
            </h2>
            <ul className="list-disc pl-6 pb-10 text-foreground">
              <li className="pb-2">
                Părinții și copiii sunt rugați să respecte ora la care încep și se finalizează cursurile, indiferent dacă ele se desfășoară
                online sau la sediul centrului.
              </li>
              <li className="pb-2">
                PRO ERUDIO SCHOOL OF ENGLISH nu își asumă răspunderea pentru siguranța copiilor în afara orelor de curs.
              </li>
            </ul>

            {/* 2. PREZENȚĂ */}
            <h2 className="font-bold text-foreground pb-2">
              2. <span className="uppercase">Prezență</span>
            </h2>

            <p className="pb-3 text-foreground">
              Atât pentru cursurile la sediu, cât și pentru cele online, prezența copiilor va fi atent monitorizată în foaia de prezență a
              grupei. Întârzierile și absențele repetate pot duce la un nivel scăzut de performanță, pe care PRO ERUDIO SCHOOL OF ENGLISH nu
              și-l asumă.
            </p>

            <p className="pb-3 text-foreground">
              Este acceptată o frecvență din partea copiilor conform programului asumat de către părinți, aceasta fiind un factor esențial în
              dezvoltarea educațională de succes.
            </p>

            <p className="pb-3 text-foreground">
              În cazul absenței de la orele de curs din motive întemeiate (îmbolnăviri sau activități programate cu școala în cadrul
              săptămânilor Școala Verde sau Școala Altfel), vă rugăm să optați pentru una dintre cele două variante defiecare dată când
              absențați:
            </p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">Participare online la curs (camera video pornită și îndreptată spre copil).</li>
              <li className="pb-2">
                Recuperarea cursului cu o altă grupă de același nivel (nu garantăm recuperarea materiei predate când a absentat întrucât grupele
                pot să aibă un ritm diferit de lucru).
              </li>
            </ul>

            <p className="pb-3 text-foreground">
              Pentru a putea participa online sau recupera cursul cu o grupă paralelă este necesară trimiterea unui mesaj la numărul{" "}
              <span className="font-semibold">0771 753 323</span> în care să vă anunțați opțiunea. Anunțarea absenței se efectuează doar de către
              părinți, indiferent de vârsta copilului.
            </p>

            <ul className="list-disc pl-6 pb-10 text-foreground">
              <li className="pb-2">
                În cazul neanunțării la timp a absenței, cursurile se consideră efectuate. Participarea online la curs se anunță cu minimum trei
                ore înainte de curs, iar absențele pentru recuperare cu o zi înainte de curs.
              </li>
              <li className="pb-2">
                În cazul în care copilul este spitalizat sau suferă de o problemă medicală care să nu îi permită participarea online la curs și
                nici recuperarea cursului în grupe paralele, părintele va trimite o poză cu scutirea medicală pe whatsapp la{" "}
                <span className="font-semibold">0771 753 323</span> și se vor găsi soluții de compensare a plăților, dacă este raportarea să
                demonstreze ratarea următoare tranșe de plată.
              </li>
              <li className="pb-2">
                Centrul Pro Erudio nu își asumă răspunderea pentru transmiterea temelor, dar îi încurajăm pe copii să și le ceară aceste
                informații. În secolul tehnologiei ar trebui să fie ușor pe telefon.
              </li>
              <li className="pb-2">
                În situația în care sunt anunțate la o anumită grupă cazuri de îmbolnăviri cu virusul SARS COV2 sau chiar de gripă sezonieră,
                este posibil ca Pro Erudio School of English să decidă ca toată grupa să își desfășoare activitățile online cu limita
                răspândirea virusurilor.
              </li>
              <li className="pb-2">
                În situația în care vreunul dintre profesorii Pro Erudio este diagnosticat cu o boală contagioasă, toate cursurile se trec în
                mediul online până la trecerea pericolului de infectare (minim două săptămâni).
              </li>
              <li className="pb-2">
                Pro Erudio School of English își rezervă dreptul de a schimba numărul de cursanți dintr-o grupă în acord cu reglementările locale
                sau regionale, precum și dreptul de a schimba orarele și zilele cursurilor în caz de forță majoră. Dacă această situație va
                impune trecerea de la predare față-n-față la predare virtuală, ne rezervăm dreptul de a schimba componența, durata, orarul
                cursului, profesorul etc, dar vom face tot ce este posibil să asigurăm continuarea cursurilor fără modificări.
              </li>
            </ul>

            {/* 3. CONDUITĂ */}
            <h2 className="font-bold text-foreground pb-2">
              3. <span className="uppercase">Conduită</span>
            </h2>

            <ul className="list-disc pl-6 pb-10 text-foreground">
              <li className="pb-2">
                Copiii mai mici de clasa a II-a sunt preluați din sala de așteptare sau din curte și însoțiți la sala de curs de către cadrele
                didactice ale centrului. Pe cât durata cursurilor copilul se află sub directa supraveghere a cadrelor didactice ale centrului.
              </li>
              <li className="pb-2">
                Copiii cu vârste peste 8 ani sunt invitați să meargă singuri la clasa de curs cu maxim 5 minute înainte de ora prevăzută pentru
                începerea cursului.
              </li>
              <li className="pb-2">
                În timpul petrecut în sala de așteptare înainte de începerea cursurilor le interzicem elevilor să folosească telefonul pentru
                jocuri. Această activitate poate fi înlocuită cu o lectură ușoară (vor găsi acolo cărțile de răsfoit pe toate gusturile) sau
                discuții cu colegii.
              </li>
              <li className="pb-2">
                Părinții și copiii au obligația de a respecta indicațiile cu privire la accesul în zonele restricționate. Până la începerea
                cursurilor și după finalizarea acestora, întreaga răspundere asupra siguranței copilului aparține adultului însoțitor.
              </li>
              <li className="pb-2">
                În sala de curs este interzis accesul cu alimente sau pahare ce conțin lichide. Pe perioada desfășurării cursului este permisă
                utilizarea recipientelor speciale prevăzute cu capac de protecție (sticle sau bidoane de apă).
              </li>
              <li className="pb-2">
                Pe perioada desfășurării activităților în cadrul centrului, părinții/adulții însoțitori ai copiilor sunt rugați să utilizeze sala
                de așteptare și terasa.
              </li>
              <li className="pb-2">
                Pentru buna desfășurare a activităților în cadrul centrului este interzisă staționarea pe culoarele și scările de acces ale
                centrului.
              </li>
              <li className="pb-2">Fumatul este interzis în incinta centrului.</li>
              <li className="pb-2">Este interzis accesul copiilor însoțiți pe terasă sau în curte interioară.</li>
              <li className="pb-2">
                Orice degradare a bunurilor centrului atrage după sine recuperarea integrală a costului obiectului deteriorat.
              </li>
              <li className="pb-2">
                Vă rugăm să păstrați curățenia în spațiile comune: sala de așteptare, terasă, curte interioară, toalete etc.
              </li>
              <li className="pb-2">
                În cazul în care copiii mici au nevoie la toaletă, vă rugăm să îi însoțiți pentru a vă asigura că spațiul a rămas curat în urma
                utilizării și că se respectă regulile de igienă de îndată.
              </li>
              <li className="pb-2">
                În cazul în care părinții îi trimit pe copii cu obiecte de valoare asupra lor, PRO ERUDIO SCHOOL OF ENGLISH nu își asumă
                responsabilitatea pentru pierderea acestor obiecte.
              </li>
            </ul>

            {/* 4. COMUNICAREA CU PĂRINȚII */}
            <h2 className="font-bold text-foreground pb-2">
              4. <span className="uppercase">Comunicarea cu părinții</span>
            </h2>

            <p className="font-semibold text-foreground pb-2">Evaluare și feedback</p>

            <p className="pb-3 text-foreground">
              Pe lângă o evaluare inițială (în afară de modul engleză să scris, nimic cum trebuie să fie înțeles, cu probleme mai complexe de
              gramatică), în a doua jumătate a lunilor ianuarie și sfârșitul lunii mai, facem o evaluare a tuturor abilităților (scris, vorbit,
              înțelegerea mesajului scris și ascultat), iar rezultatele se descarcă într-un Raport de evaluare a progresului. Aceste document sunt
              modalitatea principală prin care dorim să vă informăm asupra progresului fiului/fiicei dvs în învățarea limbii engleze, motiv pentru
              care vă rugăm să le semnați de primire. Rapoartele pot rămâne în Portofoliile copiilor pentru a le da și lor măsura propriului
              progres. Vă mulțumim pentru sprijin!
            </p>

            <p className="pb-3 text-foreground">
              Pe lângă aceste rapoarte, păstrăm canalele de comunicare deschise permanent prin următoarele modalități:
            </p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">
                Comunicare prin intermediul panourilor informative sau a paginilor noastre de social media (Facebook, Instagram, TikTok).
              </li>
              <li className="pb-2">
                Pentru o bună informare asupra activității centrului, vă recomandăm să citiți anunțurile afișate periodic.
              </li>
              <li className="pb-2">Corespondență prin e-mail.</li>
            </ul>

            <p className="pb-3 text-foreground">
              Avem rugămintea ca părinții să comunice adresele de e-mail corecte, iar în cazul modificărilor acestora să ne informeze pentru a putea
              reactualiza baza de date. Adresele de email sunt folosite doar de către personalul centrului pentru corespondență și trimitere
              informații părinților. Adresa de email a profesorului este{" "}
              <span className="font-semibold">proerudio.premiumprofesorg@gmail.com</span> (proerudio.elena@gmail.com), corespondența trebuie făcută
              doar de la email a profesorului.
            </p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">Corespondență telefonică</li>
            </ul>

            <p className="pb-3 text-foreground">
              (folosind număr unic <span className="font-semibold">0771 753 323</span> conform orarului afișat în sala de așteptare la CONSULTAȚII
              CU PROFESORI).
            </p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">Discuție telefonică sau față-n față cu profesorul grupei.</li>
            </ul>

            <p className="pb-3 text-foreground">
              Telefonic, la numărul unic <span className="font-semibold">0771 753 323</span>, conform orarului afișat în sala de așteptare la
              CONSULTAȚII CU PROFESORI și trimis în email. Pentru consultații față-n-față este necesar să faceți o programare folosind numărul
              unic, ne contactând direct profesorul.
            </p>

            <p className="pb-10 text-foreground font-semibold">
              Centrul Pro Erudio își dorește o bună colaborare și comunicare cu părinții, de aceea vă rugăm să ne transmiteți fără întârziere orice
              problemă sesizată folosind oricare din numerele disponibile la Contact sau prin email la{" "}
              <span className="font-semibold">office@proerudio.ro</span>.
            </p>

            {/* 5. POLITICA FINANCIARĂ */}
            <h2 className="font-bold text-foreground pb-2">
              5. <span className="uppercase">Politica financiară</span>
            </h2>

            <p className="pb-3 text-foreground">
              Începând cu anul școlar 2025–2026 există trei modalități de plată a cursurilor:
            </p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">
                Plata lunară se efectuează în prima săptămână din lună pentru luna în curs prin înmulțirea numărului maxim de ședințe cu prețul
                unei ședințe.
              </li>
              <li className="pb-2">
                Plata în cincitranșe egale (5% reducere), conform informațiilor primite în fișa de reînscriere (pentru cei care au frecventat și
                anul trecut cursurile noastre) sau pe site (pentru copiii înscriși cu acest an școlar).
              </li>
              <li className="pb-2">
                Plata integrală (10% reducere) efectuată până pe <span className="font-semibold">20 septembrie</span>.
              </li>
            </ul>

            <p className="pb-3 text-foreground">Plata cursurilor se poate face în cont sau la casierie (cash sau card).</p>

            <p className="pb-3 text-foreground">Întârzierile la plată pot duce la perceperea penalităților, majorarea taxei de curs sau pierderea locului în grupă.</p>

            <p className="pb-2 text-foreground">Toate reducerile (mai puțin pentru plata integrală) se aplică la ultima tranșă de plată din anul școlar 2025–2026 și sunt după cum urmează:</p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">10% reducere pentru al doilea curs</li>
              <li className="pb-2">10% reducere pentru al doilea frate înscris la cursuri</li>
              <li className="pb-2">10% reducere pentru copil de cadre didactice</li>
            </ul>

            <p className="pb-3 text-foreground">Reduceriile nu se cumulează!</p>

            <ul className="list-disc pl-6 pb-4 text-foreground">
              <li className="pb-2">
                În cazul în care doriți să retrageți copilul de la cursurile noastre, vă rugăm să ne anunțați această intenție cu cel puțin o
                săptămână, preferabil o lună, înainte. Retragerea se operează și se calculează diferența de plată sau de restituit (dacă în care se
                retrag după modul de transmitere) doar după săptămâna de “previz”, săptămâna în care copiii sunt așteptați în continuare la cursuri.
              </li>
            </ul>

            <p className="pb-3 text-foreground">
              Toate vacanțele sunt în conformitate cu calendarul nostru școlar, așa cum este el anunțat aici (STRUCTURA ANULUI ȘCOLAR) și{" "}
              <span className="font-semibold">NU</span> se supun taxei de curs.
            </p>

            <p className="pb-10 text-foreground">În săptămâna Școala Altfel și Școala Verde se desfășoară cursuri conform programului obișnuit.</p>

            {/* 6. EVENIMENTE ȘI MODULE SPECIALE */}
            <h2 className="font-bold text-foreground pb-2">
              6. <span className="uppercase">Evenimente și module speciale</span>
            </h2>

            <p className="pb-10 text-foreground">
              Ocazional, Pro Erudio organizează evenimente (Petrecere Halloween, simulare examene Cambridge English, ateliere de dezvoltare
              emoțională etc) sau module speciale (conversație, pregătire pentru examene, cursuri de vară, etc), care vin în completarea activității
              curente. Participarea la aceste module (deseori gratuită sau la prețuri preferențiale pentru cursanții Pro Erudio) este opțională, iar
              înscrierea este obligatorie prin email/sms și ocuparea locurilor se face în ordinea rezervării.
            </p>

            {/* IMPORTANT */}
            <h2 className="font-bold text-foreground pb-2">IMPORTANT!</h2>

            <p className="pb-10 text-foreground">
              Prin participarea la cursuri și evenimentele noastre vă exprimați acordul cu privire la folosirea imaginilor surprinse în timpul
              desfășurării activităților în scop promoțional al activității noastre. Vă informăm că utilizarea imaginilor surprinse într-un spațiu
              public, chiar și clădiri, nu aduce atingere reputației ori demnității persoanei fotografiate/filmate, acestea fiind în caz de fapt.
              Cu toate acestea, dacă doriți ca fiul/ fiica dvs. să nu fie sub nicio formă fotografiat(ă)/filmat(ă), vă rugăm să ne anunțați la
              înscriere/reînscriere și vom respecta solicitarea dvs.
            </p>

            <p className="text-center font-semibold text-foreground pb-2">Vă mulțumim pentru colaborare!</p>
            <p className="text-center font-bold text-foreground">PRO ERUDIO SCHOOL OF ENGLISH</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegulamentFunctionare;
