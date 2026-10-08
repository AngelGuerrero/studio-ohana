import gallery from "@/data/product-gallery.json";
import testimonialsData from "@/data/testimonials.json";

export const categoryLabels: Record<string, string> = {
  bolsas: "Bolsas", cuadros: "Cuadros", "disenos-y-marca": "Diseño y marca", etiquetas: "Etiquetas",
  globos: "Globos", kits: "Kits", papeleria: "Papelería", playeras: "Playeras", "regalos-y-arreglos": "Regalos y arreglos",
  stickers: "Stickers", tazas: "Tazas", termos: "Termos", vasos: "Vasos", "vinilos-textiles": "Vinil textil",
};

/** Las categorías con pocas fotos se agrupan para que ninguna tarjeta luzca vacía. */
const collectionDefinitions = [
  { id: "playeras", label: "Playeras", description: "Para equipos, eventos, negocios o tu estilo personal.", categories: ["playeras"], featured: [102, 24, 40] },
  { id: "bebidas", label: "Tazas y termos", description: "Regalos útiles que se usan todos los días.", categories: ["termos", "tazas"], featured: [85, 84] },
  { id: "vasos", label: "Vasos", description: "Detalles para bodas, fiestas y celebraciones.", categories: ["vasos"], featured: [90] },
  { id: "stickers", label: "Stickers y vinil", description: "Stickers, vinil textil y aplicaciones para tus diseños.", categories: ["stickers", "vinilos-textiles"], featured: [74, 100] },
  { id: "etiquetas", label: "Etiquetas", description: "Etiquetas para productos, emprendimientos y eventos.", categories: ["etiquetas"], featured: [4] },
  { id: "fiestas", label: "Globos y kits", description: "Todo para personalizar una celebración.", categories: ["globos", "kits"], featured: [10, 15] },
  { id: "marca", label: "Diseño y papelería", description: "Logotipos, identidad y papelería para tu marca.", categories: ["disenos-y-marca", "papeleria"], featured: [2, 21] },
  { id: "regalos", label: "Regalos y detalles", description: "Arreglos, cuadros y bolsas hechos a la medida.", categories: ["regalos-y-arreglos", "cuadros", "bolsas"], featured: [72, 1, 23] },
];

export type GalleryItem = { src: string; thumb: string; alt: string; label: string; width: number; height: number };

export function thumbOf(src: string) {
  const slash = src.lastIndexOf("/");
  return `${src.slice(0, slash)}/thumbs/${src.slice(slash + 1).replace(/\.(jpe?g|png|webp)$/i, ".webp")}`;
}

export const collections = collectionDefinitions.map((collection) => {
  const raw = collection.categories.flatMap((category) => gallery.filter((item) => item.category === category));
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

export const heroItems = {
  main: gallery.find((item) => item.id === 85)!,
  back: gallery.find((item) => item.id === 102)!,
  side: gallery.find((item) => item.id === 84)!,
};

export type Testimonial = { src: string; alt: string; width: number; height: number; caption?: string };
export const testimonials = testimonialsData as Testimonial[];
