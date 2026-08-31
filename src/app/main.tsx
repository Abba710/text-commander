import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/index.css";
import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  </StrictMode>,
);
