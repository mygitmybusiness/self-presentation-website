import TimelineRoadmap from "@/components/experience/TimelineRoadmap";
import { experienceMilestones } from "@/data/experience";

export default function Experience() {
  return (
    <div className="flex flex-col gap-4">
      <TimelineRoadmap
        subtitle="Companies I have worked at, from 2018 to today."
        milestones={experienceMilestones}
      />
      <div className="dotted-bg absolute block top-0 left-0 w-[100vw] h-[100vw] z-0 h-64 w-full"></div>
      <div className="bg-gradient-to-b from-transparent to-white/50 dark:to-black/50 absolute block top-0 left-0 w-[100vw] h-[100vw] z-0"></div>
    </div>
  );
}
