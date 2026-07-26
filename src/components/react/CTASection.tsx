import { useEffect, useRef } from "react";
import { reveal, splitReveal } from "../../lib/anime";

export default function CTASection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(headingRef.current, { staggerMs: 22 });
    reveal(textRef.current, { y: 28, delay: 250 });
    if (btnsRef.current) {
      reveal(btnsRef.current.children as any, { y: 24, stagger: 110, delay: 350, trigger: btnsRef.current });
    }
  }, []);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-custom px-6">
        <div className="relative rounded-[2rem] border border-[var(--glass-border)] overflow-hidden grid-lines">
          <div className="blob w-[30vw] h-[30vw] bg-cyan/50 -top-[8vw] left-[10vw]" aria-hidden="true" />
          <div className="blob w-[28vw] h-[28vw] bg-magenta/50 bottom-[-8vw] right-[8vw]" aria-hidden="true" />

          <div className="relative z-10 px-6 py-20 md:py-32 text-center">
            <h2 ref={headingRef} className="font-display text-[clamp(2.8rem,9vw,8rem)] mb-8" data-anim>
              ¿Listo para <span className="text-magenta">crear</span>?
            </h2>
            <p ref={textRef} className="text-[var(--ink-dim)] text-lg max-w-xl mx-auto mb-12" data-anim>
              Cuéntanos tu idea y la convertimos en un producto personalizado con
              color que no se desvanece.
            </p>
            <div ref={btnsRef} className="flex flex-wrap items-center justify-center gap-4" data-anim>
              <a href="#contacto" className="btn-neon">
                Solicitar cotización
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#productos" className="btn-ghost">Ver productos</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
