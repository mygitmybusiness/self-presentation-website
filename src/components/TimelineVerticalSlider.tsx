// components/TimelineVerticalSlider.tsx
"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import clsx from "clsx";

export type TimelineItem = {
  id: string;
  title: string;       // e.g. "Launch v1"
  subtitle?: string;   // e.g. "Jan 2024"
  content: string;     // paragraph or short text
};

type Props = {
  items: TimelineItem[];
  initialIndex?: number;
  onChange?(index: number, item: TimelineItem): void;
  /** Height of the timeline area (e.g. "28rem" | "70vh") */
  height?: string;
};

export default function TimelineVerticalSlider({
  items,
  initialIndex = 0,
  onChange,
  height = "32rem",
}: Props) {
  const clampedInitial = Math.min(Math.max(initialIndex, 0), Math.max(0, items.length - 1));
  const [index, setIndex] = useState(clampedInitial);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const max = Math.max(items.length - 1, 0);

  const handleSetIndex = useCallback(
    (v: number) => {
      const val = Math.min(Math.max(v, 0), max);
      setIndex(val);
      onChange?.(val, items[val]);
    },
    [max, items, onChange]
  );

  // optional: scroll wheel nudges slider up/down
  // useEffect(() => {
  //   const el = trackRef.current;
  //   if (!el) return;
  //   const onWheel = (e: WheelEvent) => {
  //     // small, deliberate steps
  //     if (Math.abs(e.deltaY) < 5) return;
  //     e.preventDefault();
  //     handleSetIndex(index + (e.deltaY > 0 ? 1 : -1));
  //   };
  //   el.addEventListener("wheel", onWheel, { passive: false });
  //   return () => el.removeEventListener("wheel", onWheel);
  // }, [index, handleSetIndex]);

  const progressPct = useMemo(
    () => (max === 0 ? 0 : (index / max) * 100),
    [index, max]
  );

  if (items.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
        No timeline items.
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex justify-between"
      )}
      style={{ minHeight: height }}
    >
      {/* LEFT: Track + dots + vertical slider */}
      <div className="relative min-w-[100px]">
        <div
          ref={trackRef}
          className={clsx(
            "relative flex h-full max-h-full w-full max-w-max select-none",
            "items-stretch gap-4"
          )}
          aria-label="Timeline"
        >
          {/* Vertical track */}
          <div className="relative w-2">
            {/* Track line */}
            <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />

            {/* Progress fill (bottom → up) */}
            <div
              className="absolute left-1/2 bottom-0 w-[3px] -translate-x-1/2 rounded bg-neutral-900 dark:bg-white transition-[height] duration-300"
              style={{ height: `${progressPct}%` }}
              aria-hidden
            />

            {/* Dots */}
            <ul className="absolute inset-0 m-0 list-none p-0">
              {items.map((item, i) => {
                const active = i === index;

                // Position of this dot along the track (0% = top, 100% = bottom)
                const posPct = max > 0 ? (1 - i / max) * 100 : 0;

                // Filled area extends from bottom up to (100% - progressPct) from the top.
                // Include a tiny epsilon so a dot right on the boundary counts as "passed".
                const withinFill = max > 0 ? posPct >= (100 - progressPct) - 0.001 : false;

                const passed = !active && withinFill;

                return (
                  <li
                    key={item.id}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${posPct}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSetIndex(i)}
                      aria-current={active ? "step" : undefined}
                      aria-label={`${item.title}${item.subtitle ? ` — ${item.subtitle}` : ""}`}
                      className={clsx(
                        "relative z-10 block h-4 w-4 rounded-full border transition-transform",
                        active &&
                        "scale-110 bg-neutral-900 border-neutral-900 dark:bg-white dark:border-white",
                        passed &&
                        "bg-neutral-700 border-neutral-700 dark:bg-neutral-300 dark:border-neutral-300",
                        !active && !passed &&
                        "bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700 hover:scale-105"
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </div>


          {/* Labels (titles / subtitles) */}
          <div className="relative flex-1 py-1">
            {items.map((item, i) => {
              const active = i === index;
              return (
                <div
                  key={item.id}
                  className={clsx("absolute -translate-y-1/2 transition-opacity", active ? "opacity-100" : "opacity-60")}
                  style={{
                    top: max > 0 ? `${(1 - i / max) * 100}%` : "0%",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSetIndex(i)}
                    aria-current={active ? "true" : undefined}
                    aria-label={`${item.title}${item.subtitle ? ` — ${item.subtitle}` : ""}`}
                    className={clsx(
                      // layout
                      "block text-left",
                      // pill
                      "rounded-2xl px-3 py-1.5 text-sm shadow-sm ring-1 transition",
                      active
                        ? "bg-white ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800"
                        : "bg-neutral-50 ring-neutral-200 hover:bg-neutral-100 dark:bg-neutral-950 dark:ring-neutral-800 dark:hover:bg-neutral-900",
                      // focus
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-900"
                    )}
                  >
                    <div className="font-medium leading-none">{item.title}</div>
                    {item.subtitle && (
                      <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {item.subtitle}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* RIGHT: Content panel */}
      <div
        className={clsx(
          "relative rounded-2xl border p-5 md:p-6",
          "bg-white/60 backdrop-blur ring-1 ring-inset ring-neutral-200",
          "dark:bg-neutral-900/60 dark:ring-neutral-800"
        )}
      >
        <header className="mb-3">
          <h3 className="text-xl font-semibold tracking-tight">
            {items[index].title}
          </h3>
          {items[index].subtitle && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {items[index].subtitle}
            </p>
          )}
        </header>
        <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
          {items[index].content}
        </p>

        {/* Prev / Next controls */}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => handleSetIndex(index - 1)}
            disabled={index === 0}
            className={clsx(
              "rounded-xl px-3 py-2 text-sm ring-1 transition",
              index === 0
                ? "opacity-50 ring-neutral-200 dark:ring-neutral-800 cursor-not-allowed"
                : "hover:bg-neutral-50 ring-neutral-200 dark:ring-neutral-800 dark:hover:bg-neutral-900"
            )}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => handleSetIndex(index + 1)}
            disabled={index === max}
            className={clsx(
              "rounded-xl px-3 py-2 text-sm ring-1 transition",
              index === max
                ? "opacity-50 ring-neutral-200 dark:ring-neutral-800 cursor-not-allowed"
                : "hover:bg-neutral-50 ring-neutral-200 dark:ring-neutral-800 dark:hover:bg-neutral-900"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
