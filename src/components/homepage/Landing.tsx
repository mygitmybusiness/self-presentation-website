"use client";

import Sketch from "@/components/homepage/Sketch";
import Overview from "@/components/homepage/SkillsOverview";
import {skillsConfig} from "@/components/homepage/SkillsConfig";

export function Landing() {
  return (
    <div className="flex flex-col gap-4">
      <Sketch />
      <Overview config={skillsConfig}/>
    </div>
  );
}
