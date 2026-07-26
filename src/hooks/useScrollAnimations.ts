/**
 * Hooks de revelación al scroll, ahora sobre anime.js v4.
 * (Antes usaban GSAP/ScrollTrigger.)
 */
import { useEffect, useRef, type RefObject } from "react";
import { reveal, parallaxY } from "../lib/anime";

interface RevealOpts {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  opts?: RevealOpts
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    reveal(ref.current, opts);
  }, []);
  return ref;
}

export function useParallax<T extends HTMLElement>(
  distance = 90
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    parallaxY(ref.current, distance);
  }, [distance]);
  return ref;
}
