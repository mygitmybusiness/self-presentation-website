"use client";

import { VerticalTabItem, VerticalTabs } from "@/components/VerticalTabs";
import TimelineVerticalSlider, { TimelineItem } from "@/components/TimelineVerticalSlider";

export default function Experience() {
  const demoItems: VerticalTabItem[] = [
    {
      label: "Overview",
      description: "Quick intro and goals",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="mt-0">Overview</h2>
          <p>
            Build delightful UX with accessible, keyboard-friendly vertical tabs. This demo uses
            only Tailwind for animations and supports dark mode out of the box.
          </p>
          <ul>
            <li>Arrow keys, Home/End, Enter/Space</li>
            <li>Disabled states</li>
            <li>Smooth fade + translate</li>
          </ul>
        </div>
      ),
    },
    {
      label: "Features",
      description: "What you get",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="mt-0">Features</h2>
          <p>Tailwind-only transitions keep bundles small and SSR-safe for Next.js App Router.</p>
          <p>Adjust widths with <code>md:grid-cols-[280px_minmax(0,1fr)]</code>.</p>
        </div>
      ),
    },
    {
      label: "Pricing",
      description: "Fair & simple",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="mt-0">Pricing</h2>
          <p>Free. MIT. Copy, refactor, enjoy.</p>
        </div>
      ),
    },
  ];

  const timeline: TimelineItem[] = [
    { id: "2025", title: "Luxmed", subtitle: "2025", content: "Sketched first concepts and validated the problem with early adopters." },
    { id: "2023", title: "Cloudflight", subtitle: "2023", content: "Built an MVP, onboarded first 50 users, iterated weekly on feedback." },
    { id: "2022", title: "Magecom", subtitle: "2022", content: "Public launch with core features, hit 10k MAU in 4 months." },
    { id: "2019", title: "EPAM", subtitle: "2019", content: "Scaled infra, added SSO, SOC2, and enterprise features." },
  ];

  return (
    <div className="p-4 md:p-8 w-full">
      <VerticalTabs items={demoItems} />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Roadmap</h1>
        <TimelineVerticalSlider
          items={timeline}
          initialIndex={1}
          height="28rem"
          onChange={(i, item) => console.log("Active:", i, item)}
        />
      </div>
    </div>
  );
}

