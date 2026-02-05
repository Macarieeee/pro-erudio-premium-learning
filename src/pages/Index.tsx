import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import SummerCamps from "@/components/SummerCamps";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Articol from "@/components/Articol";
import EnglishTestSection from "@/components/EnglishTestSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Head } from "vite-react-ssg";
import heroImage from "@/assets/herohome.jpeg";



const Index = () => {
  const canonicalUrl = "https://tabere.proerudio.ro";
  const ogImage = heroImage;
  return (
    <div className="min-h-screen">
      {/* ✅ SEO + Open Graph (Facebook/WhatsApp) */}
      <Head>
        <title>Tabere de Engleză Pro Erudio</title>

        <meta
          name="description"
          content="Peste 15 ani de experiență în tabere de engleză în România și în străinătate, cu profesori dedicați și activități memorabile."
        />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Tabere de Engleză Pro Erudio" />
        <meta
          property="og:description"
          content="Peste 15 ani de experiență în tabere de engleză în România, UK și Irlanda. Profesori dedicați, siguranță și experiențe memorabile."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Despre noi – Tabere de Engleză Pro Erudio" />
        <meta
          name="twitter:description"
          content="Povestea Pro Erudio, echipa și valorile noastre. Tabere de engleză în România și în străinătate."
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <CoursesSection />
        {/* <SummerCamps /> */}
        <Articol />
        <WhyChooseUs />
        {/* <Testimonials /> */}
        <EnglishTestSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;