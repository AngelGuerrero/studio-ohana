import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { animate, stagger, splitText } from "animejs";
import data from "../../data/data.json";

const NEON = [0x00e5ff, 0xff1e8e, 0x8a5cff, 0xc6ff1a, 0xff6b2c];
// Paleta "neón profundo" para modo claro: los mismos acentos, pero legibles
// sobre el fondo crema (coincide con las variables --color-* de globals.css).
const NEON_DEEP = [0x0b7e9c, 0xc0136a, 0x5b34d6, 0x5e7a00, 0xc0480f];

const isDarkTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  /* ---------- 3D: icosfera iridiscente + luces neón + partículas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Entorno para reflejos: un material metálico/iridiscente necesita algo que
    // reflejar; sin esto la esfera cae a casi-negro (se notaba mucho en claro).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const group = new THREE.Group();
    scene.add(group);
    // En mobile el 3D se reduce y se desplaza para no taparse con el texto.
    group.scale.setScalar(isMobile ? 0.62 : 1);
    const baseY = isMobile ? -1.6 : 0;
    group.position.y = baseY;

    // Icosfera deformable (la "superficie" sobre la que se imprime color)
    // Más subdivisiones = silueta redonda sin facetas visibles.
    const detail = isMobile ? 4 : 5;
    const geo = new THREE.IcosahedronGeometry(1.7, detail);
    const basePositions = geo.attributes.position.array.slice(0) as Float32Array;
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x111118,
      metalness: 0.55,
      roughness: 0.22,
      iridescence: 1,
      iridescenceIOR: 1.6,
      clearcoat: 1,
      clearcoatRoughness: 0.3,
      emissive: 0x0a0a14,
      emissiveIntensity: 0.4,
    });
    const blob = new THREE.Mesh(geo, mat);
    group.add(blob);

    // Wireframe brillante: jaula geodésica un poco mayor que la esfera para
    // que la contenga (antes la esfera deformada la atravesaba).
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.86, detail),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    group.add(wire);

    // Anillo
    const ringGeo = new THREE.TorusGeometry(2.7, 0.012, 16, 160);
    const ring = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({ color: 0xff1e8e, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    // Luces neón orbitando -> los colores "bailan" sobre la superficie
    const lights = NEON.slice(0, 3).map((c) => {
      const l = new THREE.PointLight(c, 60, 18);
      scene.add(l);
      return l;
    });
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambient);

    // Campo de partículas multicolor
    const count = isMobile ? 900 : 1800;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const pIdx = new Uint8Array(count); // índice de paleta por partícula (se recolorea al cambiar de tema)
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
      pIdx[i] = (Math.random() * NEON.length) | 0;
      tmp.setHex(NEON[pIdx[i]]);
      col[i * 3] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // ---------- Adaptación de tema ----------
    // Los materiales están calibrados para el fondo oscuro. En claro, el blending
    // aditivo y los neones puros se lavan sobre el crema, así que reajustamos
    // colores, opacidades y luces para que el 3D se vea correctamente en ambos temas.
    const wireMat = wire.material as THREE.MeshBasicMaterial;
    const ringMat = ring.material as THREE.MeshBasicMaterial;
    const pMat = particles.material as THREE.PointsMaterial;
    const colAttr = pGeo.attributes.color as THREE.BufferAttribute;

    const applyTheme = (dark: boolean) => {
      const pal = dark ? NEON : NEON_DEEP;

      // Partículas: recolorear + cambiar blending (aditivo lava sobre fondo claro)
      for (let i = 0; i < count; i++) {
        tmp.setHex(pal[pIdx[i]]);
        col[i * 3] = tmp.r;
        col[i * 3 + 1] = tmp.g;
        col[i * 3 + 2] = tmp.b;
      }
      colAttr.needsUpdate = true;
      pMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      pMat.opacity = dark ? 0.7 : 0.85;
      pMat.size = dark ? 0.04 : 0.05;
      pMat.needsUpdate = true;

      // Wireframe y anillo: subir opacidad y usar acentos profundos en claro
      wireMat.color.setHex(dark ? 0x00e5ff : 0x0b7e9c);
      wireMat.opacity = dark ? 0.12 : 0.3;
      ringMat.color.setHex(dark ? 0xff1e8e : 0xc0136a);
      ringMat.opacity = dark ? 0.5 : 0.8;

      // Icosfera: en oscuro, orbe profundo con neón encima; en claro, esfera
      // metálica/perlada que refleja el entorno y luce la iridiscencia (oil-slick)
      // en vez de verse como una bola gris apagada.
      mat.color.setHex(dark ? 0x111118 : 0xe9e6f2);
      mat.emissive.setHex(dark ? 0x0a0a14 : 0x000000);
      mat.emissiveIntensity = dark ? 0.4 : 0;
      mat.metalness = dark ? 0.55 : 0.95;
      mat.roughness = dark ? 0.22 : 0.16;
      mat.envMapIntensity = dark ? 0.5 : 1.15;
      mat.needsUpdate = true;

      // Luces: acentos profundos e intensidad menor en claro para no reventar a blanco
      lights.forEach((l, i) => {
        l.color.setHex(pal[i]);
        l.intensity = dark ? 60 : 42;
      });
      ambient.color.setHex(dark ? 0x404060 : 0x9a97a8);
      ambient.intensity = dark ? 0.6 : 1.15;
    };

    applyTheme(isDarkTheme());
    const onThemeChange = () => applyTheme(isDarkTheme());
    window.addEventListener("themechange", onThemeChange);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!reduced) window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    let t = 0;
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += reduced ? 0.002 : 0.006;

      // Deformación orgánica suave: onda de baja amplitud que ondula la esfera
      // sin romper su silueta redonda (sin asignaciones por vértice = fluido).
      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3;
        const x = basePositions[ix];
        const y = basePositions[ix + 1];
        const z = basePositions[ix + 2];
        const inv = 1 / Math.hypot(x, y, z); // normal = posición base normalizada
        const d =
          0.07 *
          Math.sin(x * 1.6 + t * 1.4) *
          Math.cos(y * 1.6 + t) *
          Math.sin(z * 1.6 + t * 0.8);
        posAttr.setXYZ(i, x + x * inv * d, y + y * inv * d, z + z * inv * d);
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      group.rotation.y += 0.0035;
      group.rotation.x += 0.0012;
      ring.rotation.z += 0.004;
      particles.rotation.y += 0.0004;
      wire.rotation.y -= 0.001;

      lights.forEach((l, i) => {
        const a = t * (0.6 + i * 0.25) + (i * Math.PI * 2) / 3;
        l.position.set(Math.cos(a) * 5, Math.sin(a * 1.3) * 4, Math.sin(a) * 5);
      });

      group.position.x += (mouse.x * 0.6 - group.position.x) * 0.04;
      group.position.y += (baseY + mouse.y * 0.6 - group.position.y) * 0.04;
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onThemeChange);
      geo.dispose();
      mat.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      ringGeo.dispose();
      pGeo.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  /* ---------- Intro de texto (anime.js, autoplay al cargar) ---------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timers: number[] = [];

    if (titleRef.current) {
      const split = splitText(titleRef.current, { chars: { wrap: "clip" }, words: true } as any);
      animate(split.chars, {
        opacity: [0, 1],
        translateY: ["120%", "0%"],
        rotateZ: [8, 0],
        duration: 1000,
        ease: "outExpo",
        delay: stagger(34, { start: 250 }),
      } as any);
    }

    if (eyebrowRef.current) {
      animate(eyebrowRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 700,
        delay: 150,
        ease: "outExpo",
      } as any);
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
        delay: 900,
        ease: "outExpo",
      } as any);
    }

    if (ctaRef.current) {
      animate(ctaRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        delay: stagger(120, { start: 1100 }),
        ease: "outBack",
      } as any);
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="hero-canvas absolute inset-0 w-full h-full" />

      {/* Blobs de color detrás del texto */}
      <div className="blob w-[40vw] h-[40vw] bg-cyan/40 top-[-10vw] left-[-5vw]" aria-hidden="true" />
      <div className="blob w-[35vw] h-[35vw] bg-magenta/40 bottom-0 right-0" aria-hidden="true" />

      {/* Velo de legibilidad detrás del texto */}
      <div className="hero-veil" aria-hidden="true" />

      <div className="container-wide relative z-10 px-6 md:px-10 w-full">
        <div ref={eyebrowRef} className="eyebrow text-cyan mb-6 flex items-center gap-3" data-anim>
          <span className="inline-block w-10 h-px bg-cyan" />
          Sublimación full-color · México
        </div>

        <h1
          ref={titleRef}
          className="font-display text-[clamp(3.2rem,12vw,11rem)] mb-2"
          data-anim
        >
          <span className="block text-stroke">Studio</span>
          <span className="block text-magenta glow-magenta">Ohana</span>
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-xl text-base md:text-lg text-[var(--ink-dim)] mt-8 mb-10 leading-relaxed"
          data-anim
        >
          {data.hero.subtitle} Playeras, tazas, gorras, termos y más — tu diseño,
          sin límites de color.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4" data-anim>
          <a href="#productos" className="btn-neon">
            {data.hero.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#contacto" className="btn-ghost">
            {data.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--ink-dim)]">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-cyan to-transparent animate-pulse" />
      </div>
    </section>
  );
}
