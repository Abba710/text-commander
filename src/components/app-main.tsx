import { MainTest, MainInfo } from "@/components/main";

export function AppMain() {
  return (
    <div className="w-full p-4 h-full p-2 flex">
      <div className="flex w-[80%]">
        <MainTest />
      </div>
      <div className="flex w-[20%] justify-center">
        <MainInfo />
      </div>
    </div>
  );
}
