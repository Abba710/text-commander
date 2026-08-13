import {
  AppHeader,
  AppSidebar,
  AppMain,
  SidebarInset,
  SidebarProvider,
} from "@/components";

export default function App() {
  return (
    <div className="w-full h-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <AppMain />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
