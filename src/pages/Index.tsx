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

const Index = () => {
  return (
    <div className="min-h-screen">
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