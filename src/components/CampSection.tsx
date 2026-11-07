import type { CampSection } from "@/data/campsData";
import { Link } from "react-router-dom";
import { SectionGallery } from "./SectionGallery";
import { MessageCircle, BookOpen, Zap, Users, CheckCircle, Compass, Landmark, Music, Mountain, Moon, Sparkles } from "lucide-react";

type Props = {
    sections?: CampSection[];
};

const renderItalicText = (text: string) => {
  const result: React.ReactNode[] = [];
  const regex = /\*(.*?)\*/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // text normal înainte de italic
    if (match.index > lastIndex) {
      result.push(
        <span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>
      );
    }

    // text italic
    result.push(
      <em key={match.index} className="italic">
        {match[1]}
      </em>
    );

    lastIndex = regex.lastIndex;
  }

  // text rămas după ultimul match
  if (lastIndex < text.length) {
    result.push(
      <span key={lastIndex}>{text.slice(lastIndex)}</span>
    );
  }

  return result;
};


export default function CampSections({ sections }: Props) {
    if (!sections?.length) return null;

    return (
        <>
            {sections.map((s, idx) => {
                // dacă vrei să poți alterna background-ul, adaugă în config un "variant"
                // și folosește: const bg = s.variant === "muted" ? "bg-secondary/30" : "";
                // momentan îl las default fără bg, ca să nu strice alte tabere.
                const bg = "";
if (s.type === "journalLink") {
  return (
    <section key={idx} className="my-8 md:my-12 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent/15 p-6 md:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><BookOpen className="h-8 w-8" aria-hidden="true" /></div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{s.title}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{s.text}</p>
          <Link to={s.to} className="mt-6 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Răsfoiește jurnalul din 2025 <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
if (s.type === "gallery") {
  return (
    <div key={idx} className="pb-10">
      <SectionGallery images={s.images} compact={s.compact} />
    </div>
  );
}
if (s.type === "activityCards") {
  return (
    <section key={idx} className="py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {s.groups.map((group) => {
          const adventure = group.theme === "adventure";
          const Icon = adventure ? Mountain : Moon;
          return (
            <div key={group.title} className={`overflow-hidden rounded-3xl border shadow-sm ${adventure ? "border-emerald-200 bg-emerald-50/60" : "border-indigo-200 bg-indigo-50/60"}`}>
              <div className={`p-6 sm:p-8 border-b ${adventure ? "border-emerald-200/70" : "border-indigo-200/70"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${adventure ? "bg-emerald-700" : "bg-indigo-700"}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{group.title}</h2>
                </div>
                <p className={`text-sm leading-relaxed ${adventure ? "text-emerald-900" : "text-indigo-900"}`}>
                  {adventure ? "Mișcare, explorare și provocări în echipă." : "Jocuri, muzică și momente de prietenie la finalul zilei."}
                </p>
              </div>
              <ul className="grid list-none grid-cols-1 sm:grid-cols-2 gap-3 p-6 sm:p-8">
                {group.items.map((item) => (
                  <li key={item} className={`flex items-center gap-3 rounded-xl border bg-white p-3 text-sm font-medium ${adventure ? "border-emerald-100 text-emerald-950" : "border-indigo-100 text-indigo-950"}`}>
                    <Sparkles className={`h-4 w-4 shrink-0 ${adventure ? "text-emerald-600" : "text-indigo-600"}`} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
if (s.type === "benefitCard") {
  const icons = s.theme === "excursions" ? [Landmark, Music] : [MessageCircle, BookOpen, Zap, Users];
  const TitleIcon = s.theme === "excursions" ? Compass : MessageCircle;
  return (
    <section key={idx} className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-background to-accent/10 shadow-sm">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <TitleIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-left">
              {s.title}
            </h2>
          </div>
          <ul className="grid list-none gap-4 md:grid-cols-2">
            {s.items.map((item, i) => {
              const Icon = icons[i] ?? CheckCircle;
              return (
                <li key={i} className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-background/80 p-5 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="pt-1 text-base font-medium leading-relaxed text-foreground/90">{renderItalicText(item)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
if (s.type === "gridBullets") {
  const cols = s.columns ?? 2;

  return (
    <section key={idx}>
      {s.title ? (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          {s.title}
        </h2>
      ) : null}

      <div
        className={[
          "grid gap-6",
          cols === 1 && "grid-cols-1",
          cols === 2 && "grid-cols-1 md:grid-cols-2",
          cols === 3 && "grid-cols-1 md:grid-cols-3",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {s.cards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">
              {card.subtitle}
            </h3>

            <ul className="space-y-3">
              {card.items.map((it, j) => (
                <li key={j} className="text-muted-foreground leading-relaxed">
                  • {renderItalicText(it)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
                return (
                    <section key={idx} className={`py-6 ${bg}`}>
                        <div className={s.type === "textImage" ? "w-full" : "container mx-auto px-4 lg:px-8"}>
                            <div className={s.type === "textImage" ? "w-full" : "max-w-5xl mx-auto"}>
                                {/* Rich Text */}
                                {s.type === "textImage" && (
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                                {s.title}
                                            </h2>
                                            <div className="space-y-6">
                                                {s.paragraphs.map((paragraph, i) => (
                                                    <p key={i} className="text-muted-foreground leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={s.extraImage ? "grid grid-cols-2 gap-4" : ""}>
                                            <img
                                                src={s.src}
                                                alt={s.alt}
                                                loading="lazy"
                                                className={`w-full object-cover rounded-2xl border border-border shadow-lg ${s.extraImage ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                                            />
                                            {s.extraImage && (
                                                <img
                                                    src={s.extraImage.src}
                                                    alt={s.extraImage.alt}
                                                    loading="lazy"
                                                    className="w-full aspect-[3/4] object-cover rounded-2xl border border-border shadow-lg"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                                {s.type === "richText" && (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                            {s.title}
                                        </h2>
                                        {s.paragraphs.map((p, i) => (
                                            <p
                                                key={i}
                                                className={`text-muted-foreground leading-relaxed ${i !== s.paragraphs.length - 1 ? "mb-6" : ""
                                                    }`}
                                            >
                                                {p}
                                            </p>
                                        ))}
                                    </>
                                )}

                                {/* Bullets */}
                                {s.type === "bullets" && (
                                    <div>
                                        {s.title ? (
                                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                                {s.title}
                                            </h2>
                                        ) : null}

                                        {s.subtitle ? (
                                            <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                                {s.subtitle}
                                            </p>
                                        ) : null}

                                      <div className={s.image ? "grid lg:grid-cols-2 gap-8 items-stretch" : undefined}>
                                        <ul className="space-y-3">
                                            {s.items.map((it, i) => (
                                                <li key={i} className="text-muted-foreground leading-relaxed">
                                                    • {it}
                                                </li>
                                            ))}
                                        </ul>
                                        {s.image && (
                                          <div className="relative h-72 lg:h-auto min-h-0 overflow-hidden rounded-2xl shadow-lg">
                                            <img src={s.image.src} alt={s.image.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                )}


                                {/* Two Cols */}
                                {s.type === "twoCols" && (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                            {s.title}
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <ul className="space-y-3">
                                                {s.left.map((it, i) => (
                                                    <li key={i} className="text-muted-foreground leading-relaxed">
                                                        • {it}
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className="space-y-3">
                                                {s.right.map((it, i) => (
                                                    <li key={i} className="text-muted-foreground leading-relaxed">
                                                        • {it}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}

                                {/* Note */}
                                {s.type === "note" && (
                                    <div className="rounded-xl border border-border bg-accent/10 p-6">
                                        {s.title && (
                                            <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                                        )}
                                        <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                                    </div>
                                )}

                                {/* Image */}
                                {s.type === "image" && (
                                    <>
                                        {s.title && (
                                            <h3 className={s.showcase ? "text-3xl md:text-4xl font-bold text-foreground mb-8 text-center" : "text-xl font-bold text-foreground mb-4"}>
                                                {s.title}
                                            </h3>
                                        )}
                                        <div className={s.extraImage ? `grid md:grid-cols-2 gap-6 items-start ${s.showcase ? "max-w-3xl mx-auto" : ""}` : undefined}>
                                        <img
                                            src={s.src}
                                            alt={s.alt}
                                            className={s.showcase ? "w-auto max-w-full max-h-[65vh] mx-auto rounded-xl border border-border" : `w-full rounded-xl border border-border ${s.compact ? "max-w-md mx-auto" : ""}`}
                                        />
                                        {s.extraImage && <img src={s.extraImage.src} alt={s.extraImage.alt} loading="lazy" className={s.showcase ? "w-auto max-w-full max-h-[65vh] mx-auto rounded-xl border border-border" : `w-full rounded-xl border border-border ${s.compact ? "max-w-md mx-auto" : ""}`} />}
                                        </div>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
}
