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
            {data.tree.map((item, index) => (
              <SidebarContentTree key={index} item={item} />
            ))}
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
