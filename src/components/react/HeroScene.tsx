import { useEffect, useRef } from "react";
import { animate, stagger, splitText } from "animejs";
import { generalWhatsAppUrl } from "../../lib/contact";

const frames = [
  { src: "/images/generated/taza.png", name: "Tazas", material: "Cerámica" },
  { src: "/images/generated/playera.png", name: "Playeras", material: "Textil" },
  { src: "/images/generated/termo.png", name: "Termos", material: "Metal" },
  { src: "/images/generated/gorra.png", name: "Gorras", material: "Textil" },
];

function ProductFilm() {
  return (
    <div className="hero-film" aria-hidden="true">
      {frames.map((frame, index) => (
        <figure key={frame.name} className={`hero-film-frame hero-film-frame-${index + 1}`}>
          <img
            src={frame.src}
            alt=""
            width="1536"
            height="1024"
            loading="eager"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </figure>
      ))}
      <div className="hero-film-heat" />
      <div className="hero-film-shade" />
    </div>
  );
}

export default function HeroScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (titleRef.current) {
      const split = splitText(titleRef.current, { chars: { wrap: "clip" }, words: true } as any);
      animate(split.chars, {
        opacity: [0, 1],
        translateY: ["110%", "0%"],
        duration: 950,
        ease: "outExpo",
        delay: stagger(26, { start: 180 }),
      } as any);
    }
    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1], translateY: [18, 0], duration: 750, delay: 760, ease: "outExpo",
      } as any);
    }
    if (ctaRef.current) {
      animate(ctaRef.current.children, {
        opacity: [0, 1], translateY: [16, 0], duration: 650,
        delay: stagger(100, { start: 940 }), ease: "outBack",
      } as any);
    }
  }, []);

  return (
    <section className="hero-section relative min-h-screen overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
      <ProductFilm />

      <div className="container-wide relative z-10 flex min-h-[calc(100vh-10rem)] items-center px-6 md:px-10">
        <div className="hero-copy max-w-2xl pt-64 md:pt-0">
          <h1 ref={titleRef} className="font-display text-[clamp(3.2rem,9vw,8.5rem)]" data-anim>
            <span className="block text-stroke">Tu idea,</span>
            <span className="block text-[var(--ink)]">impresa</span>
            <span className="block text-gold">para durar.</span>
          </h1>

          <p ref={subtitleRef} className="mt-7 mb-9 max-w-xl text-base leading-relaxed text-[var(--ink-dim)] md:text-lg" data-anim>
            Personalizamos playeras, tazas, termos, gorras y más. Cuéntanos qué imaginas y cotiza directamente por WhatsApp.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4" data-anim>
            <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-neon">
              Cotizar por WhatsApp
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#productos" className="btn-ghost">Explorar productos</a>
          </div>
        </div>
      </div>

    </section>
  );
}
