import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormProps {
  variant?: "light" | "dark";
  defaultCamp?: string;
}

const RegistrationForm = ({ variant = "light", defaultCamp = "poiana-marului-2025" }: RegistrationFormProps) => {
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
  };

  const inputClass = variant === "dark" 
    ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
    : "bg-background";

  const labelClass = variant === "dark" 
    ? "text-primary-foreground"
    : "text-foreground";

  const mutedClass = variant === "dark"
    ? "text-primary-foreground/70"
    : "text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Camp Selection */}
      <div className="space-y-2">
        <Label htmlFor="camp" className={`${labelClass} font-medium`}>Tabăra selectată</Label>
        <Select value={formData.selectedCamp} onValueChange={(value) => setFormData({...formData, selectedCamp: value})}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Selectează tabăra" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="poiana-marului-2025">Tabăra Poiana Mărului 2025</SelectItem>
            <SelectItem value="uk-londra-2025">Tabăra UK - Londra 2025</SelectItem>
            <SelectItem value="marea-neagra-2025">Tabăra Marea Neagră 2025</SelectItem>
            <SelectItem value="iarna-2025">Tabăra de Iarnă 2025</SelectItem>
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
              onChange={(e) => setFormData({...formData, childName: e.target.value})}
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
              onChange={(e) => setFormData({...formData, childCity: e.target.value})}
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
            onChange={(e) => setFormData({...formData, childBirthDate: e.target.value})}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Transport Option */}
      <div className="space-y-3">
        <Label className={`${labelClass} font-medium`}>Doriți opțiunea de transport până în locație?</Label>
        <RadioGroup 
          value={formData.transport} 
          onValueChange={(value) => setFormData({...formData, transport: value})}
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
            onChange={(e) => setFormData({...formData, parentName: e.target.value})}
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
              onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
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
              onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* How did you hear */}
      <div className="space-y-2">
        <Label htmlFor="source" className={`${labelClass} font-medium`}>Cum ați aflat de taberele noastre?</Label>
        <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
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
            onCheckedChange={(checked) => setFormData({...formData, gdprConsent: checked as boolean})}
            required
            className={variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""}
          />
          <Label htmlFor="gdpr" className={`text-sm ${mutedClass} leading-relaxed cursor-pointer`}>
            Am înțeles și sunt de acord cu <span className={variant === "dark" ? "text-accent font-medium" : "text-primary font-medium"}>declarația de consimțământ</span> privind procesarea datelor personale. *
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="terms"
            checked={formData.termsConsent}
            onCheckedChange={(checked) => setFormData({...formData, termsConsent: checked as boolean})}
            required
            className={variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""}
          />
          <Label htmlFor="terms" className={`text-sm ${mutedClass} leading-relaxed cursor-pointer`}>
            Am citit și sunt de acord cu <span className={variant === "dark" ? "text-accent font-medium" : "text-primary font-medium"}>regulamentul de funcționare</span> al taberei. *
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
