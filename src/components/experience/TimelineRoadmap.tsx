// ✅ FIX: no duplication on mobile
// Idea: render card ONLY ONCE.
// - Mobile: always render card in the right column (which is full-width on mobile)
// - Desktop: render card either left OR right depending on `side`
// This removes the `md:hidden` fallback that was duplicating left-side items on mobile.

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type MilestoneTone = "light" | "dark" | "accent";

export type TimelineMilestone = {
  id: string;
  indexLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  side?: "left" | "right";
  tone?: MilestoneTone;
};

type Props = {
  label?: string;
  headingTop?: string;
  headingMain?: string;
  headingSecondary?: string;
  headingSub?: string;
  subtitle?: React.ReactNode;
  milestones: TimelineMilestone[];
  className?: string;
  splitAt?: "md" | "lg";
};

const COLORS = {
  base0: "#000",
  base1: "#2a2a2a",
  base2: "#222121",
  paper: "#fafcfc",
  soft: "#e5e4e3",
  accentA: "#00d3f3",
  accentB: "#00bc7d",
};

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function toneClasses(tone: MilestoneTone) {
  switch (tone) {
    case "dark":
      return {
        card:
          "bg-[#222121] text-[#fafcfc] shadow-[0_10px_40px_rgba(0,0,0,0.14)]",
        eyebrow: "text-[#e5e4e3]/80",
        text: "text-[#e5e4e3]/90",
        badgeWrap: "bg-[#fafcfc]",
        badgeText: "text-[#000]",
        dot: "bg-[#2a2a2a]",
        border: "border-transparent",
      };
    case "accent":
      return {
        card:
          "bg-[#000] text-[#fafcfc] shadow-[0_10px_40px_rgba(0,0,0,0.18)]",
        eyebrow: "text-[#e5e4e3]/80",
        text: "text-[#e5e4e3]/90",
        badgeWrap: "bg-[#fafcfc]",
        badgeText: "text-[#000]",
        dot: "bg-[#00d3f3]",
        border: "border-transparent",
      };
    default:
      return {
        card:
          "bg-[#fafcfc] text-[#000] shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
        eyebrow: "text-[#2a2a2a]/70",
        text: "text-[#2a2a2a]/80",
        badgeWrap: "bg-[#000]",
        badgeText: "text-[#fafcfc]",
        dot: "bg-[#2a2a2a]",
        border: "border-[#e5e4e3]",
      };
  }
}

export default function TimelineRoadmap({
  headingTop,
  headingMain = "Companies",
  headingSecondary = "I worked at",
  headingSub = "2012 - 2025",
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
  const isSplitLg = splitAt === "lg";

  const splitOn =
    splitAt === "lg"
      ? "lg:flex"
      : "md:flex";

  const normalized = useMemo(() => {
    return milestones.map((m, idx) => {
      const side = m.side ?? (idx % 2 === 0 ? "left" : "right");
      const tone = m.tone ?? (idx % 3 === 1 ? "dark" : "light");
      return { ...m, side, tone };
    });
  }, [milestones]);

  // Observe milestones and animate in
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

  // Progress line
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

  // Keyboard navigation
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
    <section ref={rootRef} className={cx(className)}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18px 18px, currentColor 1.5px, transparent 0), radial-gradient(circle at 70px 70px, currentColor 1.5px, transparent 0)",
              backgroundSize: "96px 96px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-2 w-full py-16 md:py-24 text-center">
          <div className="space-y-7">
            <div className="space-y-3">
              {headingTop ? (
                <p className="text-sm tracking-wide text-[#2a2a2a]/70 dark:text-[#e5e4e3]/70">
                  {headingTop}
                </p>
              ) : null}

              <h1 className="font-extrabold tracking-[-0.04em] leading-[1.05]">
                <span className="block text-5xl md:text-7xl lg:text-8xl">
                  {headingMain}
                </span>
                <span className="block text-4xl md:text-6xl lg:text-7xl text-[#2a2a2a]/70 dark:text-[#e5e4e3]/80">
                  {headingSecondary}
                </span>
                <span className="block mt-3 text-2xl md:text-4xl lg:text-5xl font-light text-[#2a2a2a]/45 dark:text-[#e5e4e3]/50">
                  {headingSub}
                </span>
              </h1>
            </div>

            {subtitle ? (
              <div className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-[#2a2a2a]/75 dark:text-[#e5e4e3]/80">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Timeline */}
      <main className="relative max-w-7xl mx-auto px-2 w-full pb-20 md:pb-28">
        <div ref={listRef} className="relative">
          {/* Base line */}
          <div
            aria-hidden="true"
            className={cx(
              "absolute left-1/2 -translate-x-1/2 w-px",
              "bg-[#e5e4e3] dark:bg-[#2a2a2a]",
              "top-0"
            )}
            style={{ height: "100%" }}
          />

          {/* Progress line */}
          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 w-px top-0"
            style={{
              height: 0,
              background:
                "linear-gradient(180deg, #00d3f3 0%, #00bc7d 70%, transparent 100%)",
            }}
          />

          <div className="space-y-6">
            {normalized.map((m, idx) => {
              const t = toneClasses(m.tone);
              const isLeft = m.side === "left";

              // Left column: desktop only
              const leftCol = cx(
                "hidden",
                splitOn,
                splitAt === "md"
                  ? "md:w-1/2 md:pr-10 md:text-right"
                  : "lg:w-1/2 lg:pr-10 lg:text-right"
              );

              // Right column: ALWAYS visible on mobile, half-width on desktop
              const rightCol = cx(
                "w-full",
                splitOn,
                splitAt === "md" ? "md:w-1/2 md:pl-10" : "lg:w-1/2 lg:pl-10"
              );

              const card = (
                <div
                  className={cx(
                    "rounded-2xl p-4 md:p-7 border",
                    t.card,
                    t.border,
                    "transition-transform duration-300 ease-out will-change-transform"
                  )}
                >
                  <div
                    className={cx(
                      "flex items-center gap-4 mb-5",
                      // align header on desktop; keep mobile left aligned
                      isLeft ? "md:justify-end lg:justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cx(
                        "min-h-12 min-w-12 rounded-xl flex items-center justify-center font-bold text-lg",
                        t.badgeWrap
                      )}
                    >
                      <span className={t.badgeText}>{m.indexLabel}</span>
                    </div>

                    <div className={cx(isLeft ? "md:text-right lg:text-right" : "text-left")}>
                      <div
                        className={cx(
                          "text-[11px] font-semibold uppercase tracking-[0.18em]",
                          t.eyebrow
                        )}
                      >
                        {m.eyebrow}
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-[-0.02em] mt-1">
                        {m.title}
                      </h3>
                    </div>
                  </div>

                  <p className={cx("text-base md:text-lg leading-relaxed", t.text)}>
                    {m.description}
                  </p>
                </div>
              );

              return (
                <article
                  key={m.id}
                  data-milestone
                  data-index={idx}
                  tabIndex={0}
                  className={cx(
                    "relative outline-none transition-opacity duration-500",
                    "opacity-0 data-[visible=true]:opacity-100",
                    "focus-visible:ring-2 focus-visible:ring-offset-4",
                    "ring-[#00d3f3]",
                    "ring-offset-[#fafcfc] dark:ring-offset-[#000]"
                  )}
                >
                  <div
                    className={cx(
                      "relative flex items-stretch flex-col gap-5",
                      splitOn,
                      splitAt === "md" ? "md:flex-row md:gap-0" : "lg:flex-row lg:gap-0"
                    )}
                  >
                    {/* LEFT: render card only on desktop and only for left items */}
                    <div className={leftCol}>{isLeft ? card : null}</div>

                    {/* Dot + connector (desktop only) */}
                    <div
                      className={cx(
                        "hidden",
                        isSplitMd ? "md:block" : "lg:block",
                        "absolute top-6 left-1/2 -translate-x-1/2"
                      )}
                    >
                      <div
                        aria-hidden="true"
                        className={cx(
                          "h-6 w-6 rounded-full border-4 shadow-[0_10px_18px_rgba(0,0,0,0.12)]",
                          "border-[#fafcfc] dark:border-[#000]",
                          "opacity-0 scale-90 data-[visible=true]:opacity-100 data-[visible=true]:scale-100",
                          "transition-all duration-500 ease-out"
                        )}
                        data-visible={String(true)}
                        style={{
                          backgroundColor:
                            m.tone === "accent"
                              ? COLORS.accentA
                              : m.tone === "dark"
                                ? COLORS.base1
                                : COLORS.base1,
                        }}
                      />
                    </div>

                    {/* RIGHT: mobile ALWAYS; desktop only for right items */}
                    <div className={rightCol}>
                      {/* ✅ This is the key line: on mobile always show card.
                          On desktop: show only if it's a right-side item. */}
                      <div className={cx(isLeft ? "md:hidden lg:hidden" : "")}>
                        {card}
                      </div>
                    </div>
                  </div>

                  {/* connector to the center pole (desktop) */}
                  <div
                    aria-hidden="true"
                    className={cx(
                      "hidden",
                      isSplitMd ? "md:block" : "lg:block",
                      "absolute top-[28px] left-1/2 -translate-x-1/2"
                    )}
                  >
                    <div
                      className={cx(
                        "h-px",
                        isSplitMd ? "w-24" : "w-28",
                        isLeft
                          ? "-translate-x-[calc(50%+12px)]"
                          : "translate-x-[calc(50%+12px)]"
                      )}
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(0,0,0,0.35) 1px, transparent 1px)",
                        backgroundSize: "7px 2px",
                        backgroundRepeat: "repeat-x",
                        opacity: 0.55,
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="pt-16 md:pt-20 text-center">
          <p className="text-base md:text-lg text-[#2a2a2a]/70 dark:text-[#e5e4e3]/70">
            Excellence is a journey, not a destination.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#2a2a2a]/60 dark:text-[#e5e4e3]/60 max-w-2xl mx-auto">
            Each milestone builds upon the last. Practice consistently and ship projects.
          </p>
        </div>
      </main>
    </section>
  );
}
