"use client";

import Image from "next/image";
import Link from "next/link";
import TechStack from "./TechStack";
import clsx from "clsx";
import Education from "./Education";
import SocialLinks from "./SocialLinks";

export default function MainInfo() {
  return (
    <div className="z-2 flex flex-col md:flex-row gap-8 items-left justify-between">
      <div className="lg:w-2/5 lg:items-start lg:justify-between gap-4 ">
        <div className="max-w-[250px] lg:ml-auto lg:mr-8">
          <Image
            className={clsx(
              "mb-4 border rounded-[2px] ml-auto h-[350px]",
              "outline outline-2 outline-offset-2 outline-black dark:outline-white"
            )}
            style={{ objectFit: "cover" }}
            alt="blabla"
            src="/media/my-photo.jpeg"
            loading="eager"
            width={300}
            height={400}
          />
          <Link
            href="..."
            className={clsx(
              "flex w-max py-4 px-8 rounded-[2px] bg-white dark:bg-black dark:text-white border border-black dark:border-white my-4 mx-auto",
              "text-black font-sans font-medium tracking-tight select-none transition-all duration-200",
              // Base State
              "shadow-[0_4px_0_#000,0_0_0_2px_#fff] dark:shadow-[0_4px_0_#fff,0_0_0_2px_#000]",
              // Hover State (Moves up 2px, shadow grows 2px to anchor the bottom)
              "hover:-translate-y-[2px] hover:shadow-[0_6px_0_#000,0_0_0_2px_#fff] dark:hover:shadow-[0_6px_0_#fff,0_0_0_2px_#000]",
              // Active State (Sinks down 4px from base, flattens shadow)
              "active:translate-y-[4px] active:shadow-[0_0_0_#000,0_0_0_2px_#fff] dark:active:shadow-[0_0_0_#fff,0_0_0_2px_#000]"
            )}
          >
            <span className="font-bold">Download CV</span>
          </Link>
        </div>
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
            "flex w-max py-4 px-8 rounded-[2px] bg-[#0001] dark:bg-[#fffd] border border-[#0004] dark:border-[#fffd] dark:border-white dark:text-black my-4",
            "text-black font-sans font-medium tracking-tight select-none transition-all duration-200",
            "shadow-[0_4px_0_#0004,0_0_0_2px_#fff] dark:shadow-[0_4px_0_#fff9,0_0_0_2px_#000]",
            "hover:-translate-y-[2px] hover:shadow-[0_6px_0_#0004,0_0_0_2px_#fff] dark:hover:shadow-[0_6px_0_#fff9,0_0_0_2px_#000]",
            "active:translate-y-[2px] active:shadow-[0_0_0_#0004,0_0_0_2px_#fff] dark:active:shadow-[0_0px_0_#fff9,0_0_0_2px_#000]"
          )}
        >
          <span className="font-bold">Download CV</span>
        </Link>
      </div>
    </div>
  );
}
