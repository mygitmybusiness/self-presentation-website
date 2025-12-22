"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export type OverviewLevel = 1 | 2 | 3 | 4 | 5;

export type OverviewItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
  level?: OverviewLevel;
  tags?: string[];
};

export type OverviewSection = {
  id: string;
  title: string;
  subtitle?: string;
  layout?: "list" | "grid";
  columns?: number;

  items: OverviewItem[];
};

export type OverviewConfig = {
  heading?: string;
  subheading?: string;
  sections: OverviewSection[];
};

type Props = {
  config: OverviewConfig;
  className?: string;
};

const levelToLabel: Record<OverviewLevel, string> = {
  1: "Basic",
  2: "Intermediate",
  3: "Good",
  4: "Advanced",
  5: "Expert",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -4,
    scale: 1.01,
    boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

function getColumnsClass(columns: number | undefined) {
  const cols = columns ?? 3;

  // Masonry layout using CSS columns
  // 1 col on mobile, 2 on sm, 3 on lg by default
  if (cols === 1) return "columns-1";
  if (cols === 2) return "columns-1 sm:columns-2";
  if (cols === 4) return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4";

  // default: 3
  return "columns-1 sm:columns-2 lg:columns-3";
}

export default function SkillsOverview({ config, className = "" }: Props) {
  const { heading, subheading, sections } = config;

  return (
    <section
      className={clsx(
        "w-full space-y-10 rounded-3xl bg-gradient-to-b from-white/70 to-white/40 p-4 text-neutral-900 shadow-sm backdrop-blur",
        "dark:from-neutral-950/80 dark:to-neutral-950/40 dark:text-neutral-50 dark:shadow-lg",
        className
      )}
    >
      {(heading || subheading) && (
        <header className="mb-2 space-y-1 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          {heading && (
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
              {subheading}
            </p>
          )}
        </header>
      )}

      {sections.map((section) => (
        <motion.section
          key={section.id}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-4"
        >
          {/* Section header */}
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                {section.subtitle}
              </p>
            )}
          </div>

          {/* Masonry container */}
          <div
            className={clsx(
              "mt-2 [column-fill:balance] sm:mt-3",
              getColumnsClass(section.columns)
            )}
          >
            {section.items.map((item, index) => (
              <motion.article
                key={item.id}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                className={clsx(
                  // masonry requires margin-bottom instead of gap
                  "mb-4 break-inside-avoid rounded-2xl border shadow-sm backdrop-blur-sm",
                  // dark/light
                  "border-neutral-200 bg-white/80 text-neutral-900",
                  "dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-50",
                  // condensed on mobile, roomier on larger screens
                  "p-3 text-xs sm:p-4 sm:text-sm lg:p-5 lg:text-base"
                )}
              >
                <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-semibold leading-snug">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-[11px] text-neutral-500 sm:text-xs dark:text-neutral-400">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {item.meta && (
                    <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 sm:text-xs dark:text-neutral-500">
                      {item.meta}
                    </p>
                  )}
                </header>

                {item.level && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800/80">
                      <div
                        className={clsx(
                          "h-1.5 rounded-full",
                          "bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400",
                          "dark:from-sky-500 dark:via-cyan-500 dark:to-emerald-500"
                        )}
                        style={{ width: `${(item.level / 5) * 100}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      {levelToLabel[item.level]}
                    </span>
                  </div>
                )}

                {item.description && (
                  <p className="mt-2 leading-snug text-neutral-700 dark:text-neutral-200">
                    {item.description}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={clsx(
                          "rounded-full border px-2 py-0.5 text-[11px]",
                          "border-neutral-200 bg-white/70 text-neutral-600",
                          "dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-300"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.section>
      ))}
    </section>
  );
}
