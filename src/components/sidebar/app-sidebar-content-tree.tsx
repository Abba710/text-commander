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
import type { Command, CommandFolder, Tree } from "@/types";
import { ChevronRight, File, Folder } from "lucide-react";
import { useNavigate } from "react-router";

function CommandLeaf({ command }: { command: Command }) {
  const navigate = useNavigate();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => navigate(`/command/${command.id}`)}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {command.label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function CommandFolderNode({ folder }: { folder: CommandFolder }) {
  const isEmpty = folder.commands.length === 0 && folder.children.length === 0;

  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton className="[&[data-panel-open]_.chevron]:rotate-90">
              <ChevronRight className="chevron transition-transform" />
              <Folder />
              {folder.label}
            </SidebarMenuButton>
          }
        />
        {!isEmpty && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {folder.children.map((child) => (
                <CommandFolderNode key={child.id} folder={child} />
              ))}
              {folder.commands.map((command) => (
                <CommandLeaf key={command.id} command={command} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function SidebarContentTree({ commands, commandFolders }: Tree) {
  return (
    <>
      {commandFolders?.map((folder) => (
        <CommandFolderNode key={folder.id} folder={folder} />
      ))}
      {commands.map((command) => (
        <CommandLeaf key={command.id} command={command} />
      ))}
    </>
  );
}
