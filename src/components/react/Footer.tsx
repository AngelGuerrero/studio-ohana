import data from "../../data/data.json";

export default function Footer() {
  const { company } = data;

  return (
    <footer className="relative border-t border-[var(--glass-border)] overflow-hidden">
      {/* Marca gigante de cierre */}
      <div className="container-wide px-6 pt-20">
        <h2 className="font-display text-[clamp(3rem,18vw,16rem)] leading-none text-neon glow-cyan select-none">
          {company.name}
        </h2>
      </div>

      <div className="container-wide px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed max-w-xs">
              {company.shortDescription}
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--ink-dim)] mb-5">Navegación</h4>
            <ul className="space-y-3">
              {["Productos", "Proceso", "Testimonios", "Contacto"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="font-display text-lg uppercase hover:text-cyan transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--ink-dim)] mb-5">Contacto</h4>
            <ul className="space-y-3 text-sm text-[var(--ink-dim)]">
              {company.contact.email && (
                <li><a href={`mailto:${company.contact.email}`} className="hover:text-cyan transition-colors">{company.contact.email}</a></li>
              )}
              {company.contact.phone && <li>{company.contact.phone}</li>}
              {company.contact.address && <li>{company.contact.address}</li>}
            </ul>
            <div className="flex gap-4 mt-6">
              {company.contact.social.instagram && (
                <a href={company.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-dim)] hover:text-magenta transition-colors" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                </a>
              )}
              {company.contact.social.facebook && (
                <a href={company.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-dim)] hover:text-cyan transition-colors" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              )}
              {company.contact.social.tiktok && (
                <a href={company.contact.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-dim)] hover:text-lime transition-colors" aria-label="TikTok">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-dim)] uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} {company.name}</span>
          <span>Sublimación full-color · Hecho en México</span>
        </div>
      </div>
    </footer>
  );
}
