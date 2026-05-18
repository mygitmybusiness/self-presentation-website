import React from "react";
import clsx from "clsx";

// Mock data remains the same
const sections = {
  items: [
    {
      title: "React",
      years: ">7",
    },
    {
      title: "JavaScript",
      years: 9
    },
    {
      title: "Java",
      years: "~2"
    },
    {
      title: "C",
      years: "~3"
    },
    {
      title: "Tailwind CSS",
      years: 5
    },
    {
      title: "PHP",
      years: 8
    },
    {
      title: "Node.js",
      years: 3
    },
    {
      title: "PostgreSQL",
      years: 3
    },
    {
      title: "Docker",
      years: "~8"
    },
    {
      title: "GitHub Actions",
      years: 5
    },
    
    {
      title: "CSS (LESS, SASS)",
      years: ">8"
    }
  ],
};

export default function TechStack() {
  return (
    <section
      className={clsx(
        "w-full space-y-10 text-neutral-900 backdrop-blur",
        "pt-4",
        "dark:text-neutral-50 border-box"
      )}
    >
      <header className="mb-2 space-y-1 pb-1">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Tech Stack
        </h1>
      </header>
      <div className="mb-2 space-y-4 pb-4">
        <ul className="flex flex-wrap gap-2">
          {sections.items.map((item, itemIdx) => (
            <li key={itemIdx} className="p-0 border rounded-[3px] border-white outline">
              <h3 className="font-semibold leading-snug bg-black text-white w-full flex px-2 py-1 rounded-[3px]">{item.title}</h3>
              {item.years && (
                <p className="tracking-wide text-neutral-400 sm:text-xs dark:text-neutral-500 py-1 px-2">
                  {`${item.years} ${item.years == 1 ? "year" : "years"}`}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
