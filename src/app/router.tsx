import { Routes, Route } from "react-router";
import App from "./app";
import { AddPage } from "@/page/app-add-page";
import { AppMain } from "@/components";
import { LayoutPage } from "@/page/app-layout-page";

export default function Router() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<AppMain />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/command/:id" element={<LayoutPage />} />
      </Route>
    </Routes>
  );
}
