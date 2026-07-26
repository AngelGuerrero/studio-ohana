import { useEffect, useRef } from "react";
import { reveal, splitReveal } from "../../lib/anime";
import data from "../../data/data.json";

export default function FAQ() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(titleRef.current);
    if (itemsRef.current) {
      reveal(itemsRef.current.children as any, { y: 30, stagger: 90, trigger: itemsRef.current });
    }
  }, []);

  if (data.faq.length === 0) return null;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-custom px-6 max-w-4xl">
        <p className="eyebrow text-cyan mb-6 text-center" data-anim>{"// Preguntas frecuentes"}</p>
        <h2 ref={titleRef} className="font-display text-[clamp(2.2rem,5vw,4.5rem)] text-center mb-14" data-anim>
          ¿Dudas? Las resolvemos
        </h2>

        <div ref={itemsRef} className="space-y-4">
          {data.faq.map((item, i) => (
            <details key={i} className="card-bold rounded-2xl overflow-hidden group" data-anim>
              <summary className="px-7 py-6 cursor-pointer flex items-center justify-between gap-4 text-base md:text-lg font-semibold hover:text-cyan transition-colors list-none">
                {item.q}
                <span className="relative w-5 h-5 flex-shrink-0">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-cyan -translate-y-1/2" />
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-cyan -translate-y-1/2 rotate-90 transition-transform duration-300 group-open:rotate-0" />
                </span>
              </summary>
              <div className="px-7 pb-6 text-[var(--ink-dim)] leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
