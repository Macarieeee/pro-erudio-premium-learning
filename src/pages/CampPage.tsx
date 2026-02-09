/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CampSections from "@/components/CampSection"; // ✅ asigură-te că fișierul se numește CampSections.tsx
import RegistrationForm from "@/components/RegistrationForm";
import { SectionGallery } from "@/components/SectionGallery";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  Mountain,
  XCircle,
  Percent,
  FileText,
  Clipboard,
  Compass,
  Building,
  Send,
  Luggage,
  ReceiptPoundSterling,
  Menu,
  Book,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { getCampBySlug, getCampSEO } from "@/data/campsData";
import { Helmet } from "react-helmet-async";

type CampPageProps = {
  slugOverride?: string;
};

const CampPage = ({ slugOverride }: CampPageProps) => {
  const { toast } = useToast();
  const params = useParams();

  // ✅ important: pe rutele statice SSG, params.slug e undefined
  const slug = params.slug ?? slugOverride ?? "";

  const camp = useMemo(() => getCampBySlug(slug), [slug]);

  // dacă URL-ul nu corespunde unei tabere din config
  if (!camp) return <Navigate to="/" replace />;

  const seo = getCampSEO(camp);

  // ✅ Visibility defaults + override per tabără
  const v = {
    showAbout: true,
    showFacilities: true,
    showProgramImage: true,
    showLuggageImage: true,
    showOtherCamps: true,
    showRegistrationForm: true,
    showRequiredDocs: true,
    showDiscounts: true,
    showActivitiesDescription: true,
    showActivities: true,
    showPriceDetails: true,
    showMenu: true,
    ...(camp.visibility ?? {}),
  };

  const [formData, setFormData] = useState({
    selectedCamp: camp.form.selectValue,
    childName: "",
    childCity: "",
    childBirthDate: "",
    transport: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    source: "",
    gdprConsent: false,
    termsConsent: false,
  });

  const renderItalicText = (text: string) => {
    const result: React.ReactNode[] = [];
    const regex = /\*(.*?)\*/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // text normal înainte de italic
      if (match.index > lastIndex) {
        result.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
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
      result.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent || !formData.termsConsent) {
      toast({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile pentru a continua.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Formular trimis cu succes!",
      description: "Te vom contacta în curând pentru confirmarea înscrierii.",
    });

    setFormData({
      selectedCamp: camp.form.selectValue,
      childName: "",
      childCity: "",
      childBirthDate: "",
      transport: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      source: "",
      gdprConsent: false,
      termsConsent: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.title}</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:url" content={`https://tabere.proerudio.ro/${camp.slug}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
      </Helmet>

      <Navigation />

      {/* HERO + QUICK INFO (100vh fold) */}
      <section className="pt-16 h-[calc(100vh-4rem)] flex flex-col">
        {/* HERO */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={camp.hero.image}
            alt={camp.hero.imageAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: camp.hero.objectPosition ?? "center" }}
          />

          {/* Gradient pentru lizibilitate */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Text */}
          <div className="absolute bottom-[-20px] left-0 right-0 p-6 lg:p-8">
            <div className="container mx-auto px-4 lg:px-8">
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                {camp.hero.badge}
              </span>

              <h1
                className="
                  mt-2
                  font-bold
                  text-foreground
                  max-w-full
                  break-words
                  whitespace-normal
                  xl:whitespace-nowrap
                  lg:whitespace-nowrap
                  text-[clamp(20px,5vw,40px)]
                "
              >
                {camp.hero.title}
              </h1>
            </div>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="bg-secondary/30 py-4 md:py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-0">
              {/* Locație */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locație</p>
                  <p className="font-semibold text-foreground">{camp.quickInfo.location}</p>
                </div>
              </div>

              {/* Durată */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durată</p>
                  <p className="font-semibold text-foreground">{camp.quickInfo.duration}</p>
                </div>
              </div>

              {/* Vârstă */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vârstă</p>
                  <p className="font-semibold text-foreground">{camp.quickInfo.ageGroup}</p>
                </div>
              </div>

              {/* Perioadă */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Perioada</p>
                  <p className="font-semibold text-foreground whitespace-pre-line">{camp.quickInfo.dates}</p>
                </div>
              </div>

              {/* Preț */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ReceiptPoundSterling className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preț</p>
                  <p className="font-semibold text-foreground">{camp.quickInfo.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Highlights */}
      {v.showAbout ? (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{camp.about.title}</h2>

                {camp.about.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`text-muted-foreground leading-relaxed ${
                      idx !== camp.about.paragraphs.length - 1 ? "mb-6" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}

                {/* 🔹 EXTRA title + paragraph (doar dacă există) */}
                {camp.about.extraTitle && camp.about.extraParagraphs && (
                  <div className="mt-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{camp.about.extraTitle}</h2>

                    {camp.about.extraParagraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className={`text-muted-foreground leading-relaxed ${
                          idx !== camp.about.extraParagraphs.length - 1 ? "mb-6" : ""
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Ce include tabăra</h3>
                <div className="space-y-4">
                  {camp.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                  <h3 className="text-2xl font-bold text-foreground mb-6 pt-6">Ce nu include tabăra</h3>
                  <div className="space-y-4">
                    {camp.notIncludedInPrice.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Location Description + Facilities */}
      {v.showFacilities ? (
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Mountain className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Descrierea locației</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{camp.locationDescription.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed whitespace-pre-line">
                  {camp.locationDescription.description}
                </p>
              </div>

              {camp.locationDescription?.image ? (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={camp.locationDescription.image}
                    alt={camp.locationDescription.imageAlt}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              ) : null}
            </div>

            {camp.locationFacilities?.length ? (
              <div className="mt-12">
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold text-foreground mb-6">Facilități</h4>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {camp.locationFacilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <facility.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-foreground">{facility.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Ce include tariful / Ce nu include */}
      {v.showPriceDetails && (
        <section className="pb-6">
          <div className="container mx-auto px-6 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* INCLUDE */}
              {camp.includedInPrice?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="h-7 w-7 text-accent" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ce include tariful</h2>
                  </div>
                  <div className="space-y-3">
                    {camp.includedInPrice.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{renderItalicText(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NU INCLUDE */}
              {camp.notIncludedInPrice?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <XCircle className="h-7 w-7 text-destructive" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ce nu include tariful</h2>
                  </div>
                  <div className="space-y-3">
                    {camp.notIncludedInPrice.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <SectionGallery images={camp.galleries?.notIncludedInPrice} className="pt-10" />
                </div>
              )}
            </div>
          </div>
          <SectionGallery images={camp.galleries?.includedInPrice} />
        </section>
      )}

      {/* Program de excursii și activități */}
      {v.showActivities && (camp.activitiesDescription || camp.activityImages?.length) ? (
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Compass className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Program de excursii și activități</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {camp.activitiesDescription ? (
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{camp.activitiesDescription}</p>
                ) : null}
              </div>

              {camp.activityImages?.length ? (
                <div className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden shadow-lg">
                  {camp.activityImages.map((src, index) => (
                    <div key={index} className="relative w-full aspect-[4/3] overflow-hidden">
                      <img src={src} alt={`Activitate ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {camp.sections?.length ? (
        <section>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <CampSections sections={camp.sections} />
            </div>
          </div>
          <SectionGallery images={camp.galleries?.other} />
        </section>
      ) : null}

      {/* Înscrieri și rezervări */}
      <section className="py-4">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Clipboard className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Înscrieri și rezervări</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Pași pentru înscriere</h3>
                <div className="space-y-4">
                  {camp.registrationInfo.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Contact informații și înscrieri</h3>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-semibold text-foreground">{camp.registrationInfo.contact.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{camp.registrationInfo.contact.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documente necesare */}
      {v.showRequiredDocs && camp.requiredDocuments?.length ? (
        <section className="py-6 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Documente necesare înscrierii</h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {camp.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Reduceri */}
      {v.showDiscounts && camp.discounts?.length ? (
        <section className="py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Percent className="h-8 w-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Reduceri disponibile</h2>
            </div>

            <div className="grid justify-center grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-6 max-w-5xl mx-auto">
              {camp.discounts.map((discount, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <span className="text-4xl font-bold text-accent">{discount.value}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{discount.type}</h3>
                    <p className="text-sm text-muted-foreground">{discount.condition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Bagaj */}
      {v.showLuggageImage && camp.luggageImage?.src ? (
        <section className="py-6 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Luggage className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {camp.luggageImage?.title ?? "Ce trebuie să conțină bagajul copiilor"}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={camp.luggageImage.src} alt={camp.luggageImage.alt} className="w-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Program Orientativ */}
      {v.showProgramImage && camp.programImage?.src ? (
        <section className="py-6 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Program orientativ</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={camp.programImage.src} alt={camp.programImage.alt} className="w-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {v.showMenu && camp.menuImage?.src ? (
        <section className="py-6 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Book className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meniu orientativ</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={camp.menuImage.src} alt={camp.menuImage.alt} className="w-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Alte tabere */}
      {v.showOtherCamps && camp.otherCamps?.length ? (
        <section className="py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Building className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Alte tabere organizate de Pro Erudio</h2>
            </div>

            <div
              className={`grid gap-6 max-w-6xl mx-auto
                ${camp.otherCamps.length === 3 ? "sm:grid-cols-3" : ""}
                ${camp.otherCamps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : ""}
              `}
            >
              {camp.otherCamps.map((c, idx) => (
                <Link key={idx} to={c.to} className="block">
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={c.image ?? camp.hero.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardContent className="pt-4 text-center">
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {c.type}
                      </span>

                      <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {c.name}
                      </h3>

                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {c.location}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Registration Form */}
      <section className="py-6 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Formular de înscriere</h2>
              <p className="text-primary-foreground/80">
                Completează formularul pentru a rezerva un loc la {camp.campName} {camp.year}
              </p>
            </div>

            <Card className="bg-card border-0 shadow-2xl">
              <CardContent className="p-8">
                <RegistrationForm variant="light" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampPage;
