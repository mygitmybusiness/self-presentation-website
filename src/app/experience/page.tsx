import TimelineRoadmap from "@/components/experience/TimelineRoadmap";
import { experienceMilestones } from "@/data/experience";

export default function Experience() {
  return (
    <div className="flex flex-col gap-4">
      <TimelineRoadmap
        subtitle="Companies I have worked at, from 2018 to today."
        milestones={experienceMilestones}
      />
    </div>
  );
}
