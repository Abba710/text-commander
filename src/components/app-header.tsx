import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SearchTrigger, HeaderNavigation } from "@/components/header";

export function AppHeader() {
  return (
    <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-7.5" />
        <HeaderNavigation />
        <SearchTrigger />
        <Button variant="ghost" size="icon-sm"></Button>
      </div>
    </header>
  );
}
