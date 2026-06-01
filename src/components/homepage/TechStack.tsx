import React from "react";
import clsx from "clsx";

// Mock data remains the same
const sections = {
  items: [
    {
      title: "React",
      years: "7+ years",
    },
    {
      title: "JavaScript",
      years: "8 years",
    },
    // {
    //   title: "Java",
    //   years: "Novice, 2 years",
    // },
    {
      title: "Tailwind CSS",
      years: "5 years",
    },
    {
      title: "Jest",
      years: "2 years",
    },
    // {
    //   title: "PHP",
    //   years: "Solid knowledge, 8 years",
    // },
    // {
    //   title: "Node.js",
    //   years: "3 years",
    // },
    // {
    //   title: "PostgreSQL",
    //   years: "3 years",
    // },
    {
      title: "Docker",
      years: "8+ years",
    },
    {
      title: "GitHub Actions",
      years: "5+ years",
    },
    {
      title: "CSS (LESS, SASS)",
      years: "8 years",
    },
    {
      title: "Accessibility",
      years: "more than 4 years",
    },
    // {
    //   title: "AI neuroslop committer",
    //   years: "Joke, 30 mins",
    // },
  ],
};

export default function TechStack() {
  return (
    <section
      className={clsx(
        "w-full mb-2 space-y-10 text-black",
        "dark:text-neutral-50 border-box"
      )}
    >
      <header className="pb-2 mb-0 space-y-1 pb-1">
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Technologies & programming languages
        </h3>
      </header>
      <div className="space-y-4">
        <ul className="flex flex-wrap gap-x-2 gap-y-1 antialiased">
          {sections.items.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="flex gap-1 w-max"
            >
              <p
                className={clsx(
                  "text-m relative z-1 font-bold rounded-[2px]",
                  "bg-black text-white w-full flex px-2 py-1",
                  "dark:text-black dark:bg-white items-center justify-center"
                )}
              >
                {item.title}
              </p>
              {item.years && (
                <p className="text-black dark:text-white border-[1px] sm:text-s py-1 px-2 min-w-max rounded-[2px]">
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
