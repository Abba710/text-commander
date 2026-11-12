import { EditCommand } from "@/components/command/";
import { CommandGuide } from "@/components/guide/app-command-info";

export function EditCommandPage() {
  return (
    <div className="flex w-full gap-6 p-6">
      <EditCommand />
      <CommandGuide />
    </div>
  );
}
