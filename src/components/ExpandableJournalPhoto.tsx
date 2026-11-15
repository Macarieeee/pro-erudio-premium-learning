import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ExpandableJournalPhotoProps = {
  src: string;
  alt: string;
  className: string;
  children: ReactNode;
};

const ExpandableJournalPhoto = ({ src, alt, className, children }: ExpandableJournalPhotoProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        aria-label={`Mărește fotografia: ${alt}`}
        className={`${className} cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-inset`}
      >
        {children}
      </button>
    </DialogTrigger>
    <DialogContent
      className="w-[96vw] max-w-6xl gap-0 overflow-hidden border-0 bg-black p-2 pt-12 text-white sm:rounded-xl [&>button]:opacity-100"
      aria-describedby={undefined}
    >
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <img src={src} alt={alt} className="mx-auto max-h-[80dvh] w-full object-contain" />
    </DialogContent>
  </Dialog>
);

export default ExpandableJournalPhoto;
