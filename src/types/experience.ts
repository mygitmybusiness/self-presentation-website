export type MilestoneTone = "light" | "dark" | "accent";

export type TimelineMilestone = {
  id: string;
  year: string;
  eyebrow: string;
  title: string;
  description: string;
  stack?: string[];
  achievements?: string[];
  tone?: MilestoneTone;
};

export type Props = {
  title?: string;
  subtitle?: React.ReactNode;
  milestones: TimelineMilestone[];
  className?: string;
};
