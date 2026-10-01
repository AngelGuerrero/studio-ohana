import data from "../../data/data.json";
import { generalWhatsAppUrl } from "../../lib/contact";

export default function Footer() {
  const { company } = data;

  return (
    <footer className="border-t border-[var(--glass-border)]">
      <div className="container-custom grid gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex items-center gap-5">
          <span className="brand-logo-frame h-20 w-20"><img src={company.logo} alt="Studio Ohana" className="brand-logo h-full w-full object-contain" /></span>
          <div>
            <p className="font-display text-2xl">Studio Ohana</p>
            <p className="mt-1 max-w-sm text-sm text-[var(--ink-dim)]">Productos personalizados hechos para acompañar tus ideas.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-neon !px-5 !py-3">WhatsApp</a>
          <a href={company.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-3">Facebook</a>
        </div>
      </div>
      <div className="border-t border-[var(--glass-border)]">
        <div className="container-custom flex flex-col gap-2 px-6 py-5 text-xs uppercase tracking-[0.14em] text-[var(--ink-dim)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>Hecho en México</span>
        </div>
      </div>
    </footer>
  );
}
