"use client";

import Image from "next/image";
import Link from "next/link";
import TechStack from "./TechStack";
import clsx from "clsx";
import Education from "./Education";
import SocialLinks from "./SocialLinks";

export default function MainInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-left justify-between">
      <div className="lg:w-2/5 lg:items-start lg:justify-between gap-4 ">
        <Image
          className={clsx(
            "mb-4 border rounded-[4px] ml-auto w-full",
            "outline outline-2 outline-offset-2 outline-black dark:outline-white"
          )}
          style={{ objectFit: "contain" }}
          alt="blabla"
          src="/media/my-photo.jpeg"
          width={400}
          height={400}
        />
        <Link
          href="..."
          className={clsx(
            "flex w-max py-4 px-8 rounded-[4px] bg-white border border-black my-4 mx-auto",
            "text-black font-sans font-medium tracking-tight select-none transition-all duration-200",
            // Base State
            "shadow-[0_4px_0_#000,0_0_0_2px_#fff]",
            // Hover State (Moves up 2px, shadow grows 2px to anchor the bottom)
            "hover:-translate-y-[2px] hover:shadow-[0_6px_0_#000,0_0_0_2px_#fff]",
            // Active State (Sinks down 4px from base, flattens shadow)
            "active:translate-y-[4px] active:shadow-[0_0_0_#000,0_0_0_2px_#fff]"
          )}
        >
          <span className="font-bold">Download CV</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full lg:h-max lg:w-3/5">
        <div className="w-full">
          <div className="flex flex-col">
            <h1
              className={clsx(
                "text-3xl md:text-5xl text-white bg-black dark:text-black dark:bg-white",
                "px-2 font-semibold leading-tight flex gap-[10px] mb-4 rounded-[3px]"
                // "relative lg:left-[-80px]"
              )}
            >
              User Name User Name User Name
            </h1>
          </div>
          <SocialLinks />
          <div className="text-sm md:text-base text-black dark:text-white flex flex-col">
            <h2 className="text-2xl text-black lg:bg-black lg:dark:bg-white lg:text-white lg:dark:text-black w-max lg:px-2 rounded-[3px] mb-1">
              Senior Software Engineer
            </h2>
            <p>8 years of commercial experience in multinational teams</p>
            <p>Certified Front-end developer, eCommerce specialist</p>
          </div>
        </div>
        <TechStack />
        <Education />
        <Link
          href="..."
          className={clsx(
            "flex w-max py-4 px-8 rounded-[4px] bg-[#0001] border border-[#0004] my-4",
            "text-black font-sans font-medium tracking-tight select-none transition-all duration-200",
            "shadow-[0_4px_0_#0004,0_0_0_2px_#fff]",
            "hover:-translate-y-[2px] hover:shadow-[0_6px_0_#0004,0_0_0_2px_#fff]",
            "active:translate-y-[4px] active:shadow-[0_0_0_#0004,0_0_0_2px_#fff]"
          )}
        >
          <span className="font-bold">Download CV</span>
        </Link>
      </div>
    </div>
  );
}
