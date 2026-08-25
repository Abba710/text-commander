import {
  AppHeader,
  AppSidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="w-full h-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
