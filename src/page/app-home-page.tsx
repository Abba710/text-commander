import { MainTest, MainInfo } from "@/components/main";

export function HomePage() {
  return (
    <div className="w-full h-full p-4 flex justify-start items-start py-6">
      <div className="flex w-[80%]">
        <MainTest />
      </div>
      <div className="flex w-[20%] justify-center">
        <MainInfo />
      </div>
    </div>
  );
}
