"use client";

import React from "react";

type CubeGridProps = {
  /** rows x cols grid */
  rows?: number;
  cols?: number;
  /** distance between cubes (px) */
  cell?: number;
  /** cube size (px) */
  cube?: number;
  /** base animation delay step (seconds) */
  baseDelay?: number;
  /** perspective (px) */
  perspective?: number;
  /** scene rotation (deg) */
  rotateX?: number;
  rotateZ?: number;
  /** background color for the parent wrapper */
  bgClassName?: string;
};

/**
 * React + Tailwind port of your HTML/CSS demo.
 * Keeps the same transforms, timings, and look.
 */
export default function IsoCubeGrid({
  rows = 3,
  cols = 5,
  cell = 100,
  cube = 80,
  baseDelay = 0.2,
  perspective = 600,
  rotateX = 50,
  rotateZ = 40,
  bgClassName = "transparent",
}: CubeGridProps) {
  const width = (cols - 1) * cell + cube;
  const height = (rows - 1) * cell + cube;
  const half = cube / 2 - 0.2; // 12.3px in your CSS, computed from cube size

  // build cells
  const items = Array.from({ length: rows * cols }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      id: i,
      left: col * cell,
      top: row * cell,
      delay: baseDelay * (1 + row + col), // matches your stagger pattern
    };
  });

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${bgClassName}`}>
      {/* Container with perspective */}
      <div
        className="relative"
        style={{
          width,
          height,
          perspective: `${perspective}px`,
          WebkitPerspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Scene tilt (was .perspective in CSS) */}
        <div
          className="[transform-style:preserve-3d] absolute inset-0"
          style={{
            transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          }}
        >
          {items.map((it) => (
            <React.Fragment key={it.id}>
              {/* translate-cube-shadow wrapper */}
              <div
                className="absolute [transform-style:preserve-3d]"
                style={{ left: it.left, top: it.top, transform: "translateZ(-40px)" }}
              >
                {/* cube-shadow */}
                {/* <div
                  className="absolute pointer-events-none"
                  style={{
                    width: cube,
                    height: cube,
                    background: "#fff",
                    transform: "translateZ(-60px)",
                    animation: "scale 2s infinite ease-in-out",
                    animationDelay: `${it.delay}s`,
                  }}
                /> */}
              </div>

                {/* cube */}
                <div
                className="group absolute [transform-style:preserve-3d]"
                style={{
                    left: it.left,
                    top: it.top,
                    width: cube,
                    height: cube,
                    animationDelay: `${it.delay}s`,
                }}
                >
                    {/* top */}
                    <div
                        className="absolute inset-0 bg-[#FAFAFA] group-hover:bg-red-500 transition-colors duration-300"
                        style={{
                        transform: `rotateX(0deg) translateZ(${half}px)`,
                        }}
                    />
                    {/* left */}
                    <div
                        className="absolute inset-0 bg-[#E0E0E0] group-hover:bg-red-600 transition-colors duration-300"
                        style={{
                        transform: `rotateX(-90deg) translateZ(${half}px)`,
                        }}
                    />
                    {/* right */}
                    <div
                        className="absolute inset-0 bg-[#EEEEEE] group-hover:bg-red-400 transition-colors duration-300"
                        style={{
                        transform: `rotateY(90deg) translateZ(${half}px)`,
                        }}
                    />
                </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Keyframes (styled-jsx, works in Next.js App Router) */}
      <style jsx global>{`
        @keyframes rotation {
          0% {
            transform: translateZ(0px);
          }
          100% {
            transform: translateZ(15px);
          }
        }
        @keyframes scale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.75);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
