import { Card, CardContent } from "@/components/ui/card";
import RegistrationForm from "@/components/RegistrationForm";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Rezervă-ți acum locul în tabăra din vara 2026!
          </h2>
          {/* <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Locurile sunt limitate! Înscrie-l pe copilul tău acum pentru o experiență educațională de neuitat. 
            Reduceri Early Bird disponibile pentru înscrierile timpurii.
          </p> */}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-0 shadow-2xl">
            <CardContent className="p-8">
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
