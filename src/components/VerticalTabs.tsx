"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";

/**
 * VerticalTabs
 * -------------------------------------
 * Accessible vertical tabs with buttons on the left and animated panels on the right.
 * - Keyboard: ArrowUp/ArrowDown to move between tabs, Home/End jump, Enter/Space to activate
 * - Smooth transitions: fade + slight slide
 * - Tailwind-only animations (no external deps)
 * - Works in Next.js App Router ("use client")
 *
 * Usage example:
 * <VerticalTabs
 *   items={[
 *     { label: "Overview", content: <p>Overview content</p> },
 *     { label: "Features", content: <p>Features content</p> },
 *     { label: "Pricing", content: <p>Pricing content</p> },
 *   ]}
 *   initialIndex={0}
 * />
 */

export type VerticalTabItem = {
  label: string;
  /** Optional description shown under label */
  description?: string;
  /** Panel content */
  content: React.ReactNode;
  /** Optional left icon */
  icon?: React.ReactNode;
  /** Optional disabled state */
  disabled?: boolean;
};

export function VerticalTabs({
  items,
  initialIndex = 0,
  className,
  panelClassName,
}: {
  items: VerticalTabItem[];
  initialIndex?: number;
  className?: string;
  panelClassName?: string;
}) {
  const [active, setActive] = useState(() => {
    const safe = Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1));
    // Skip disabled if initial points to one
    const firstEnabled = items.findIndex((t, i) => !t.disabled && i >= safe);
    return firstEnabled === -1 ? 0 : firstEnabled;
  });

  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    // Ensure refs array size tracks items
    refs.current = refs.current.slice(0, items.length);
  }, [items.length]);

  function focusAt(i: number) {
    const btn = refs.current[i];
    if (btn) btn.focus();
  }

  function nextEnabled(from: number, dir: 1 | -1) {
    const len = items.length;
    for (let step = 1; step <= len; step++) {
      const idx = (from + dir * step + len) % len;
      if (!items[idx]?.disabled) return idx;
    }
    return from; // all disabled (unlikely)
  }

  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-4 md:gap-6 w-full", className)}>
      {/* Tabs (left) */}
      <div
        role="tablist"
        aria-orientation="vertical"
        className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-2 md:p-3 space-y-2 sticky top-4 self-start"
      >
        {items.map((item, i) => {
          const id = `${baseId}-tab-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          const selected = i === active;
          const disabled = !!item.disabled;
          return (
            <button
              key={id}
              id={id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              aria-disabled={disabled || undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => !disabled && setActive(i)}
              onKeyDown={(e) => {
                if (disabled) return;
                switch (e.key) {
                  case "ArrowUp": {
                    e.preventDefault();
                    const idx = nextEnabled(i, -1);
                    focusAt(idx);
                    break;
                  }
                  case "ArrowDown": {
                    e.preventDefault();
                    const idx = nextEnabled(i, 1);
                    focusAt(idx);
                    break;
                  }
                  case "Home": {
                    e.preventDefault();
                    const idx = nextEnabled(-1, 1); // from -1 moves to first enabled
                    focusAt(idx);
                    break;
                  }
                  case "End": {
                    e.preventDefault();
                    const idx = nextEnabled(items.length - 1, -1);
                    focusAt(idx);
                    break;
                  }
                  case "Enter":
                  case " ": {
                    e.preventDefault();
                    setActive(i);
                    break;
                  }
                }
              }}
              className={clsx(
                "w-full text-left rounded-xl px-3.5 py-3 md:px-4 md:py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500/60 dark:focus-visible:ring-indigo-400/60 focus-visible:ring-offset-transparent",
                "border transition-colors",
                selected
                  ? "bg-indigo-600/10 dark:bg-indigo-400/10 border-indigo-500/30 dark:border-indigo-400/30"
                  : "bg-white/40 dark:bg-zinc-800/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 border-black/5 dark:border-white/10",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-start gap-3">
                {item.icon && <span className="mt-0.5 shrink-0" aria-hidden>{item.icon}</span>}
                <span className="flex-1 min-w-0">
                  <span className="block font-medium leading-none truncate">{item.label}</span>
                  {item.description && (
                    <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                      {item.description}
                    </span>
                  )}
                </span>
                {selected && (
                  <span className="ml-auto inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500/80 dark:bg-indigo-400/80 mt-1" aria-hidden />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Panels (right) */}
      <div className={clsx("relative", panelClassName)}>
        {items.map((item, i) => {
          const panelId = `${baseId}-panel-${i}`;
          const selected = i === active;
          return (
            <div
              key={panelId}
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={!selected}
              className={clsx(
                "rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur",
                "p-4 md:p-6"
              )}
            >
              {/* Smooth transition wrapper */}
              <div
                className={clsx(
                  "transition-all duration-300",
                  selected ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                )}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

