import CourseCard from "./CourseCard";
import { BookOpen, Users, Trophy, Sparkles } from "lucide-react";

const CoursesSection = () => {
  const courses = [
    {
      title: "English for Beginners",
      description: "Perfect pentru copiii care încep călătoria lor în învățarea limbii engleze.",
      level: "Nivel: Beginner (A1-A2)",
      icon: BookOpen,
      features: [
        "Vocabular fundamental și pronunție corectă",
        "Activități interactive și jocuri educative",
        "Materiale Cambridge adaptate pentru copii",
      ],
    },
    {
      title: "English Intermediate",
      description: "Dezvoltă abilitățile de conversație și înțelegere a textelor mai complexe.",
      level: "Nivel: Intermediate (B1-B2)",
      icon: Users,
      features: [
        "Conversații fluente pe teme diverse",
        "Gramatică avansată și scriere structurată",
        "Pregătire pentru examene Cambridge (PET, FCE)",
      ],
    },
    {
      title: "English Advanced",
      description: "Atingerea unui nivel excelent de cunoaștere a limbii engleze.",
      level: "Nivel: Advanced (C1-C2)",
      icon: Trophy,
      features: [
        "Comunicare la nivel aproape nativ",
        "Analiză literară și eseuri complexe",
        "Pregătire pentru CAE și CPE",
      ],
    },
    {
      title: "English for Fun",
      description: "Cursuri creative și interactive pentru copii care vor să învețe prin joc.",
      level: "Nivel: Toate nivelurile",
      icon: Sparkles,
      features: [
        "Activități creative: teatru, muzică, arte",
        "Teme atractive și apropiate de interesele copiilor",
        "Accent pe vorbire și exprimare liberă",
      ],
    },
  ];

  return (
    <section id="cursuri" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cursuri de limba engleză
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alege programul potrivit pentru nivelul și obiectivele copilului tău
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
