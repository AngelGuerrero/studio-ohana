import { useEffect, useRef, useState } from "react";
import { animate, reveal, splitReveal, reducedMotion } from "../../lib/anime";
import data from "../../data/data.json";

const ACCENTS = ["#00E5FF", "#FF1E8E", "#C6FF1A", "#8A5CFF", "#FF6B2C"];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const testimonials = data.testimonials;

  useEffect(() => {
    splitReveal(titleRef.current);
    reveal(cardRef.current, { y: 60, delay: 150 });
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    if (reducedMotion()) {
      trackRef.current.style.transform = `translateX(-${active * 100}%)`;
      return;
    }
    animate(trackRef.current, {
      translateX: `-${active * 100}%`,
      duration: 700,
      ease: "outExpo",
    } as any);
  }, [active]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonios" className="relative section-padding overflow-hidden">
      <div className="container-custom px-6">
        <h2 ref={titleRef} className="font-display text-[clamp(2.5rem,6vw,5rem)] mb-14 max-w-4xl" data-anim>
          Lo que dicen quienes ya imprimieron con nosotros
        </h2>

        <div ref={cardRef} className="relative overflow-hidden rounded-3xl card-bold" data-anim>
          <div ref={trackRef} className="flex">
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full p-10 md:p-16 lg:p-20 shrink-0">
                <span
                  className="accent-text font-display text-7xl md:text-8xl leading-none block mb-6"
                  style={{ ["--accent" as any]: ACCENTS[i % ACCENTS.length] }}
                >
                  &ldquo;
                </span>
                <p className="text-xl md:text-3xl font-light leading-snug max-w-3xl mb-10">
                  {t.text}
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black font-display text-xl"
                    style={{ background: ACCENTS[i % ACCENTS.length] }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    {t.role && <p className="text-sm text-[var(--ink-dim)]">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="flex items-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === active ? "2.5rem" : "0.75rem",
                  background: i === active ? ACCENTS[i % ACCENTS.length] : "var(--glass-border)",
                }}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
