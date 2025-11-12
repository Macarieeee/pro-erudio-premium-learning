import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoursesSection from "@/components/CoursesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import PersonalDevelopment from "@/components/PersonalDevelopment";
import SummerCamps from "@/components/SummerCamps";
import BlogSection from "@/components/BlogSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <CoursesSection />
        <WhyChooseUs />
        <AboutSection />
        <PersonalDevelopment />
        <SummerCamps />
        <BlogSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
