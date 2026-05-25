import React from "react";
import clsx from "clsx";

// Mock data remains the same
const sections = {
  items: [
    {
      title: "React",
      years: "Expert, 7+ years",
    },
    {
      title: "JavaScript",
      years: "Expert, 8 years",
    },
    // {
    //   title: "Java",
    //   years: "Novice, 2 years",
    // },
    {
      title: "Tailwind CSS",
      years: "Solid, 5 years",
    },
    {
      title: "Jest",
      years: "Solid, 2 years",
    },
    {
      title: "PHP",
      years: "Solid knowledge, 8 years",
    },
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
      years: "Good, 5 years",
    },
    {
      title: "CSS (LESS, SASS)",
      years: "Expert, > 8 years",
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
        <ul className="flex flex-wrap gap-2">
          {sections.items.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="p-0 border rounded-[3px] border-white outline"
            >
              <p
                className={clsx(
                  "text-m relative z-1 font-regular leading-snug",
                  "bg-black text-white w-full flex px-2 py-1 rounded-[2px]",
                  "dark:text-black dark:bg-white"
                )}
              >
                {item.title}
              </p>
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
