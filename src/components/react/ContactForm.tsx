import { useEffect, useRef } from "react";
import { reveal, splitReveal } from "../../lib/anime";
import data from "../../data/data.json";
import { generalWhatsAppUrl } from "../../lib/contact";

export default function ContactForm() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(titleRef.current);
    if (cardsRef.current) {
      reveal(cardsRef.current.children as any, { y: 28, stagger: 120, trigger: cardsRef.current });
    }
  }, []);

  return (
    <section id="contacto" className="relative section-padding overflow-hidden">
      <div className="container-custom px-6 max-w-5xl">
        <h2 ref={titleRef} className="font-display text-[clamp(2.8rem,7vw,6rem)] max-w-3xl" data-anim>
          Hagamos realidad tu idea
        </h2>
        <p className="text-[var(--ink-dim)] mt-5 mb-10 max-w-xl text-lg">
          Elige el canal que prefieras. Te orientamos personalmente para empezar tu cotización.
        </p>

        <div ref={cardsRef} className="grid gap-5 md:grid-cols-2">
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group card-bold p-8 md:p-10 border-gold/50 hover:border-gold"
            data-anim
          >
            <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black">
              <svg width="23" height="23" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1c-1.8-.9-3-1.6-4.2-3.7-.1-.3 0-.4.1-.5l.5-.6.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3c.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" /></svg>
            </span>
            <p className="eyebrow text-gold mb-3">WhatsApp</p>
            <h3 className="font-display text-3xl mb-3">Cotiza con nosotros</h3>
            <p className="text-[var(--ink-dim)]">Cuéntanos qué quieres personalizar y recibe atención directa.</p>
            <span className="mt-8 inline-flex font-bold text-gold group-hover:translate-x-1 transition-transform">Abrir WhatsApp →</span>
          </a>

          <a
            href={data.company.contact.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group card-bold p-8 md:p-10 hover:border-gold"
            data-anim
          >
            <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </span>
            <p className="eyebrow text-gold mb-3">Facebook</p>
            <h3 className="font-display text-3xl mb-3">Conoce nuestro trabajo</h3>
            <p className="text-[var(--ink-dim)]">Síguenos y mándanos un mensaje desde nuestra página.</p>
            <span className="mt-8 inline-flex font-bold text-gold group-hover:translate-x-1 transition-transform">Ir a Facebook →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
