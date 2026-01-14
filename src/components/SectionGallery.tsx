type GalleryImage = {
  src: string;
  alt?: string;
};

type SectionGalleryProps = {
  images?: (GalleryImage | string)[];
  className?: string;
};

export function SectionGallery({
  images,
  className = "",
}: SectionGalleryProps) {
  if (!images?.length) return null;

  const safeImages: GalleryImage[] = images
    .slice(0, 4)
    .map((img) =>
      typeof img === "string" ? { src: img } : img
    );

  const count = safeImages.length;

  const gridCols =
    count === 1
      ? "grid-cols-1"
      : count === 2
      ? "grid-cols-2"
      : count === 3
      ? "grid-cols-3"
      : "grid-cols-2";

  const wrapperClass =
    count === 1 ? "max-w-3xl mx-auto" : "max-w-6xl mx-auto";

  return (
    <div className={`mt-10 ${className}`}>
      <div className={wrapperClass}>
        <div className={`grid ${gridCols} gap-4`}>
          {safeImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.alt ?? `Galerie ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
