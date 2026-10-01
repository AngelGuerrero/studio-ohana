import { useEffect, useRef } from "react";
import { reveal, splitReveal, parallaxY } from "../../lib/anime";
import { whatsappUrl } from "../../lib/contact";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
  features: string[];
  animation: "slideLeft" | "slideRight";
}

interface Props {
  product: Product;
  index: number;
}

const ACCENTS = ["#D4AD45", "#F4E4B2", "#B98D32", "#A9802A", "#E8CD82"];

export default function ProductSection({ product, index }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  const accent = ACCENTS[index % ACCENTS.length];
  const isEven = index % 2 === 0;

  useEffect(() => {
    // Una sola animación por elemento — sin conflictos.
    reveal(imageRef.current, { x: isEven ? -60 : 60, scale: 0.92, duration: 1100 });
    reveal(taglineRef.current, { y: 24, delay: 150, trigger: sectionRef.current });
    splitReveal(nameRef.current, { enter: "bottom-=8% top", staggerMs: 30 });
    reveal(descRef.current, { y: 28, delay: 250, trigger: sectionRef.current });
    if (featuresRef.current) {
      reveal(featuresRef.current.children as any, {
        y: 24,
        stagger: 80,
        delay: 350,
        trigger: sectionRef.current,
      });
    }
    parallaxY(imageInnerRef.current, 40, imageRef.current);
    parallaxY(numRef.current, 70, sectionRef.current);
  }, [isEven]);

  return (
    <section
      ref={sectionRef}
      id={product.id}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ ["--accent" as any]: accent }}
    >
      {/* Número gigante de fondo */}
      <div
        ref={numRef}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 -z-0 font-display select-none leading-none text-stroke opacity-[0.07] text-[34vw] md:text-[26vw]"
        style={{ [isEven ? "right" : "left"]: "-2vw" }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="container-custom w-full relative z-10 px-6 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Imagen / panel de color */}
          <div className={isEven ? "lg:order-1" : "lg:order-2"}>
            <div
              ref={imageRef}
              className="group relative aspect-[4/3] overflow-hidden border bg-[var(--bg-alt)]"
              style={{ borderColor: accent }}
              data-anim
            >
              <div
                ref={imageInnerRef}
                className="absolute inset-0 w-full h-full"
              >
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center bg-[var(--bg-alt)]">
                    {/* Manchas de color = swatch de sublimación */}
                    <div
                      className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 rounded-full blur-3xl opacity-60"
                      style={{ background: accent }}
                    />
                    <div
                      className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full blur-3xl opacity-40"
                      style={{ background: ACCENTS[(index + 2) % ACCENTS.length] }}
                    />
                    <span className="relative font-display text-[clamp(2rem,8vw,5rem)] text-stroke text-center px-6 leading-none">
                      {product.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Etiqueta flotante */}
              <span
                className="absolute top-5 left-5 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-black"
                style={{ background: accent }}
              >
                {String(index + 1).padStart(2, "0")} / Sublimación
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className={isEven ? "lg:order-2" : "lg:order-1"}>
            <p
              ref={taglineRef}
              className="eyebrow accent-text mb-5"
              data-anim
            >
              {product.tagline}
            </p>

            <h2
              ref={nameRef}
              className="font-display text-[clamp(2.8rem,7vw,6rem)] mb-6"
              data-anim
            >
              {product.name}
            </h2>

            <p
              ref={descRef}
              className="text-[var(--ink-dim)] leading-relaxed mb-8 text-base md:text-lg max-w-xl"
              data-anim
            >
              {product.description}
            </p>

            <ul ref={featuresRef} className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 max-w-lg">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" data-anim>
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl(`¡Hola, Studio Ohana! Me gustaría cotizar ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group accent-text inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] transition-colors"
            >
              Cotizar por WhatsApp
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
