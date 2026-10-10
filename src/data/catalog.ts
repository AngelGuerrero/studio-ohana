import gallery from "@/data/product-gallery.json";
import testimonialsData from "@/data/testimonials.json";

export const categoryLabels: Record<string, string> = {
  playeras: "Playeras", termos: "Termos", tazas: "Tazas", vasos: "Vasos",
  stickers: "Stickers", viniles: "Viniles", globos: "Globos", kits: "Kits",
  "regalos-y-arreglos": "Arreglos", cuadros: "Cuadros",
};

// Cada colección corresponde a un solo tipo de producto.
const collectionDefinitions = [
  { id: "playeras", label: categoryLabels.playeras, featured: [102, 24, 40] },
  { id: "termos", label: categoryLabels.termos, featured: [85, 86, 57] },
  { id: "tazas", label: categoryLabels.tazas, featured: [84, 82, 81] },
  { id: "vasos", label: categoryLabels.vasos, featured: [90] },
  { id: "stickers", label: categoryLabels.stickers, featured: [75, 4, 88] },
  { id: "viniles", label: categoryLabels.viniles, featured: [22, 78, 100] },
  { id: "globos", label: categoryLabels.globos, featured: [10, 12, 14] },
  { id: "kits", label: categoryLabels.kits, featured: [15, 20, 83] },
  { id: "regalos-y-arreglos", label: categoryLabels["regalos-y-arreglos"], featured: [72] },
  { id: "cuadros", label: categoryLabels.cuadros, featured: [1] },
];

export type GalleryItem = { src: string; thumb: string; alt: string; label: string; width: number; height: number };

export function thumbOf(src: string) {
  const slash = src.lastIndexOf("/");
  return `${src.slice(0, slash)}/thumbs/${src.slice(slash + 1).replace(/\.(jpe?g|png|webp)$/i, ".webp")}`;
}

export const collections = collectionDefinitions.map((collection) => {
  const raw = gallery.filter((item) => item.category === collection.id);
  const ordered = [
    ...collection.featured.map((id) => raw.find((item) => item.id === id)).filter((item) => item !== undefined),
    ...raw.filter((item) => !collection.featured.includes(item.id)),
  ];
  const items: GalleryItem[] = ordered.map((item, index) => {
    const label = categoryLabels[item.category] ?? item.category;
    return {
      src: item.src,
      thumb: thumbOf(item.src),
      label,
      alt: `${label} personalizados por Studio Ohana, trabajo ${index + 1} de ${ordered.length}`,
      width: item.width,
      height: item.height,
    };
  });
  return { ...collection, items };
});

export const totalWorks = gallery.length;

export const heroSlides = ["termos", "playeras", "tazas"].map((category) => {
  const collection = collections.find((item) => item.id === category)!;
  const [main, back, side] = collection.items;
  return { name: collection.label, main, back, side };
});

export type Testimonial = { src: string; alt: string; width: number; height: number; caption?: string };
export const testimonials = testimonialsData as Testimonial[];
