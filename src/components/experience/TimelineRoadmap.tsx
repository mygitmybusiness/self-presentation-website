"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type MilestoneTone = "light" | "dark" | "accent";

export type TimelineMilestone = {
  id: string;
  indexLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  stack?: string[];
  achievements?: string[];
  side?: "left" | "right";
  tone?: MilestoneTone;
};

type Props = {
  title?: string;
  subtitle?: React.ReactNode;
  milestones: TimelineMilestone[];
  className?: string;
  splitAt?: "md" | "lg";
};

function cardClasses(tone: MilestoneTone) {
  switch (tone) {
    case "accent":
      return {
        card: "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white",
        inverted: true,
      };
    case "dark":
      return {
        card: "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 border-black dark:border-white",
        inverted: false,
      };
    default:
      return {
        card: "bg-white text-black dark:bg-black dark:text-white border-black dark:border-white",
        inverted: false,
      };
  }
}

function StackPill({ label }: { label: string }) {
  return (
    <li className="p-0 border rounded-[3px] border-white outline list-none">
      <span
        className={clsx(
          "text-m relative z-1 font-regular leading-snug",
          "bg-black text-white flex px-2 py-1",
          "dark:text-black dark:bg-white"
        )}
      >
        {label}
      </span>
    </li>
  );
}

export default function TimelineRoadmap({
  title = "Experience",
  subtitle,
  milestones,
  className,
  splitAt = "md",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(0);

  const isSplitMd = splitAt === "md";

  const splitOn = splitAt === "lg" ? "lg:flex" : "md:flex";

  const normalized = useMemo(() => {
    return milestones.map((m, idx) => {
      const side = m.side ?? (idx % 2 === 0 ? "left" : "right");
      const tone = m.tone ?? (idx % 3 === 1 ? "dark" : "light");
      return { ...m, side, tone };
    });
  }, [milestones]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-milestone]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const i = Number(el.dataset.index ?? "0");

          window.setTimeout(() => {
            el.dataset.visible = "true";
            setVisibleCount((prev) => Math.max(prev, i + 1));
          }, i * 90);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -120px 0px" }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [normalized.length]);

  useEffect(() => {
    const progressEl = progressRef.current;
    const container = listRef.current;
    if (!progressEl || !container) return;

    const update = () => {
      const total = normalized.length || 1;
      const p = Math.max(0, Math.min(1, visibleCount / total));
      const h = container.scrollHeight;
      progressEl.style.height = `${Math.round(h * p)}px`;
    };

    update();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visibleCount, normalized.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

      const root = rootRef.current;
      if (!root) return;

      const items = Array.from(
        root.querySelectorAll<HTMLElement>("[data-milestone]")
      );
      if (!items.length) return;

      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? items.findIndex((x) => x === active) : -1;

      e.preventDefault();

      const nextIndex =
        e.key === "ArrowDown"
          ? currentIndex < 0
            ? 0
            : Math.min(currentIndex + 1, items.length - 1)
          : currentIndex < 0
            ? items.length - 1
            : Math.max(currentIndex - 1, 0);

      const next = items[nextIndex];
      next.focus();
      next.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      ref={rootRef}
      className={clsx(
        "w-full mb-2 space-y-10 text-neutral-900 dark:text-neutral-50",
        className
      )}
    >
      <header className="pb-2 mb-0 space-y-1">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        {subtitle ? (
          <p className="text-sm md:text-base text-neutral-900 dark:text-neutral-50">
            {subtitle}
          </p>
        ) : null}
      </header>

      <div ref={listRef} className="relative pb-12 md:pb-16">
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 w-px bg-black/20 dark:bg-white/20 top-0"
          style={{ height: "100%" }}
        />

        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 w-px top-0 bg-accent"
          style={{ height: 0 }}
        />

        <div className="space-y-6">
          {normalized.map((m, idx) => {
            const t = cardClasses(m.tone);
            const isLeft = m.side === "left";

            const leftCol = clsx(
              "hidden",
              splitOn,
              splitAt === "md"
                ? "md:w-1/2 md:pr-10 md:text-right"
                : "lg:w-1/2 lg:pr-10 lg:text-right"
            );

            const rightCol = clsx(
              "w-full",
              splitOn,
              splitAt === "md" ? "md:w-1/2 md:pl-10" : "lg:w-1/2 lg:pl-10"
            );

            const card = (
              <div
                className={clsx(
                  "rounded-[3px] p-4 md:p-5 border",
                  t.card,
                  "transition-transform duration-300 ease-out"
                )}
              >
                <div
                  className={clsx(
                    "flex items-start gap-3 mb-4",
                    isLeft ? "md:justify-end md:flex-row-reverse" : "justify-start"
                  )}
                >
                  <span
                    className={clsx(
                      "shrink-0 font-bold text-sm px-2 py-1 rounded-[3px]",
                      t.inverted
                        ? "bg-white text-black dark:bg-black dark:text-white"
                        : "bg-black text-white dark:bg-white dark:text-black"
                    )}
                  >
                    {m.indexLabel}
                  </span>

                  <div className={clsx(isLeft ? "md:text-right" : "text-left")}>
                    <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                      {m.eyebrow}
                    </p>
                    <h4
                      className={clsx(
                        "mt-1 text-base md:text-lg font-semibold leading-snug",
                        "w-max max-w-full px-2 py-1 rounded-[3px]",
                        t.inverted
                          ? "bg-white text-black dark:bg-black dark:text-white"
                          : "bg-black text-white dark:bg-white dark:text-black",
                        isLeft && "md:ml-auto"
                      )}
                    >
                      {m.title}
                    </h4>
                  </div>
                </div>

                <p
                  className={clsx(
                    "text-sm md:text-base leading-relaxed",
                    isLeft ? "md:text-right" : "text-left"
                  )}
                >
                  {m.description}
                </p>

                {m.stack && m.stack.length > 0 ? (
                  <ul
                    className={clsx(
                      "mt-3 flex flex-wrap gap-2",
                      isLeft ? "md:justify-end" : "justify-start"
                    )}
                  >
                    {m.stack.map((tech) => (
                      <StackPill key={tech} label={tech} />
                    ))}
                  </ul>
                ) : null}

                {m.achievements && m.achievements.length > 0 ? (
                  <ul
                    className={clsx(
                      "mt-3 space-y-1.5 text-sm",
                      isLeft ? "md:text-right" : "text-left"
                    )}
                  >
                    {m.achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );

            return (
              <article
                key={m.id}
                data-milestone
                data-index={idx}
                tabIndex={0}
                className={clsx(
                  "relative outline-none transition-opacity duration-500",
                  "opacity-0 data-[visible=true]:opacity-100",
                  "focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
                )}
              >
                <div
                  className={clsx(
                    "relative flex items-stretch flex-col gap-5",
                    splitOn,
                    splitAt === "md" ? "md:flex-row md:gap-0" : "lg:flex-row lg:gap-0"
                  )}
                >
                  <div className={leftCol}>{isLeft ? card : null}</div>

                  <div
                    className={clsx(
                      "hidden",
                      isSplitMd ? "md:block" : "lg:block",
                      "absolute top-6 left-1/2 -translate-x-1/2"
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className={clsx(
                        "h-3 w-3 rounded-[3px] border-2 border-white dark:border-black",
                        m.tone === "accent" ? "bg-accent" : "bg-black dark:bg-white"
                      )}
                    />
                  </div>

                  <div className={rightCol}>
                    <div className={clsx(isLeft ? "md:hidden lg:hidden" : "")}>
                      {card}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
