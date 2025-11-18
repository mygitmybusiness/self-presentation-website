"use client";

import React from "react";

type CubeProps = {
  /** Pixel size of the cube edge */
  size?: number;
  /** Letter rendered on the top face */
  letter?: string;
};

/**
 * 3D Cube with perspective that vertically shrinks on hover.
 * Works in Next.js App Router. No external libs required.
 *
 * Usage:
 * <Cube3D size={140} letter="A" />
 */
export default function Cube3D({ size = 120, letter = "A" }: CubeProps) {
  const half = size / 2;

  return (
    <div
      className="group relative inline-flex items-center justify-center select-none [perspective:900px]"
      // Ensure perspective even if Tailwind arbitrary prop is stripped or parent breaks 3D
      style={{ perspective: "900px", WebkitPerspective: "900px" as any }}
    >
      {/* Floor shadow */}
      <div
        className="absolute h-[12px] w-[60%] rounded-full opacity-30 blur-[6px] transition-all duration-300 group-hover:opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,0,0,.35), rgba(0,0,0,0))",
          transform: `translateY(${size / 2 + 8}px)`,
        }}
      />

      {/* Cube container */}
      <div
        className={[
          "relative transform-gpu [transform-style:preserve-3d]",
          // Include perspective() in the transform so the cube keeps true 3D even if ancestor context changes.
          "[transform:perspective(900px)_rotateX(-24deg)_rotateY(33deg)_scaleY(0.65)]",
          "will-change-transform",
        ].join(" ")}
        style={{ width: size, height: size }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md [backface-visibility:hidden]"
          style={{
            transform: `translateZ(${half}px)`,
            background: "linear-gradient(135deg, #c9d6ff, #e2ebf0)",
          }}
          aria-hidden
        />

        {/* BACK */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md [backface-visibility:hidden]"
          style={{
            transform: `rotateY(180deg) translateZ(${half}px)`,
            background: "linear-gradient(315deg, #c9d6ff, #e2ebf0)",
          }}
          aria-hidden
        />

        {/* RIGHT */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md [backface-visibility:hidden]"
          style={{
            transform: `rotateY(90deg) translateZ(${half}px)`,
            background: "linear-gradient(135deg, #b7c6f6, #d7e2f1)",
          }}
          aria-hidden
        />

        {/* LEFT */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md [backface-visibility:hidden]"
          style={{
            transform: `rotateY(-90deg) translateZ(${half}px)`,
            background: "linear-gradient(315deg, #b7c6f6, #d7e2f1)",
          }}
          aria-hidden
        />

        {/* TOP with Letter */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md font-bold [backface-visibility:hidden]"
          style={{
            transform: `rotateX(90deg) translateZ(${half}px)`,
            background: "linear-gradient(180deg, #fff, #f5f5f5)",
          }}
          aria-label={`Top face with letter ${letter}`}
        >
          <span
            className="leading-none tracking-tight"
            style={{
              fontSize: Math.max(28, Math.floor(size * 0.55)),
            }}
          >
            {letter}
          </span>
        </div>

        {/* BOTTOM */}
        <div
          className="absolute inset-0 grid place-items-center border border-black/20 rounded-md [backface-visibility:hidden]"
          style={{
            transform: `rotateX(-90deg) translateZ(${half}px)`,
            background: "linear-gradient(0deg, #d9d9d9, #efefef)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
