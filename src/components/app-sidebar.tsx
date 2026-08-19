import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  SidebarHeaderInfo,
  SidebarContentTree,
  SidebarFooterInfo,
} from "./sidebar";
import { useCommandStore } from "@/store/commandStore";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  tree: [
    ["Personal..."],
    [
      "Work",
      ["Sales", ["Sales Outreach"], ["Commercial Proposal"]],
      "Leave request",
      "Reply to Colleague",
    ],
    ["HR"],
    ["Projects"],
    "Quick Reply",
    "Thank You",
  ],
};

export function AppSidebar() {
  const { commands } = useCommandStore();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderInfo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Commands</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarContentTree commands={commands} />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterInfo user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
