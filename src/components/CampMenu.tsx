import { Book, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CampMenu({ src, alt, compact = false, extraImage }: { src: string; alt: string; compact?: boolean; extraImage?: { src: string; alt: string } }) {
  return (
    <section className="py-6 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Book className="h-8 w-8 text-primary" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meniu orientativ</h2>
        </div>
        <div className={extraImage ? "grid md:grid-cols-2 gap-6 items-center max-w-5xl mx-auto" : undefined}>
        {[{ src, alt }, ...(extraImage ? [extraImage] : [])].map(({ src, alt }) => (
        <Dialog key={src}>
          <DialogTrigger asChild>
            <button type="button" className={`group block ${compact ? "max-w-lg" : "max-w-4xl"} w-full mx-auto rounded-2xl overflow-hidden shadow-lg cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4`} aria-label={`Mărește: ${alt}`}>
              <img src={src} alt={alt} loading="lazy" className={extraImage ? `w-full aspect-[4/3] bg-white ${src === extraImage.src ? "object-cover" : "object-contain"}` : "w-full object-contain"} />
              <span className="flex justify-center items-center gap-2 bg-background py-3 text-sm text-primary font-medium">
                <ZoomIn className="h-4 w-4" aria-hidden="true" /> Click pentru mărire
              </span>
            </button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined} className="h-[100dvh] w-screen max-w-none rounded-none sm:rounded-none border-0 bg-black/95 p-4 pt-14 text-white gap-0 [&>button]:rounded-full [&>button]:bg-white [&>button]:p-2 [&>button]:text-black [&>button]:opacity-100">
            <DialogTitle className="sr-only">Meniu orientativ – imagine mărită</DialogTitle>
            <img src={src} alt={alt} className="w-full h-full min-h-0 object-contain" />
          </DialogContent>
        </Dialog>
        ))}
        </div>
      </div>
    </section>
  );
}
