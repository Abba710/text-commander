import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight, File, Folder } from "lucide-react";

type TreeItem = string | TreeItem[];

export function SidebarContentTree({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton className="[&[data-panel-open]_.chevron]:rotate-90">
              <ChevronRight className="chevron transition-transform" />
              <Folder />
              {name}
            </SidebarMenuButton>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <SidebarContentTree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
