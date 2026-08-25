import { EditCommand } from "@/components/editcommand/";
import { MainInfo } from "@/components/main";

export function LayoutPage() {
  return (
    <div
      data-debug="add page"
      className="w-full h-full p-4 flex justify-start items-start py-6"
    >
      <div className="flex w-[80%]">
        <EditCommand />
      </div>
      <div className="flex w-[20%] justify-center">
        <MainInfo />
      </div>
    </div>
  );
}
