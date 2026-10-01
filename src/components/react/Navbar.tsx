import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import data from "../../data/data.json";
import { generalWhatsAppUrl } from "../../lib/contact";

const navLinks = [
  { label: "Productos", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScrollFn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScrollFn, { passive: true });
    onScrollFn();
    return () => window.removeEventListener("scroll", onScrollFn);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(navRef.current, {
      opacity: [0, 1],
      translateY: [-60, 0],
      duration: 900,
      delay: 200,
      ease: "outExpo",
    } as any);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      menuRef.current.style.display = "flex";
      animate(menuRef.current, { opacity: [0, 1], duration: 250, ease: "outQuad" } as any);
      animate(menuRef.current.querySelectorAll("a"), {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(60),
        duration: 350,
        ease: "outExpo",
      } as any);
    } else {
      const el = menuRef.current;
      animate(el, {
        opacity: [1, 0],
        duration: 200,
        ease: "inQuad",
        onComplete: () => {
          el.style.display = "none";
        },
      } as any);
    }
  }, [menuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-[var(--glass-border)]" : "bg-transparent"
      }`}
      data-anim
    >
      <div className="container-wide flex items-center justify-between px-6 md:px-10 py-4">
        <a href="#" className="flex items-center gap-3" aria-label={data.company.name}>
          <span className="brand-logo-frame h-12 w-12 md:h-14 md:w-14"><img src={data.company.logo} alt="" className="brand-logo h-full w-full object-contain" /></span>
          <span className="font-display text-xl tracking-tight text-[var(--ink)] md:text-2xl">Studio Ohana</span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="group relative text-xs font-semibold tracking-[0.18em] uppercase"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-neon !px-4 !py-2.5 !text-[0.65rem]">WhatsApp</a>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className="md:hidden flex-col glass border-t border-[var(--glass-border)]"
        style={{ display: "none" }}
      >
        <div className="flex flex-col gap-5 px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-display text-3xl uppercase hover:text-cyan transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-neon w-fit !px-5 !py-3">Cotizar por WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}
