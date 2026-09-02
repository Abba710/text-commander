import { EditFolder } from "@/components/folder/app-edit-folder";
import { MainInfo } from "@/components/main";

export function EditFolderPage() {
  return (
    <div
      data-debug="add page"
      className="w-full h-full p-4 flex justify-start items-start py-6"
    >
      <div className="flex w-[80%]">
        <EditFolder />
      </div>
      <div className="flex w-[20%] justify-center">
        <MainInfo />
      </div>
    </div>
  );
}
