import { useEffect, useRef } from "react";
import { reveal, splitReveal } from "../../lib/anime";
import data from "../../data/data.json";
import { generalWhatsAppUrl } from "../../lib/contact";

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
        <h2 ref={titleRef} className="font-display text-[clamp(2.2rem,5vw,4.5rem)] text-center mb-4" data-anim>
          Lo que quieres saber, claro y rápido
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-[var(--ink-dim)]">Si algo no aparece aquí, escríbenos por WhatsApp. Con gusto te orientamos.</p>

        <div ref={itemsRef} className="space-y-4">
          {data.faq.map((item, i) => (
            <details key={i} className="card-bold rounded-xl overflow-hidden group" data-anim>
              <summary className="px-6 py-5 cursor-pointer flex items-center justify-between gap-4 text-base md:text-lg font-semibold hover:text-gold transition-colors list-none">
                {item.q}
                <span className="relative w-5 h-5 flex-shrink-0">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-gold -translate-y-1/2" />
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-gold -translate-y-1/2 rotate-90 transition-transform duration-300 group-open:rotate-0" />
                </span>
              </summary>
              <div className="px-7 pb-6 text-[var(--ink-dim)] leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-bold uppercase tracking-[0.12em] text-gold hover:text-white transition-colors">¿Tienes otra pregunta? Escríbenos →</a>
        </div>
      </div>
    </section>
  );
}
