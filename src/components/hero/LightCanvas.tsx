"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];

type Light = {
  x: number;
  y: number;
  /** Depth 0..1 (1 = closest to viewer). */
  z: number;
  /** Glow radius. */
  r: number;
  color: RGB;
  vx: number;
  vy: number;
};

const PALETTE: RGB[] = [
  [57, 168, 165], // electric teal
  [40, 126, 130], // teal
  [246, 244, 239], // warm white
  [18, 62, 120], // brand blue
];

/**
 * The signature "event-light installation": drifting, softly glowing points of
 * light that respond to cursor position (parallax by depth) and scroll
 * velocity (a gentle sweep). Rendered on a 2D canvas with radial gradients —
 * visually a "lighting environment" without the weight of a full WebGL scene.
 * Respects prefers-reduced-motion (draws one static frame).
 */
export default function LightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const lights: Light[] = [];
    let mx = 0; // normalized cursor -1..1
    let my = 0;
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    let raf = 0;
    let t = 0;

    const spawn = () => {
      lights.length = 0;
      const count = Math.max(8, Math.min(40, Math.round(Math.min(w, h) / 90)));
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        lights.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: (0.6 + Math.random() * 1.6) * (1 - z * 0.4),
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = Math.max(-1, Math.min(1, (y - lastScroll) / 200));
      lastScroll = y;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const l of lights) {
        l.vx += Math.sin(t * 0.001 + l.z * 6) * 0.002;
        l.vy += Math.cos(t * 0.001 + l.z * 6) * 0.002;
        l.x += l.vx;
        l.y += l.vy;
        if (l.x < -24) l.x = w + 24;
        if (l.x > w + 24) l.x = -24;
        if (l.y < -24) l.y = h + 24;
        if (l.y > h + 24) l.y = -24;

        // Cursor parallax (deeper lights move less) + scroll sweep.
        const px = l.x + mx * 30 * (1 - l.z) * 0.5;
        const py = l.y + my * 30 * (1 - l.z) * 0.5 + scrollVel * 60 * l.z;

        const [r, g, b] = l.color;
        const alpha = 0.16 + l.z * 0.34;
        const radius = l.r * 8;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      t++;
      if (!reduced) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
