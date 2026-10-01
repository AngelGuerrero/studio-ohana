import { useEffect, useRef } from "react";
import { reveal, splitReveal } from "../../lib/anime";
import data from "../../data/data.json";

const ACCENTS = ["#D4AF37", "#F3DD95", "#B58B2A", "#FFF4D0"];

const icons = [
  <svg key="idea" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  <svg key="diseno" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  <svg key="produccion" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  <svg key="entrega" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(titleRef.current);
    reveal(subtitleRef.current, { y: 24, delay: 200 });
    if (stepsRef.current) {
      reveal(stepsRef.current.querySelectorAll(".process-card") as any, {
        y: 60,
        stagger: 140,
        trigger: stepsRef.current,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="proceso" className="relative section-padding overflow-hidden">
      <div className="container-custom px-6">
        <div className="mb-16 md:mb-24">
          <h2 ref={titleRef} className="font-display text-[clamp(2.5rem,6vw,5rem)] max-w-3xl" data-anim>
            {data.process.title}
          </h2>
          <p ref={subtitleRef} className="text-[var(--ink-dim)] text-lg max-w-xl mt-5" data-anim>
            {data.process.subtitle}
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-[var(--glass-border)]">
          {data.process.steps.map((step, i) => (
            <div
              key={step.step}
              className="process-card relative p-7 md:p-8 border-b md:border-b-0 md:border-r last:border-0 border-[var(--glass-border)] transition-colors hover:bg-white/[0.03]"
              style={{ ["--accent" as any]: ACCENTS[i % ACCENTS.length] }}
              data-anim
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black"
                  style={{ background: ACCENTS[i % ACCENTS.length] }}
                >
                  {icons[i]}
                </span>
                <span className="font-display text-5xl text-stroke opacity-40">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl uppercase mb-3">{step.title}</h3>
              <p className="text-sm text-[var(--ink-dim)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
