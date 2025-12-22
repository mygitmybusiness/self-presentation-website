"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaveText from "../typography/WaveText";

const wrapperVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.03,
    rotate: 1.5,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 12,
    },
  },
};

const panelVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Sketch() {
  const labelId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax
  const avatarRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="mx-auto max-w-full">
      <motion.div
        ref={containerRef}
        layout
        className={[
          "flex items-center justify-center",
          "flex-col md:flex-row-reverse",
          "transition-[gap] duration-300 ease-out",
        ].join(" ")}
        variants={wrapperVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* Aside panel */}
        <motion.div
          layout
          id={labelId}
          role="region"
          aria-label="About Dmytro"
          variants={panelVariants}
          className={[
            "mt-4 md:mt-0",
            "w-full p-5 md:p-6 md:mr-4 h-auto",
            "rounded-2xl backdrop-blur",
            // "bg-white/80 dark:bg-neutral-900/80",
            // "border border-neutral-200 dark:border-neutral-800",
            "shadow-sm dark:shadow-md",
            "opacity-100 translate-y-0 md:translate-x-0",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-5xl font-semibold leading-tight flex gap-[10px]">
                Hejka, i&apos;m{" "}
                <WaveText text="Dima" className="text-[3rem]" />
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
        </motion.div>
        {/* Avatar box - parallax with rotate/scale */}
        <motion.div
          layout
          variants={imageVariants}
          whileHover="hover"
          style={{ rotate: avatarRotate, scale: avatarScale }}
          className={[
            "relative rounded-full bg-white dark:bg-black",
            "ring-2 ring-black/10 dark:ring-white/20",
            "md:-translate-x-2",
            "transition-transform duration-500 ease-out will-change-transform",
            "p-2",
          ].join(" ")}
        >
          <Image
            src="/media/snap-sketch.png"
            height={400}
            width={400}
            alt="Dmytro Deinershtein"
            className="mx-auto aspect-square max-w-[350px] rounded-full border border-black object-contain dark:border-white"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
