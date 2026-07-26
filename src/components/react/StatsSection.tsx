import { useEffect, useRef } from "react";
import { animate, onScroll, utils, reducedMotion } from "../../lib/anime";
import data from "../../data/data.json";

const ACCENTS = ["text-cyan", "text-magenta", "text-lime", "text-violet"];

export default function StatsSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const cards = wrapRef.current.querySelectorAll<HTMLElement>(".stat-card");

    cards.forEach((card, i) => {
      const valueEl = card.querySelector<HTMLElement>(".stat-value");
      const target = Number(valueEl?.dataset.target || 0);
      const suffix = valueEl?.dataset.suffix || "";

      // Entrada de la tarjeta
      if (!reducedMotion()) {
        animate(card, {
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 800,
          delay: i * 90,
          ease: "outExpo",
          autoplay: onScroll({ target: card, enter: "bottom-=8% top", repeat: false }),
        } as any);
      }

      // Conteo numérico
      if (valueEl) {
        if (reducedMotion()) {
          valueEl.textContent = target.toLocaleString() + suffix;
          return;
        }
        const obj = { v: 0 };
        animate(obj, {
          v: target,
          duration: 2200,
          ease: "outExpo",
          modifier: utils.round(0),
          onUpdate: () => {
            valueEl.textContent = Math.round(obj.v).toLocaleString() + suffix;
          },
          autoplay: onScroll({ target: valueEl, enter: "bottom top", repeat: false }),
        } as any);
      }
    });
  }, []);

  return (
    <section className="relative section-padding pt-0 overflow-hidden">
      <div className="container-custom px-6">
        <div ref={wrapRef} className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--glass-border)]">
          {data.company.stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card relative p-8 md:p-10 border-b border-r border-[var(--glass-border)]"
              data-anim
            >
              <p className={`stat-value font-display text-5xl md:text-7xl ${ACCENTS[i % ACCENTS.length]}`} data-target={stat.value} data-suffix={stat.suffix ?? ""}>
                0
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
