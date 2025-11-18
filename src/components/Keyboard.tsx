// components/MiniKeyboard3D.tsx
"use client";

import { useState } from "react";

type Props = {
  /** Export your scene in Spline → Export → Code → React; paste its .splinecode URL here */
  sceneUrl?: string;
  /** Optional className to size/position the canvas container */
  className?: string;
  /** Called when a key object is clicked/pressed; object names come from Spline */
  onKeyPressed?: (name: string) => void;
};

export default function Keyboard({}: Props) {
  const [hint, setHint] = useState<string>("Click a key");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-sm bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="3D keyboard"
    >
      {/* The 3D scene */}
      <div className="relative w-full h-56 md:h-64">
        <Spline
          scene={sceneUrl}
          // Mouse events come from Spline objects (ensure you export with Global mouse events)
          onMouseDown={(e: any) => {
            const name = e?.target?.name as string | undefined;
            if (name) {
              setHint(`Pressed: ${name}`);
              onKeyPressed?.(name);
            }
          }}
          onMouseUp={() => setHint("Click a key")}
        />
      </div>

      {/* Subtle HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center">
        <div className="px-3 py-1 text-xs md:text-sm rounded-full bg-zinc-900/70 text-white">
          {hint}
        </div>
      </div>
    </div>
  );
}
