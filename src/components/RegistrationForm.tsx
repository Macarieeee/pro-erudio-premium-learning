import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface RegistrationFormProps {
  variant?: "light" | "dark";
  defaultCamp?: string;
}

const RegistrationForm = ({ variant = "light", defaultCamp = "Școala de vara Dublin 2026" }: RegistrationFormProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    selectedCamp: defaultCamp,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent || !formData.termsConsent) {
      toast({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile pentru a continua.",
        variant: "destructive",
      });
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Lipsesc variabilele EmailJS din .env (VITE_EMAILJS_...)");
      }

      const templateParams = {
        selectedCamp: formData.selectedCamp,
        childName: formData.childName,
        childCity: formData.childCity,
        childBirthDate: formData.childBirthDate,
        transport: formData.transport,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        source: formData.source,
        pageUrl: window.location.href,
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      toast({
        title: "Formular trimis cu succes!",
        description: "Am primit solicitarea. Te contactăm în curând.",
      });

      setFormData({
        selectedCamp: defaultCamp,
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
    } catch (err) {
      console.error(err);
      toast({
        title: "Eroare la trimitere",
        description: "Te rugăm încearcă din nou sau contactează-ne telefonic.",
        variant: "destructive",
      });
    }
  };

  const inputClass =
    variant === "dark"
      ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
      : "bg-background";

  const labelClass = variant === "dark" ? "text-primary-foreground" : "text-foreground";

  const mutedClass = variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";


  return (
    <form onSubmit={handleSubmit} className="space-y-6 scroll-mt-60" id="registrationForm" >
      {/* Camp Selection */}
      <div className="space-y-2">
        <Label htmlFor="camp" className={`${labelClass} font-medium`}>Tabăra selectată</Label>
        <Select value={formData.selectedCamp} onValueChange={(value) => setFormData({ ...formData, selectedCamp: value })}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Selectează tabăra" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="Școala de vara Dublin 2026">Școala internațională de vară de limbă engleză la Dublin 2026</SelectItem>
            <SelectItem value="Tabara Marea Britanie Grosvenor Hall 2026">Tabara in Marea Britanie Grosvenor Hall Activity Centre 2026</SelectItem>
            <SelectItem value="Tabara Moinești 2026">Tabără de limba engleză și aventură în România – Moinești 2026</SelectItem>
            <SelectItem value="Tabara Poiana Mărului 2026">Tabără de limba engleză și aventură în România – Poiana Mărului 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Child Info */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${labelClass} border-b ${variant === "dark" ? "border-primary-foreground/20" : "border-border"} pb-2`}>
          Date despre cursant
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="childName" className={labelClass}>Numele și prenumele *</Label>
            <Input
              id="childName"
              placeholder="Numele complet al copilului"
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="childCity" className={labelClass}>Localitatea de domiciliu *</Label>
            <Input
              id="childCity"
              placeholder="Orașul/Comuna"
              value={formData.childCity}
              onChange={(e) => setFormData({ ...formData, childCity: e.target.value })}
              required
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="childBirthDate" className={labelClass}>Data nașterii *</Label>
          <Input
            id="childBirthDate"
            type="date"
            value={formData.childBirthDate}
            onChange={(e) => setFormData({ ...formData, childBirthDate: e.target.value })}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Transport Option */}
      <div className="space-y-3">
        <Label className={`${labelClass} font-medium`}>Optați pentru rezervarea locului la transport prin Pro Erudio?</Label>
        <RadioGroup
          value={formData.transport}
          onValueChange={(value) => setFormData({ ...formData, transport: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="da" id="transport-da" className={variant === "dark" ? "border-primary-foreground text-primary-foreground" : ""} />
            <Label htmlFor="transport-da" className={`${labelClass} cursor-pointer`}>Da</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nu" id="transport-nu" className={variant === "dark" ? "border-primary-foreground text-primary-foreground" : ""} />
            <Label htmlFor="transport-nu" className={`${labelClass} cursor-pointer`}>Nu</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Parent Info */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${labelClass} border-b ${variant === "dark" ? "border-primary-foreground/20" : "border-border"} pb-2`}>
          Date despre părinte/tutore
        </h3>
        <div className="space-y-2">
          <Label htmlFor="parentName" className={labelClass}>Numele și prenumele *</Label>
          <Input
            id="parentName"
            placeholder="Numele complet al părintelui"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            required
            className={inputClass}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentPhone" className={labelClass}>Telefon *</Label>
            <Input
              id="parentPhone"
              type="tel"
              placeholder="07XX XXX XXX"
              value={formData.parentPhone}
              onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentEmail" className={labelClass}>Email *</Label>
            <Input
              id="parentEmail"
              type="email"
              placeholder="email@exemplu.ro"
              value={formData.parentEmail}
              onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* How did you hear */}
      <div className="space-y-2">
        <Label htmlFor="source" className={`${labelClass} font-medium`}>Cum ați aflat de taberele noastre?</Label>
        <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Selectează o opțiune" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="google">Căutare Google</SelectItem>
            <SelectItem value="recomandare">Recomandare prieten</SelectItem>
            <SelectItem value="participant-anterior">Am participat anterior</SelectItem>
            <SelectItem value="altele">Altele</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Consent Checkboxes */}
      <div className={`space-y-4 pt-4 border-t ${variant === "dark" ? "border-primary-foreground/20" : "border-border"}`}>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="gdpr"
            checked={formData.gdprConsent}
            onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: checked as boolean })}
            required
            className={variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""}
          />
          <Label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed">
            Am înțeles și sunt de acord cu{" "}
            <a
              href="/declaratie-consimtamant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline"
            >
              declarația de consimțământ
            </a>{" "}
            privind procesarea datelor personale *
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.termsConsent}
            onCheckedChange={(checked) => setFormData({ ...formData, termsConsent: checked as boolean })}
            required
            className={variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""}
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            Am citit și sunt de acord cu{" "}
            <a
              href="/regulament"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline"
            >
              regulamentul de funcționare
            </a>{" "}
            al taberei. *
          </Label>

        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full"
      >
        <Send className="w-5 h-5 mr-2" />
        Trimite Formularul de Înscriere
      </Button>
    </form>
  );
};


export default RegistrationForm;
