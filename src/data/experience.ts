import type { TimelineMilestone } from "@/types/experience";

export const experienceMilestones: TimelineMilestone[] = [
  {
    id: "luxmed",
    year: "2025 - current",
    eyebrow: "Apr 2025 — Present · Poznań, Poland",
    title: "Senior Frontend Engineer — LUX MED",
    description:
      "Building and evolving the frontend for a Magento-based medical e-commerce platform, with a focus on appointment booking UX and subscription flows.",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "WCAG 2.2"],
    achievements: [
      "Redesigned core doctor-appointment search widgets for performance and accessibility.",
      "Improved plan comparison components (e.g. Standard and Senior Premium packages).",
      "Mentored FE developers and participated in technical interviews.",
    ],
    tone: "accent",
  },
  {
    id: "cloudflight",
    year: "2023–2025",
    eyebrow: "2023 — 2025 · Poznań, Poland / Remote",
    title: "Senior Frontend Engineer — Cloudflight / Divante",
    description:
      "Delivered complex Magento 2 e-commerce solutions, custom widgets, and UX optimizations across production storefronts.",
    stack: ["TypeScript", "React", "Next.js", "Magento 2", "GraphQL"],
    achievements: [
      "Built and maintained custom Magento modules with Knockout.js, jQuery, and TypeScript.",
      "Optimized frontend bundles, improving page load times and Core Web Vitals.",
      "Collaborated with QA, backend, and business on releases and A/B experiments.",
    ],
    tone: "dark",
  },
  {
    id: "magecom",
    year: "2022",
    eyebrow: "2022 · Remote",
    title: "Senior Frontend Developer — Magecom",
    description:
      "Developed and maintained Magento 2 storefronts for international clients, customizing themes and widgets.",
    stack: ["Magento 2", "JavaScript", "LESS", "Knockout.js"],
    achievements: [
      "Extended Magento themes with accessibility and performance requirements.",
      "Implemented complex UI patterns (accordions, sliders, filters) on top of Magento components.",
    ],
  },
  {
    id: "epam",
    year: "2019–2022",
    eyebrow: "2019 — 2022 · Ukraine / Remote",
    title: "Frontend Engineer — EPAM Systems",
    description:
      "Worked on large enterprise applications with a focus on long-term maintainability, scalability, and code quality.",
    stack: ["JavaScript", "TypeScript", "React", "Redux"],
    achievements: [
      "Contributed to projects with strict code quality, review, and automated testing standards.",
      "Supported junior developers through reviews, pair programming, and internal workshops.",
    ],
  },
  {
    id: "mavenecommerce",
    year: "2018–2019",
    eyebrow: "2018 — 2019 · Ukraine",
    title: "Frontend Developer — MavenEcommerce",
    description:
      "Started in e-commerce: layout integration, theme work, UI components, and basic performance optimization.",
    stack: ["JavaScript", "jQuery", "HTML5", "CSS3"],
    achievements: [
      "Delivered responsive layouts for multiple e-commerce stores.",
      "Transitioned from vanilla JS/jQuery toward modern stack practices and architecture.",
    ],
  },
];
