import { useEffect, useRef } from "react";
import { reveal, splitReveal, parallaxY } from "../../lib/anime";
import data from "../../data/data.json";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(titleRef.current);
    reveal(textRef.current, { y: 30, delay: 200 });
    parallaxY(markRef.current, 60);
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding overflow-hidden">
      <div className="container-custom px-6">
        <p className="eyebrow text-magenta mb-6" data-anim>
          {"// Sobre nosotros"}
        </p>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <h2
            ref={titleRef}
            className="lg:col-span-7 font-display text-[clamp(2rem,7vw,5.5rem)]"
            data-anim
          >
            No vendemos productos. <span className="text-cyan">Imprimimos ideas</span>
          </h2>

          <p
            ref={textRef}
            className="lg:col-span-5 text-[var(--ink-dim)] leading-relaxed text-base md:text-lg"
            data-anim
          >
            {data.company.description}
          </p>
        </div>
      </div>

      {/* Marca de agua gigante con parallax */}
      <div
        ref={markRef}
        className="pointer-events-none absolute -bottom-10 -right-6 font-display text-[22vw] leading-none text-stroke opacity-[0.06] select-none"
        aria-hidden="true"
      >
        OHANA
      </div>
    </section>
  );
}
