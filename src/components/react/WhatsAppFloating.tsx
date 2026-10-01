import { useEffect, useState } from "react";
import { generalWhatsAppUrl } from "../../lib/contact";

export default function WhatsAppFloating() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight * 0.72);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <a
      href={generalWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-5 bottom-5 z-[60] flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-gold p-0 text-sm font-bold text-black shadow-[0_12px_35px_rgba(212,175,55,.30)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--bg)] sm:h-auto sm:w-auto sm:px-5 sm:py-3 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      aria-label="Cotizar por WhatsApp"
    >
      <svg width="19" height="19" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1c-1.8-.9-3-1.6-4.2-3.7-.1-.3 0-.4.1-.5l.5-.6.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3c.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" /></svg>
      <span className="hidden sm:inline">Cotizar por WhatsApp</span>
    </a>
  );
}
