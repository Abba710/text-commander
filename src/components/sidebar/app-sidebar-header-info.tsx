import { MessageSquareCode } from "lucide-react";

export function SidebarHeaderInfo() {
  return (
    <div className="gap-2 flex p-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-foreground">
        <MessageSquareCode className="size-4 text-sidebar-primary-foreground" />
      </div>
      <div className="flex flex-col items-start justify-center text-left text-sm leading-tight">
        <span className="truncate font-semibold text-sm">Text-Commander</span>
        <span className="truncate text-xs">PRO</span>
      </div>
    </div>
  );
}
