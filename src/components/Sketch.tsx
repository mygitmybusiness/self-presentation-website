"use client";

import Image from "next/image";
import { useId } from "react";

export default function Sketch() {
  const labelId = useId();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Wrapper keeps content centered on both layouts */}
      <div
        className={[
          "flex items-center justify-center",
          "flex-col md:flex-row",
          "transition-[gap] duration-300 ease-out",
        ].join(" ")}
      >
        {/* Image */}
        <div
          className={[
            "relative rounded-full bg-white dark:bg-black",
            "ring-black/10 dark:ring-white/20",
            "md:-translate-x-2",
            "transition-transform duration-500 ease-out will-change-transform",
          ].join(" ")}
        >
          <Image
            src="/media/snap-sketch.png"
            height={400}
            width={400}
            alt="Dmytro Deinershtein"
            className="rounded-full aspect-square object-contain mx-auto border border-black dark:border-white"
            priority
          />
        </div>

        {/* Aside panel (always visible) */}
        <div
          id={labelId}
          role="region"
          aria-label="About Dmytro"
          className={[
            "bg-white dark:bg-black mt-4 md:mt-0",
            "w-full md:w-80 p-5 md:p-6 md:ml-4 max-w-xl h-auto",
            "rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur",
            "opacity-100 translate-y-0 md:translate-x-0", // always visible
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold leading-tight">Dmytro Deinershtein</h1>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                Senior Software Engineer
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm md:text-[15px] leading-relaxed">
            <p>
              I build accessible, fast, and elegant web experiences. Specialized in E-commerce, React, TypeScript,
              and performance tuning. Fan of WCAG, design systems, and data-driven UX.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>React / Next.js · TypeScript · Node</li>
              <li>Magento 2 headless integrations</li>
              <li>WCAG 2.2, ARIA, Playwright testing</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border px-2 py-1">Poznań, PL</span>
            <span className="rounded-full border px-2 py-1">Open to mentoring</span>
            <span className="rounded-full border px-2 py-1">Remote-friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
