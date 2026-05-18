"use client";

import Image from "next/image";
import Link from "next/link";
import TechStack from "./TechStack";
import clsx from "clsx";

export default function MainInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-left">
      <Image className="w-2/5 border rounded-[4px] w-min h-min outline outline-2 outline-offset-2 outline-black dark:outline-white" style={{objectFit: "contain"}} alt="blabla" src="/media/my-photo.jpeg" width={300} height={300} />
      <div className="flex flex-col justify-center h-max w-3/5">
        <div className="w-full items-start justify-between gap-4 ">
          <div>
            <div className="flex w-full justify-between">
              <h1 className={clsx(
                  "text-xl md:text-5xl text-white bg-black dark:text-black dark:bg-white", 
                  "px-2 font-semibold leading-tight flex gap-[10px] mb-4 rounded-[3px]",
                  // "relative lg:left-[-80px]"
                )}>
                Dmytro Deinershtein
              </h1>
              <Link href="..." className="w-max rounded-[3px] mb-auto p-4 border dark:text-white text-lx">Download CV</Link>
            </div>
            <div className="text-sm md:text-base text-black dark:text-white flex flex-col">
              <h2 className="text-2xl bg-black lg:bg-white text-white dark:text-black w-max px-2 rounded-[3px] mb-1">Senior Software Engineer</h2>
              <p>8 years of experience in multinational teams</p>
              <p>Certified Front-end developer, eCommerce specialist</p>
            </div>
          </div>
        </div>
        <TechStack />
        <div className="pt-2">
          <p className="text-xl font-bold">Education:</p>
          <span>Masters Degree in <strong className="pb-1 inline-block bg-yellow">Computer Science</strong></span>
        </div>
        <div className="pt-2">
          <p className="text-xl font-bold">Languages spoken</p>
          <ul>
            <li>English <span>(TEFL, C1 certified)</span></li>
            <li>Polish <span>(good speaking, great understanding, average writing)</span></li>
            <li>Ukrainian (native)</li>
            <li>Russian (trying to forget)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
