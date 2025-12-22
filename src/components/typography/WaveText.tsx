"use client";

import React from "react";
import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
};

export default function WaveText({ text, className }: Props) {
  return (
    <span
      className={clsx(
        "relative inline-block font-bold leading-none bottom-[-5px]",
        className
      )}
    >
      {/* Stroke layer */}
      <span
        aria-hidden="true"
        className="
          stroke-layer 
          absolute left-0 top-0
          text-transparent select-none
        "
      >
        {text}
      </span>

      {/* Fill + animation layer */}
      <span
        aria-hidden="true"
        className="
          animate-wavy 
          absolute left-0 top-0
          text-[#c19bf5] dark:text-[#00d3f3] select-none
        "
      >
        {text}
      </span>

      {/* Accessible real text for screen readers */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
