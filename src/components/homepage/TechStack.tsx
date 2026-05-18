import React from "react";
import clsx from "clsx";

// Mock data remains the same
const sections = {
  items: [
    {
      title: "React",
      years: ">7 years",
    },
    {
      title: "JavaScript",
      years: "9 years"
    },
    {
      title: "Java",
      years: "~2 years"
    },
    {
      title: "C/C++",
      years: "~2 years"
    },
    {
      title: "Tailwind CSS",
      years: "5 years"
    },
    {
      title: "PHP",
      years: "8 years"
    },
    {
      title: "Node.js",
      years: "3 years"
    },
    {
      title: "PostgreSQL",
      years: "3 years"
    },
    {
      title: "Docker",
      years: "~8 years"
    },
    {
      title: "GitHub Actions",
      years: "5 years"
    },
    
    {
      title: "CSS (LESS, SASS)",
      years: ">8 years"
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
        <h3 className="text-xl font-bold tracking-tight">
          Tech Stack
        </h3>
      </header>
      <div className="mb-2 space-y-4 pb-4">
        <ul className="flex flex-wrap gap-2">
          {sections.items.map((item, itemIdx) => (
            <li key={itemIdx} className="p-0 border rounded-[3px] border-white outline">
              <h3 className={clsx(
                "text-m relative z-1 font-regular leading-snug", 
                "bg-black text-white w-full flex px-2 py-1",
                "dark:text-black dark:bg-white"
              )}>{item.title}</h3>
              {item.years && (
                <p className="tracking-wide text-black dark:text-white sm:text-s py-1 px-2 pt-2 mt-[-5px] rounded-[3px]">
                  {`${item.years}`}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
