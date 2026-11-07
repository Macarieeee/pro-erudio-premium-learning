import { createContext, useContext, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ImageZoomContext = createContext<((image: { src: string; alt: string }) => void) | null>(null);

export function ImageZoomProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  return (
    <ImageZoomContext.Provider value={enabled ? setImage : null}>
      {children}
      <Dialog open={image !== null} onOpenChange={(open) => { if (!open) setImage(null); }}>
        <DialogContent aria-describedby={undefined} className="h-[100dvh] w-screen max-w-none rounded-none sm:rounded-none border-0 bg-black/95 p-4 pt-14 text-white gap-0 [&>button]:rounded-full [&>button]:bg-white [&>button]:p-2 [&>button]:text-black [&>button]:opacity-100">
          <DialogTitle className="sr-only">{image?.alt || "Imagine mărită"}</DialogTitle>
          {image && <img src={image.src} alt={image.alt} className="w-full h-full min-h-0 object-contain" />}
        </DialogContent>
      </Dialog>
    </ImageZoomContext.Provider>
  );
}

export function ZoomableImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const zoom = useContext(ImageZoomContext);
  if (!zoom) return <img {...props} />;
  const open = () => { if (props.src) zoom({ src: props.src, alt: props.alt ?? "" }); };
  return <img {...props} role="button" tabIndex={0} aria-label={`Mărește: ${props.alt || "fotografia"}`} className={`${props.className ?? ""} cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`} onClick={open} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }} />;
}
