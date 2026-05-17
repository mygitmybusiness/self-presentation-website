"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-left">
      <Image className="" alt="blabla" src="/media/snap-sketch.png" width="300" height="300" />
      <div className="flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-5xl font-semibold leading-tight flex gap-[10px]">
              Who am i?
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 flex flex-col">
              <strong>Senior Software Engineer</strong>
              <span>8 years of experience</span>
              <span>Front-end</span>
            </p>
          </div>
        </div>
        <Link href="..." className="w-max p-4 border mt-4 text-white text-lx">Download CV</Link>
      </div>
    </div>
  );
}
