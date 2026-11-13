import {
  AppHeader,
  AppSidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components";
import { Outlet } from "react-router";
import { AuthModal } from "@/components/modal/auth-modal";
import { OfferBanner } from "@/components/app-activation-banner";
export default function App() {
  return (
    <>
      <div className="w-full h-full">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
        <OfferBanner />
      </div>
      <AuthModal />
    </>
  );
}
