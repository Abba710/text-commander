import { CommandInput } from "@/components/command/index";
import { CommandGuide } from "@/components/guide/app-command-info";

export function AddCommandPage() {
  return (
    <div className="w-full flex gap-6 p-6">
      <CommandInput />
      <CommandGuide />
    </div>
  );
}
