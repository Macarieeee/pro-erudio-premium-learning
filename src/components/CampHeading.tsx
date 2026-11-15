import { createContext, useContext, type ReactNode } from "react";
import { BookOpen, CalendarDays, CheckCircle, ClipboardList, Compass, FileText, HeartHandshake, Hotel, Info, Languages, MapPin, Mountain, Palette, Phone, Search, Sparkles, Trophy, Users, Wallet, XCircle } from "lucide-react";

export const CampHeadingIcons = createContext(false);

function titleIcon(title: string) {
  const text = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/nu include/.test(text)) return XCircle;
  if (/include/.test(text)) return CheckCircle;
  if (/program|ziua|zilele|orar/.test(text)) return CalendarDays;
  if (/contact/.test(text)) return Phone;
  if (/inscriere|formular|rezerv/.test(text)) return ClipboardList;
  if (/parint|tutore|cursant|copil|participant|echip|prieteni/.test(text)) return Users;
  if (/document|regul|conditi/.test(text)) return FileText;
  if (/reducer|pret|tarif|buget/.test(text)) return Wallet;
  if (/hotel|cazare|camere|facilitat/.test(text)) return Hotel;
  if (/locati|centr|campus/.test(text)) return MapPin;
  if (/englez|english|limb|comunica/.test(text)) return Languages;
  if (/detectiv|comori/.test(text)) return Search;
  if (/artist|creat/.test(text)) return Palette;
  if (/campion|premi|castig/.test(text)) return Trophy;
  if (/autonom|increder|abilitat/.test(text)) return HeartHandshake;
  if (/natur|aventur|sport/.test(text)) return Mountain;
  if (/excurs|explor|taber/.test(text)) return Compass;
  if (/atelier|curs|invat/.test(text)) return BookOpen;
  if (/sear|serii|activitat|distract/.test(text)) return Sparkles;
  return Info;
}

export function CampHeading({ children }: { children: ReactNode }) {
  const enabled = useContext(CampHeadingIcons);
  if (!enabled) return <>{children}</>;
  const Icon = titleIcon(typeof children === "string" ? children : "");
  return (
    <span className="inline-flex max-w-full items-baseline gap-3 text-left">
      <Icon className="relative top-[0.12em] h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" />
      <span className="min-w-0">{children}</span>
    </span>
  );
}
