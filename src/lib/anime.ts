/**
 * Helpers de animación sobre anime.js v4.
 * Reemplaza por completo a GSAP/ScrollTrigger.
 *
 * Patrón clave v4:
 *   animate(targets, { ...props, autoplay: onScroll({ target, enter, leave, sync }) })
 * Lenis hace scroll real sobre window, por lo que onScroll lo detecta de forma nativa
 * (sin el bug de desincronización que tenía GSAP).
 */
import { animate, onScroll, stagger, splitText, utils } from "animejs";

type Targets = string | Element | NodeList | Element[] | null | undefined;

export const reducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface RevealOpts {
  /** desplazamiento vertical inicial (px) */
  y?: number;
  /** desplazamiento horizontal inicial (px) */
  x?: number;
  /** escala inicial (1 = sin escala) */
  scale?: number;
  /** rotación inicial (deg) */
  rotate?: number;
  duration?: number;
  delay?: number | ((el: Element, i: number) => number);
  ease?: string;
  /** stagger entre elementos (ms) */
  stagger?: number;
  /** elemento observado para disparar (por defecto, el propio target) */
  trigger?: Element | null;
  /** umbral de entrada anime.js v4 ("<borde-viewport> <borde-elemento>") */
  enter?: string;
  /** repetir cada vez que entra al viewport */
  repeat?: boolean;
}

/** Revelación al hacer scroll. Si reduced-motion, deja el contenido visible. */
export function reveal(targets: Targets, opts: RevealOpts = {}) {
  if (!targets) return;
  const {
    y = 44,
    x = 0,
    scale,
    rotate,
    duration = 950,
    delay = 0,
    ease = "outExpo",
    stagger: staggerMs,
    trigger,
    enter = "bottom-=10% top",
    repeat = false,
  } = opts;

  if (reducedMotion()) {
    utils.set(targets as any, { opacity: 1, translateX: 0, translateY: 0, scale: 1, rotate: 0 });
    return;
  }

  const props: Record<string, unknown> = {
    opacity: [0, 1],
    duration,
    ease,
    delay: staggerMs ? stagger(staggerMs, { start: typeof delay === "number" ? delay : 0 }) : delay,
    autoplay: onScroll({
      target: (trigger ?? (targets as any)) as any,
      enter,
      repeat,
    }),
  };
  if (y) props.translateY = [y, 0];
  if (x) props.translateX = [x, 0];
  if (scale) props.scale = [scale, 1];
  if (rotate) props.rotate = [rotate, 0];

  return animate(targets as any, props as any);
}

/** Revelación con stagger sobre los hijos, disparada por el contenedor. */
export function revealStagger(
  children: Targets,
  container: Element | null,
  opts: RevealOpts = {}
) {
  return reveal(children, { stagger: 90, trigger: container, ...opts });
}

/**
 * Parallax/scrub: vincula una propiedad al progreso de scroll (sync).
 * distance en px; el elemento se mueve de -distance a +distance.
 */
export function parallaxY(target: Element | null, distance = 90, trigger?: Element | null) {
  if (!target || reducedMotion()) return;
  return animate(target, {
    translateY: [-distance, distance],
    ease: "linear",
    autoplay: onScroll({
      target: (trigger ?? target) as any,
      enter: "start end",
      leave: "end start",
      sync: 0.6,
    }),
  } as any);
}

/** Barra de progreso (escala) ligada al scroll de un contenedor. */
export function scrubScale(
  target: Element | null,
  trigger: Element | null,
  axis: "X" | "Y" = "Y"
) {
  if (!target || reducedMotion()) return;
  const key = axis === "Y" ? "scaleY" : "scaleX";
  return animate(target, {
    [key]: [0, 1],
    ease: "linear",
    autoplay: onScroll({
      target: trigger as any,
      enter: "center end",
      leave: "end start",
      sync: true,
    }),
  } as any);
}

/**
 * Divide un título en caracteres y los revela al entrar (efecto cortina 3D).
 * Devuelve el splitter para poder revertir.
 */
export function splitReveal(el: Element | null, opts: { delay?: number; enter?: string; staggerMs?: number } = {}) {
  if (!el) return;
  if (reducedMotion()) {
    utils.set(el as any, { opacity: 1 });
    return;
  }
  const { delay = 0, enter = "bottom-=5% top", staggerMs = 28 } = opts;
  // words: true envuelve cada palabra para que NO se parta a la mitad al hacer wrap.
  const split = splitText(el as any, { chars: { wrap: "clip" }, words: true } as any);
  animate(split.chars, {
    opacity: [0, 1],
    translateY: ["110%", "0%"],
    rotateZ: [6, 0],
    duration: 850,
    ease: "outExpo",
    delay: stagger(staggerMs, { start: delay }),
    autoplay: onScroll({ target: el as any, enter, repeat: false }),
  } as any);
  return split;
}

/** Aparición tipo "glitch": jitter rápido en X + opacidad (estética maximalista). */
export function glitchIn(el: Element | null, opts: { delay?: number; trigger?: Element | null } = {}) {
  if (!el) return;
  if (reducedMotion()) {
    utils.set(el as any, { opacity: 1, translateX: 0 });
    return;
  }
  return animate(el, {
    opacity: [
      { to: 0, duration: 0 },
      { to: 1, duration: 60 },
      { to: 0.3, duration: 50 },
      { to: 1, duration: 90 },
    ],
    translateX: [
      { to: -8, duration: 60 },
      { to: 6, duration: 50 },
      { to: -3, duration: 50 },
      { to: 0, duration: 120 },
    ],
    skewX: [
      { to: -12, duration: 60 },
      { to: 8, duration: 50 },
      { to: 0, duration: 120 },
    ],
    delay: opts.delay ?? 0,
    autoplay: onScroll({ target: (opts.trigger ?? el) as any, enter: "bottom-=5% top", repeat: false }),
  } as any);
}

export { animate, onScroll, stagger, utils };
