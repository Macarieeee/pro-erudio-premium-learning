import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BlogSection = () => {
  const articles = [
    {
      title: "Cum să motivezi copilul să învețe engleza",
      excerpt: "Descoperă strategii practice și metode distractive pentru a-l face pe copilul tău să învețe cu plăcere.",
      date: "15 Mai 2024",
      category: "Sfaturi pentru părinți",
    },
    {
      title: "Beneficiile învățării limbii engleze de la vârste mici",
      excerpt: "Studii arată că copiii care încep devreme au avantaje cognitive și sociale remarcabile.",
      date: "10 Mai 2024",
      category: "Educație",
    },
    {
      title: "Pregătirea pentru examene Cambridge: Ghid complet",
      excerpt: "Tot ce trebuie să știi despre examenele Cambridge și cum îți pregătim copilul pentru succes.",
      date: "5 Mai 2024",
      category: "Examene",
    },
    {
      title: "Metode interactive în predarea limbii engleze",
      excerpt: "Cum folosim tehnologia și activitățile interactive pentru o învățare eficientă.",
      date: "1 Mai 2024",
      category: "Metode de predare",
    },
  ];

  return (
    <section id="articole" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Articole publicate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resurse și sfaturi utile pentru părinți și copii
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border flex flex-col"
            >
              <CardHeader>
                <div className="text-sm font-semibold text-primary mb-2">
                  {article.category}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {article.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground mb-4">
                  {article.excerpt}
                </p>
                <Button 
                  variant="link" 
                  className="text-primary p-0 h-auto font-semibold group-hover:gap-2 transition-all"
                >
                  Citește mai mult
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
          >
            Vezi toate articolele
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
