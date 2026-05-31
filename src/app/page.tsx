import Circles from "@/components/Circles";
import Keyboard from "@/components/Keyboard";
import MainInfo from "@/components/homepage/MainInfo";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <MainInfo />
      {/* <Circles /> */}
      <Keyboard />
    </div>
  );
}
