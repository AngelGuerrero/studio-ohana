import { useEffect, useRef, useState } from "react";
import { animate, reveal, splitReveal } from "../../lib/anime";
import data from "../../data/data.json";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    splitReveal(titleRef.current);
    reveal(formRef.current, { y: 50, delay: 150 });
    reveal(infoRef.current, { x: -40, delay: 250 });
  }, []);

  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll("input, textarea, select");
    if (!inputs) return;
    const handlers: Array<() => void> = [];
    inputs.forEach((input) => {
      const onFocus = () => animate(input, { scale: [1, 1.015], duration: 300, ease: "outQuad" } as any);
      const onBlur = () => animate(input, { scale: [1.015, 1], duration: 300, ease: "outQuad" } as any);
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
      handlers.push(() => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      });
    });
    return () => handlers.forEach((h) => h());
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = formRef.current?.querySelector('button[type="submit"]');
    if (btn) animate(btn, { scale: [1, 0.94, 1], duration: 450, ease: "outElastic(1, .5)" } as any);
    setSubmitted(true);
  };

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl bg-[var(--bg-alt)] border border-[var(--glass-border)] focus:border-cyan outline-none transition-all duration-300 text-sm";

  return (
    <section id="contacto" className="relative section-padding overflow-hidden">
      <div className="container-custom px-6">
        <p className="eyebrow text-lime mb-6" data-anim>{"// Contacto"}</p>
        <h2 ref={titleRef} className="font-display text-[clamp(2.5rem,7vw,6rem)] mb-4" data-anim>
          Hagamos realidad tu idea
        </h2>
        <p className="text-[var(--ink-dim)] mb-14 max-w-xl text-lg">
          Cuéntanos qué necesitas y te enviamos una cotización personalizada en menos de 24 horas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div ref={infoRef} className="lg:col-span-2 space-y-6" data-anim>
            <div className="card-bold rounded-2xl p-8">
              <h3 className="font-display text-xl uppercase mb-6">Información</h3>
              <div className="space-y-4 text-sm text-[var(--ink-dim)]">
                {data.company.contact.email && (
                  <a href={`mailto:${data.company.contact.email}`} className="flex items-center gap-3 hover:text-cyan transition-colors">
                    <svg className="w-5 h-5 text-cyan flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {data.company.contact.email}
                  </a>
                )}
                {data.company.contact.phone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-cyan flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {data.company.contact.phone}
                  </div>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--glass-border)] flex gap-4">
                {data.company.contact.social.instagram && (
                  <a href={data.company.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-dim)] hover:text-magenta transition-colors" aria-label="Instagram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                  </a>
                )}
                {data.company.contact.social.facebook && (
                  <a href={data.company.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-dim)] hover:text-cyan transition-colors" aria-label="Facebook">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="card-bold rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-lime/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display text-3xl uppercase mb-3">¡Mensaje enviado!</h3>
                <p className="text-[var(--ink-dim)]">Gracias por contactarnos. Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="card-bold rounded-2xl p-8 md:p-10 space-y-6" data-anim>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold mb-2">Nombre</label>
                    <input id="name" type="text" required className={inputCls} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold mb-2">Correo</label>
                    <input id="email" type="email" required className={inputCls} placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="product" className="block text-xs uppercase tracking-wider font-semibold mb-2">Producto de interés</label>
                  <select id="product" className={inputCls}>
                    <option value="">Selecciona un producto</option>
                    {data.products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold mb-2">Cuéntanos tu idea</label>
                  <textarea id="message" required rows={4} className={`${inputCls} resize-none`} placeholder="Describe tu proyecto, diseño ideal o cualquier detalle..." />
                </div>
                <button type="submit" className="btn-neon w-full justify-center">Enviar mensaje</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
