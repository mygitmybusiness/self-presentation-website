import React from "react";
import clsx from "clsx";

// Mock data remains the same
const sections = [
  {
    title: "Frontend",
    subtitle: "UI/UX and client-side technologies",
    items: [
      {
        title: "React",
        subtitle: "Hooks, Context, Suspense",
        meta: "Advanced",
        level: 100,
        years: 7
      },
      {
        title: "TypeScript",
        subtitle: "Static typing for JS",
        meta: "Advanced",
        level: 85,
      },
      {
        title: "Tailwind CSS",
        subtitle: "Utility-first CSS",
        meta: "Intermediate",
        level: 75,
      },
    ],
  },
  {
    title: "Backend",
    subtitle: "APIs and server-side",
    items: [
      {
        title: "Node.js",
        subtitle: "Express, REST APIs",
        meta: "Advanced",
        level: 80,
      },
      {
        title: "PostgreSQL",
        subtitle: "Relational DB",
        meta: "Intermediate",
        level: 70,
      },
    ],
  },
  {
    title: "DevOps",
    subtitle: "Automation & deployment",
    items: [
      {
        title: "Docker",
        subtitle: "Containerization",
        meta: "Intermediate",
        level: 65,
      },
      {
        title: "GitHub Actions",
        subtitle: "CI/CD",
        meta: "Beginner",
        level: 40,
      },
    ],
  },
];

// Added missing label mapping
const levelToLabel: Record<number, string> = {
  90: "Expert",
  85: "Pro",
  75: "Strong",
  40: "Learner",
};

export default function Skills() {
  return (
    <section
      className={clsx(
        "w-full space-y-10 bg-gradient-to-b from-white/70 to-white/40 p-6 text-neutral-900 shadow-sm backdrop-blur",
        "dark:from-neutral-950/80 dark:to-neutral-950/40 dark:text-neutral-50 dark:shadow-lg border-box"
      )}
    >
      <header className="mb-2 space-y-1 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Skills
        </h1>
        <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
          Every day
        </p>
      </header>

      {sections.map((section, idx) => (
        <div key={idx} className="space-y-4">
          {/* Section header */}
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                {section.subtitle}
              </p>
            )}
          </div>

          {/* Items Container */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex flex-col">
                <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-semibold leading-snug">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-[11px] text-neutral-500 sm:text-xs dark:text-neutral-400">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {item.years && (
                    <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 sm:text-xs dark:text-neutral-500">
                      {item.years} {item.years == 1 ? 'year' : 'years'}
                    </p>
                  )}
                </header>

                {typeof item.level === "number" && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800/80">
                      <div
                        className={clsx(
                          "h-1.5 rounded-full",
                          "bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400",
                          "dark:from-sky-500 dark:via-cyan-500 dark:to-emerald-500"
                        )}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      {levelToLabel[item.level] || `${item.level}%`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
