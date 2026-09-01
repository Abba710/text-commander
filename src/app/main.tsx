import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/index.css";
import Router from "./router";
import { ThemeProvider } from "@/context/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
