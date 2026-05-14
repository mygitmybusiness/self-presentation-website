"use client";

import Image from "next/image";

export default function MainInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image className="mx-auto" alt="blabla" src="/media/snap-sketch.png" width="300" height="300" />
      <div className="mx-auto max-w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-5xl font-semibold leading-tight flex gap-[10px]">
              Hej, i&apos;m Dima
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
              Senior Software Engineer
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm md:text-[15px] leading-relaxed">
          <p>
            I build accessible, fast, and elegant web experiences. Specialized
            in E-commerce, React, TypeScript, and performance tuning. Fan of
            WCAG, design systems, and data-driven UX.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>React / Next.js · TypeScript · Node</li>
            <li>Magento 2 headless integrations</li>
            <li>WCAG 2.2, ARIA, Playwright testing</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border px-2 py-1 border-neutral-300 dark:border-neutral-700">
            Poznań, PL
          </span>
          <span className="rounded-full border px-2 py-1 border-neutral-300 dark:border-neutral-700">
            Open to mentoring
          </span>
          <span className="rounded-full border px-2 py-1 border-neutral-300 dark:border-neutral-700">
            Remote-friendly
          </span>
        </div>
      </div>
    </div>
  );
}
