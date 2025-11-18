import SquaredShowcase from "@/components/SquaredShowcase";

export default function Technologies() {
  return (
    <div className="p-4 md:p-8 w-full">
      <div>
        <SquaredShowcase
          color="#1e293b"          // slate-800
          shadowColor="rgba(0,0,0,0.25)"
          highlightColor="#1e293b"
          cols={4}
          gap="4"
          rounded="xl"
          idleTitle="Pick a tile to see its label"
          items={[
            {
              label: "Next.js",
              color: "#0B0B0F",
              imgSrc: "/tech/nextjs.jpg",
              imgAlt: "Next.js",
              desc: {
                title: "Next.js — App Router, SSR/ISR",
                text:
                  "I build production-grade apps using the App Router, Server Components, caching, and revalidation. I optimize images/fonts, use middleware, edge runtime, and ensure strong SEO."
              }
            },
            {
              label: "React",
              color: "#61DAFB",
              imgSrc: "/media/react-icon.svg",
              imgAlt: "React",
              desc: {
                title: "React — components & performance",
                text:
                  "I create component libraries with hooks/context, ensure memoization, virtualized lists, and stable keys. I integrate design systems with accessibility built-in."
              }
            },
            {
              label: "TypeScript",
              color: "#3178C6",
              imgSrc: "/tech/typescript.jpg",
              imgAlt: "TypeScript",
              desc: {
                title: "TypeScript — reliable contracts",
                text:
                  "Strong typing with generics, unions/discriminated unions, and utility types. I align API/GraphQL contracts, configure ESLint/tsconfig, and set up clean alias structures."
              }
            },
            {
              label: "Tailwind CSS",
              color: "#06B6D4",
              imgSrc: "/tech/tailwind.jpg",
              imgAlt: "Tailwind CSS",
              desc: {
                title: "Tailwind — fast, systematic UI",
                text:
                  "Utility-first approach, design tokens, responsive grids, and motion-safe animations. Theming (including dark mode) with focus on contrast and proper focus states."
              }
            },
            {
              label: "WCAG & a11y",
              color: "#0F766E",
              imgSrc: "/tech/a11y.jpg",
              imgAlt: "Accessibility",
              desc: {
                title: "Accessibility — WCAG 2.2 in practice",
                text:
                  "Keyboard navigation, correct roles/ARIA, focus management, and roving tabindex. I test with NVDA/JAWS/VoiceOver and fix semantic and content accessibility traps."
              }
            },
            {
              label: "GraphQL",
              color: "#E10098",
              imgSrc: "/tech/graphql.jpg",
              imgAlt: "GraphQL",
              desc: {
                title: "GraphQL — schemas, caching, pagination",
                text:
                  "I design schemas and work with Apollo/urql clients: normalization, caching, pagination, persisted queries. On the backend side — resolvers and data-loaders."
              }
            },
            {
              label: "Playwright E2E",
              color: "#23A55A",
              imgSrc: "/tech/playwright.jpg",
              imgAlt: "Playwright",
              desc: {
                title: "Playwright — reliable E2E & visual tests",
                text:
                  "Auth fixtures, network stubs, tracing, and parallelization in CI. I reduce flakiness by using stable locators and controlled waiting strategies."
              }
            },
            {
              label: "Magento 2",
              color: "#F26322",
              imgSrc: "/tech/magento.jpg",
              imgAlt: "Magento 2",
              desc: {
                title: "Magento 2 — modules & performance",
                text:
                  "UI Components, Knockout/RequireJS, GraphQL endpoints, and service contracts. Patches/migrations, performance profiling, layout XML, DI, and caching layers."
              }
            }
          ]}
        />
      </div>
    </div>
  );
}
