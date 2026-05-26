"use client";

import clsx from "clsx";
import React, { useEffect, useMemo, useRef } from "react";

type DonutAsciiProps = {
  className?: string;
  /** max FPS, default 30 */
  fps?: number;
  /** ASCII canvas width (chars), default 64 */
  width?: number;
  /** ASCII canvas height (chars), default 42 */
  height?: number;
  /** visual scale multiplier (affects projection), default 1 */
  scale?: number;
  /** rotation speed multiplier, default 1 */
  speed?: number;
  /** accent color for glyphs, default "#00d3f3" */
  color?: string;
  /** background surface toggle, default true */
  withSurface?: boolean;
};

/**
 * Optimized React version:
 * - uses requestAnimationFrame with FPS cap
 * - avoids per-char <span> creation (massive DOM) -> uses a <pre> and updates textContent
 * - uses ANSI-free shaded characters and simple light model
 * - pauses when tab hidden
 * - resizes projection via props (width/height/scale)
 *
 * If you *need* per-character color gradients later: render to <canvas> instead.
 */
export default function DonutAscii({
  className = "",
  fps = 20,
  width = 64,
  height = 36,
  scale = 0.16,
  speed = 2,
  withSurface = true,
}: DonutAsciiProps) {
  const preRef = useRef<HTMLPreElement | null>(null);

  const dims = useMemo(() => {
    const w = Math.max(24, Math.floor(width));
    const h = Math.max(16, Math.floor(height));
    return { w, h };
  }, [width, height]);

  useEffect(() => {
    let raf = 0;
    let running = true;

    // rotation angles
    let A = 0;
    let B = 0;

    // torus radii
    const R1 = 1; // tube radius
    const R2 = 2; // donut radius (base)

    // screen buffers
    const size = dims.w * dims.h;
    const chars = new Array<string>(size);
    const zbuf = new Float32Array(size);

    // shading ramp (classic donut)
    const charsMap = ".,-~:;=!*#$@";
    const charsMapReversed = [...charsMap].reverse().join("");
    const rampStr = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? charsMap : charsMapReversed;
    const ramp = Array.from(rampStr);

    // FPS cap
    const frameInterval = 1000 / Math.max(1, fps);
    let last = 0;

    // pause on hidden tab
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // constants; K2 shifts donut away from camera
    // K1 scales to your ASCII "pixels"
    const K2 = 5;
    const K1 = (dims.w * 12) / (R1 + R2); // tuned scaling (was 500/(R1+R2) for fixed size)

    // step sizes (quality/perf knobs)
    const stepJ = 0.04; // outer
    const stepI = 0.03; // inner

    const loop = (t: number) => {
      if (!running) return;

      if (t - last < frameInterval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      last = t;

      // clear buffers
      zbuf.fill(0);
      for (let i = 0; i < size; i++) chars[i] = " ";

      const sinA = Math.sin(A);
      const cosA = Math.cos(A);
      const sinB = Math.sin(B);
      const cosB = Math.cos(B);

      // render
      for (let j = 0; j < Math.PI * 2; j += stepJ) {
        const sinJ = Math.sin(j);
        const cosJ = Math.cos(j);

        for (let i = 0; i < Math.PI * 2; i += stepI) {
          const sinI = Math.sin(i);
          const cosI = Math.cos(i);

          // point on torus before rotation
          const circleX = R2 + R1 * cosI; // distance from donut center
          const circleY = R1 * sinI;

          // 3D rotation (A around X, B around Z-ish)
          const x = circleX * (cosB * cosJ + sinA * sinB * sinJ) - circleY * cosA * sinB;
          const y = circleX * (sinB * cosJ - sinA * cosB * sinJ) + circleY * cosA * cosB;
          const z = K2 + cosA * circleX * sinJ + circleY * sinA;

          const ooz = 1 / z;

          // projection
          const xp = Math.floor(dims.w / 2 + scale * K1 * ooz * x);
          const yp = Math.floor(dims.h / 2 - scale * (K1 * 0.55) * ooz * y);

          if (xp < 0 || xp >= dims.w || yp < 0 || yp >= dims.h) continue;

          const idx = xp + dims.w * yp;

          // luminance (dot of normal with light)
          // approximate normal on torus (classic formula)
          const L =
            cosJ * cosI * sinB -
            cosA * cosI * sinJ -
            sinA * sinI +
            cosB * (cosA * sinI - cosI * sinA * sinJ);

          if (L <= 0) continue;

          if (ooz > zbuf[idx]) {
            zbuf[idx] = ooz;
            const lum = Math.max(0, Math.min(1, L));
            const shade = Math.min(ramp.length - 1, Math.floor(lum * ramp.length));
            chars[idx] = ramp[shade] ?? ramp[0];
          }
        }
      }

      // compose output
      // (string builder is faster than innerHTML spans, and <pre> keeps monospace layout)
      let out = "";
      for (let p = 0; p < size; p++) {
        out += chars[p];
        if ((p + 1) % dims.w === 0) out += "\n";
      }

      if (preRef.current) {
        // textContent avoids HTML parsing and is safer
        preRef.current.textContent = out;
      }

      // advance angles
      A += 0.04 * speed;
      B += 0.02 * speed;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, [dims.h, dims.w, fps, scale, speed]);

  return (
    <section className={["w-full", className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="max-w-7xl mx-auto px-2 lg:p-0 w-full overflow-hidden">
        <div className="overflow-hidden">
          <div className="flex items-center justify-center h-min">
            <pre
              ref={preRef}
              className={clsx(
                "select-none max-w-[100vw]",
                "leading-[0.9] font-bold text-md sm:text-lx md:text-3xl",
                "font-mono text-neutral-200 dark:text-neutral-900 whitespace-pre",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
