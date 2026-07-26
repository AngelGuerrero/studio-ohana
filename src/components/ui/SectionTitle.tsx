import { useScrollReveal } from "../../hooks/useScrollAnimations";

interface Props {
  title: string;
  subtitle?: string;
  accent?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  accent,
  center = true,
}: Props) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}
    >
      {accent && (
        <p className="text-accent text-sm uppercase tracking-[0.3em] font-medium mb-3">
          {accent}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-bold">{title}</h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
