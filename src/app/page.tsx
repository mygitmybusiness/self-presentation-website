import MainInfo from "@/components/homepage/MainInfo";
import Skills from "@/components/homepage/Skills";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <MainInfo />
      <Skills />
    </div>
  );
}
