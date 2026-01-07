import type { CampSection } from "@/data/campsData";

type Props = {
    sections?: CampSection[];
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
                  • {it}
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
                    <section key={idx} className={`py-20 ${bg}`}>
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="max-w-5xl mx-auto">
                                {/* Rich Text */}
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
                                    <>
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

                                        <ul className="space-y-3">
                                            {s.items.map((it, i) => (
                                                <li key={i} className="text-muted-foreground leading-relaxed">
                                                    • {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
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
                                            <h3 className="text-xl font-bold text-foreground mb-4">
                                                {s.title}
                                            </h3>
                                        )}
                                        <img
                                            src={s.src}
                                            alt={s.alt}
                                            className="w-full rounded-xl border border-border"
                                        />
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
