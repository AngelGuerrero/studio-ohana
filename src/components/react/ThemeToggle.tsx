import { useEffect, useState } from "react";

/**
 * Toggle de tema autónomo: manipula `documentElement` + localStorage.
 * No usa contexto de React porque cada componente es una isla client:only
 * independiente (el contexto no cruza islas en Astro).
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onChange = (e: Event) => setDark((e as CustomEvent<boolean>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-[var(--bg-alt)] border border-[var(--glass-border)] cursor-pointer overflow-hidden"
      aria-label={`Cambiar a modo ${dark ? "claro" : "oscuro"}`}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-cyan transition-transform duration-300 ${
          dark ? "translate-x-0.5" : "translate-x-7"
        }`}
      />
      <span className="absolute left-1 top-1 text-xs">🌙</span>
      <span className="absolute right-1 top-1 text-xs">☀️</span>
    </button>
  );
}
