"use client";

import clsx from "clsx";
import {
  MilestoneTone,
  Props,
  TimelineMilestone,
} from "@/types/experience";

function cardClasses(tone: MilestoneTone) {
  switch (tone) {
    case "accent":
      return {
        card: "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white",
        inverted: true,
      };
    case "dark":
      return {
        card: "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 border-black dark:border-white",
        inverted: false,
      };
    default:
      return {
        card: "bg-white text-black dark:bg-black dark:text-white border-black dark:border-white",
        inverted: false,
      };
  }
}

function StackPill({ label }: { label: string }) {
  return (
    <li className="p-0 border rounded-[3px] border-white outline list-none">
      <span
        className={clsx(
          "text-m relative z-1 font-regular leading-snug",
          "bg-black text-white flex px-2 py-1",
          "dark:text-black dark:bg-white"
        )}
      >
        {label}
      </span>
    </li>
  );
}

function WorkplaceCard({ milestone }: { milestone: TimelineMilestone }) {
  const tone = milestone.tone ?? "light";
  const t = cardClasses(tone);

  return (
    <div
      className={clsx(
        "rounded-[3px] p-4 md:p-5 border text-left",
        t.card
      )}
    >
      <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
        {milestone.eyebrow}
      </p>
      <h4
        className={clsx(
          "mt-1 text-base md:text-lg font-semibold leading-snug",
          "w-max max-w-full px-2 py-1 rounded-[3px]",
          t.inverted
            ? "bg-white text-black dark:bg-black dark:text-white"
            : "bg-black text-white dark:bg-white dark:text-black"
        )}
      >
        {milestone.title}
      </h4>

      <p className="mt-4 text-sm md:text-base leading-relaxed text-left">
        {milestone.description}
      </p>

      {milestone.stack && milestone.stack.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2 justify-start">
          {milestone.stack.map((tech) => (
            <StackPill key={tech} label={tech} />
          ))}
        </ul>
      ) : null}

      {milestone.achievements && milestone.achievements.length > 0 ? (
        <ul className="mt-3 space-y-1.5 text-sm text-left">
          {milestone.achievements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function TimelineRoadmap({
  title = "Experience",
  subtitle,
  milestones,
  className,
}: Props) {
  return (
    <section
      className={clsx(
        "w-full mb-2 text-neutral-900 dark:text-neutral-50",
        className
      )}
    >
      <header className="pb-6 space-y-1">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        {subtitle ? (
          <p className="text-sm md:text-base text-neutral-900 dark:text-neutral-50">
            {subtitle}
          </p>
        ) : null}
      </header>

      <div>
        {milestones.map((m) => (
          <div
            key={m.id}
            className="flex flex-col md:flex-row md:gap-6 lg:gap-8"
          >
            <div className="md:w-1/5 shrink-0">
              <p
                className={clsx(
                  "sticky top-20 md:top-24 z-10",
                  "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
                  "py-4 md:py-0 md:pb-24",
                  "text-black dark:text-white"
                )}
              >
                {m.year}
              </p>
            </div>

            <article className="md:w-4/5 pb-6 md:pb-10 text-left">
              <WorkplaceCard milestone={m} />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
