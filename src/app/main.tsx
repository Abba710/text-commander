import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/index.css";
import Router from "./router";
import { BrowserRouter } from "react-router";

document.documentElement.classList.add("dark");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
);
