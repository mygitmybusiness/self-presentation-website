"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { makeShadowStack } from "@/utils/shadow";
import clsx from "clsx";

type ItemDescription = {
  title: string;
  text: string;
};

type GridItem = {
  /** short label for tile and default header */
  label: string;
  /** individual tile background (hex/rgb/hsl/any CSS color) */
  color?: string;
  /** image displayed on the tile */
  imgSrc?: string;
  svg?: string;
  imgAlt?: string;
  /** long description shown in the main header/subtitle above */
  desc?: ItemDescription;
};

type Props = {
  items: GridItem[];
  /** shadow under the tiles */
  shadowColor?: string;
  /** highlight color (outline/ring) on hover/focus */
  highlightColor?: string;
  /** number of columns (mobile-first; can be overridden via responsive props) */
  cols?: number;
  /** gap in Tailwind units */
  gap?: string; // e.g. "4" => gap-4
  /** border radius (Tailwind suffix) */
  rounded?: string; // e.g. "xl", "2xl", "3xl", "full"
  /** header text when nothing is active */
  idleTitle?: string;
};

export default function SquaredShowcase({
  items,
  shadowColor = "rgba(0,0,0,0.18)",
  highlightColor = "#22d3ee", // cyan-400-ish
  cols = 4,
  gap = "4",
  rounded = "xl",
  idleTitle = "Hover or focus a square",
}: Props) {
  const [active, setActive] = useState<number | null>(null);

  // те, що зараз показано в хедері (може трохи відставати від active для анімації)
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const gridId = useId();

  const vars: React.CSSProperties = {
    // @ts-expect-error CSS var is fine
    "--sq-ring": highlightColor,
    "--sq-shadow": shadowColor,
  };

  // плавна зміна заголовка/тексту
  useEffect(() => {
    setIsFadingOut(true);

    const id = setTimeout(() => {
      setDisplayedIndex(active);
      setIsFadingOut(false);
    }, 150); // спочатку згасає старий текст, потім з’являється новий

    return () => clearTimeout(id);
  }, [active]);

  const title =
    displayedIndex != null
      ? items[displayedIndex]?.desc?.title ?? items[displayedIndex]?.label
      : idleTitle;

  const text =
    displayedIndex != null ? items[displayedIndex]?.desc?.text ?? null : null;

  return (
    <section
      aria-labelledby={`grid-title-${gridId}`}
      className="w-full mx-auto max-w-5xl p-6 [transform:rotateX(35deg)_rotateY(20deg)_rotateZ(-30deg)]"
      style={vars}
    >
      {/* Header with the current label/description */}
      <div className="mb-4 h-50 text-center pointer-events-none">
        <h2
          id={`grid-title-${gridId}`}
          className={clsx(
            "text-5xl font-semibold tracking-tight transition-opacity duration-200",
            isFadingOut ? "opacity-0" : "opacity-100"
          )}
        >
          {title}
        </h2>

        {text && (
          <p
            className={clsx(
              "mt-1 text-2xl text-muted-foreground transition-opacity duration-200",
              isFadingOut ? "opacity-0" : "opacity-100"
            )}
          >
            {text}
          </p>
        )}
      </div>

      {/* Grid container */}
      <div
        className={`
          grid
          gap-${gap}
        `}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        role="list"
      >
        {items.map((item, i) => {
          const isActive = active === i;
          const base = item.color ?? "#E0E0E0";

          const boxShadow = makeShadowStack(base, {
            direction: [-1, 1], // shift left + down
            steps: 12,
            noBlur: false,
            includeGlows: true,
            darkenPerStep: 0.0,
          });

          // grid position
          const row = Math.floor(i / cols);
          const col = i % cols;

          // lower + leftmost should overlap visually on top in 3D
          const zIndex = row * cols + (cols - 1 - col);

          return (
            <button
              key={i}
              role="listitem"
              type="button"
              style={{
                zIndex,
                background: item.color,
                boxShadow,
              }}
              className={clsx(
                "group relative aspect-square overflow-hidden cursor-pointer",
                `rounded-${rounded}`,
                "outline-none focus-visible:ring-2 [--tw-ring-color:var(--sq-ring)]",
                "transform-gpu will-change-transform",
                "transition-[transform,box-shadow] duration-200",
                "motion-reduce:transform-none",

                // persistent "hover" стан
                isActive && "is-active",

                // анімований підйом тільки коли кнопка активна
                "[&.is-active]:[transform:translateZ(0px)_translateY(-25px)_translateX(25px)]"
              )}
              aria-pressed={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              // важливе: нема onMouseLeave / onBlur, тож актив не скидається
            >
              {/* Tile image */}
              {item.imgSrc ? (
                <>
                  <Image
                    src={item.imgSrc}
                    alt={item.imgAlt ?? item.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={clsx(
                      `rounded-${rounded}`,
                      "filter brightness-0 invert contrast-200",
                      "max-w-1/2 m-auto"
                    )}
                    priority={i < 4}
                  />

                  {/* slight gradient for readability of label */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </>
              ) : (
                // fallback tile if no image — a subtle pattern
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_60%)]" />
              )}

              {/* Tile label */}
              <span className="absolute left-2 top-2 rounded-md px-2 py-1 text-xs font-medium text-white/95 bg-black/45 backdrop-blur-[2px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
