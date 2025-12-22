"use client";

import React, { useMemo, useState } from "react";

type CompanyExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  summary: string;
  achievements: string[];
};

const EXPERIENCES: CompanyExperience[] = [
  {
    id: "luxmed",
    company: "Luxmed",
    role: "Senior Frontend Engineer",
    period: "квітень 2025 — теперішній час",
    location: "Познань, Польща",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "WCAG 2.2"],
    summary:
      'Розробка та розвиток фронтенду для e-commerce платформи медичних послуг (Magento-based "sklep"), оптимізація UX для запису до лікаря та роботи з абонементами.',
    achievements: [
      "Перепроєктував ключові віджети пошуку візиту до лікаря з фокусом на продуктивність та доступність.",
      'Впровадив покращення у компоненти порівняння пакунків (наприклад, "Pakiet Standardowy", "Pakiet Senior Premium").',
      "Проводив менторинг команди FE-розробників та брав участь у технічних інтерв’ю кандидатів.",
    ],
  },
  {
    id: "cloudflight",
    company: "Cloudflight / Divante",
    role: "Senior Frontend Engineer",
    period: "2023 — 2025",
    location: "Познань, Польща / Remote",
    stack: ["TypeScript", "React", "Next.js", "Magento 2", "GraphQL"],
    summary:
      "Розвиток складних e-commerce рішень на базі Magento 2, побудова кастомних віджетів, оптимізація часу завантаження та UX.",
    achievements: [
      "Створив і підтримував кастомні Magento-модулі з використанням Knockout.js, jQuery та TypeScript.",
      "Оптимізував frontend-bundle, що зменшило час завантаження сторінки та покращило Core Web Vitals.",
      "Активно співпрацював з QA, BE-командою та бізнесом над релізами та A/B-експериментами.",
    ],
  },
  {
    id: "magecom",
    company: "Magecom",
    role: "Senior Frontend Developer",
    period: "2022",
    location: "Remote",
    stack: ["Magento 2", "JavaScript", "LESS", "Knockout.js"],
    summary:
      "Розробка та підтримка storefront-рішень на Magento 2 для міжнародних клієнтів, кастомізація тем та віджетів.",
    achievements: [
      "Розширював існуючі Magento-теми з урахуванням вимог доступності та продуктивності.",
      "Реалізував складні UI-патерни (акордеони, слайдери, фільтри) поверх стандартних Magento-компонентів.",
    ],
  },
  {
    id: "epam",
    company: "EPAM Systems",
    role: "Frontend Engineer",
    period: "2019 — 2022",
    location: "Україна / Remote",
    stack: ["JavaScript", "TypeScript", "React", "Redux"],
    summary:
      "Робота над великими корпоративними застосунками з фокусом на довгострокову підтримку, масштабованість та якість коду.",
    achievements: [
      "Брав участь у проєктах з жорсткими вимогами до якості коду, code review та автоматизованого тестування.",
      "Допомагав молодшим розробникам зростати через рев’ю, парне програмування і внутрішні воркшопи.",
    ],
  },
  {
    id: "mavenecommerce",
    company: "MavenEcommerce",
    role: "Frontend Developer",
    period: "2018 — 2019",
    location: "Україна",
    stack: ["JavaScript", "jQuery", "HTML5", "CSS3"],
    summary:
      "Старт кар’єри в e-commerce: верстка, інтеграція тем, робота з UI-компонентами та базовою оптимізацією.",
    achievements: [
      "Реалізував адаптивну верстку для декількох e-commerce магазинів.",
      "Поступово перейшов від чистого JS/jQuery до сучаснішого стеку та кращих практик архітектури.",
    ],
  },
];

type CompanyAccordionProps = {
  className?: string;
  defaultOpenId?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Design notes applied:
 * - Content width: max-w-7xl mx-auto px-2 w-full
 * - Flat/minimal: no heavy borders/dividers; subtle surfaces
 * - New palette via literal hex colors:
 *   Base: #000, #e5e4e3, #fafcfc, #2a2a2a, #222121
 *   Accent: #00d3f3, #00bc7d
 */
const CompanyAccordion: React.FC<CompanyAccordionProps> = ({
  className = "",
  defaultOpenId = "luxmed",
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const items = useMemo(() => EXPERIENCES, []);

  return (
    <section
      className={cx(
        "w-full max-w-7xl mx-auto px-2", className
      )}
      aria-label="Досвід роботи"
    >
      <header className="mb-4 sm:mb-6">
        <h2
          className={cx(
            "text-xl sm:text-2xl font-semibold",
            "text-[#000] dark:text-[#fafcfc]"
          )}
        >
          Компанії, в яких я працював
        </h2>
        <p
          className={cx(
            "mt-1 text-sm sm:text-base",
            "text-[#2a2a2a]/80 dark:text-[#e5e4e3]/80"
          )}
        >
          Натисни, щоб розгорнути деталі ролі, стек і ключові досягнення.
        </p>
      </header>

      <div className="grid gap-2 sm:gap-3">
        {items.map((exp) => {
          const isOpen = exp.id === openId;
          const panelId = `company-panel-${exp.id}`;
          const buttonId = `company-trigger-${exp.id}`;

          return (
            <article
              key={exp.id}
              className={cx(
                "rounded-2xl",
                "border shadow-sm backdrop-blur-sm border-neutral-200 bg-white/80 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-50 text-xs sm:text-sm lg:text-base",
              )}
            >
              <button
                id={buttonId}
                type="button"
                className={cx(
                  "w-full text-left",
                  "rounded-2xl",
                  "px-4 py-4 sm:px-5 sm:py-5",
                  "outline-none",
                  "transition",
                  (!isOpen && "hover:bg-black/[0.03] dark:hover:bg-white/[0.03] cursor-pointer"),
                  // focus ring in accent #00d3f3, minimal
                  "focus-visible:ring-2 focus-visible:ring-[#00d3f3]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfc] dark:focus-visible:ring-offset-[#000]"
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(exp.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className={cx(
                          "text-base sm:text-lg font-semibold",
                          "text-[#000] dark:text-[#fafcfc]"
                        )}
                      >
                        {exp.company}
                      </span>

                      <span
                        className={cx(
                          "inline-flex items-center",
                          "text-[11px] sm:text-xs font-medium",
                          "px-2 py-0.5 rounded-full",
                          // flat tag with accent #00bc7d
                          "bg-[#00bc7d]/10 text-[#00bc7d]",
                          "dark:bg-[#00bc7d]/15",
                          "whitespace-nowrap"
                        )}
                      >
                        {exp.role}
                      </span>
                    </div>

                    <div
                      className={cx(
                        "mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm",
                        "text-[#2a2a2a]/70 dark:text-[#e5e4e3]/70"
                      )}
                    >
                      <span>{exp.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <span
                    className={cx(
                      "shrink-0",
                      "mt-0.5 inline-flex items-center justify-center",
                      "rounded-full",
                      "h-8 w-8",
                      "bg-black/[0.04] dark:bg-white/[0.05]",
                      "text-[#2a2a2a] dark:text-[#e5e4e3]",
                      "transition-transform duration-200 ease-out",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  >
                    {/* minimal chevron */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cx(
                  "grid overflow-hidden",
                  "transition-[grid-template-rows,opacity] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="min-h-0">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <p
                        className={cx(
                          "text-sm sm:text-base",
                          "text-[#2a2a2a] dark:text-[#e5e4e3]"
                        )}
                      >
                        {exp.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className={cx(
                              "rounded-full border px-2 py-0.5 text-[11px] border-neutral-200 bg-white/70 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-300"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {exp.achievements.length > 0 && (
                        <ul
                          className={cx(
                            "mt-3 space-y-1.5",
                            "text-sm",
                            "text-[#2a2a2a]/90 dark:text-[#e5e4e3]/90"
                          )}
                        >
                          {exp.achievements.map((item, index) => (
                            <li key={index} className="flex gap-2">
                              <span
                                className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00d3f3]"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="lg:w-1/2 min-h-[500px]">
                      <img className="h-full object-cover" src="https://images.ctfassets.net/4cd45et68cgf/eQf2abKG7Z8OWYN6UdE3X/8b9957676f823e2a655a4dfbb72b4724/CompanyNews.jpeg" alt="netflix" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CompanyAccordion;
