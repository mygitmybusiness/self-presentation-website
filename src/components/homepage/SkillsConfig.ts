// config/skillsConfig.ts
import type { OverviewConfig } from "@/components/homepage/SkillsOverview";

export const skillsConfig: OverviewConfig = {
  heading: "Skills overview",
  subheading: "Tech I actually use to ship production code",
  sections: [
    {
      id: "skills",
      title: "Core skills",
      subtitle: "Tech I use every day",
      layout: "grid",
      columns: 3,
      items: [
        {
          id: "react",
          title: "React and Next.js",
          meta: "Daily driver",
          level: 5,
          description:
            "Interactive components, App Router, SSR, RSC, advanced UI.",
          tags: ["React", "Next.js", "Hooks"],
        },
        {
          id: "ts",
          title: "TypeScript",
          meta: "Strong",
          level: 5,
          description:
            "Types for complex props, generics, safer refactors in legacy code.",
          tags: ["Types", "Tooling"],
        },
        {
          id: "a11y",
          title: "Accessibility",
          meta: "Real projects",
          level: 4,
          description:
            "WCAG, ARIA, focus management, keyboard UX, screen reader support.",
          tags: ["WCAG 2.2", "ARIA"],
        },
      ],
    },
  ],
};
