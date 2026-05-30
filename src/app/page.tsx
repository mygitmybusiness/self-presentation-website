import Circles from "@/components/Circles";
import MainInfo from "@/components/homepage/MainInfo";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <MainInfo />
      <Circles />
    </div>
  );
}
