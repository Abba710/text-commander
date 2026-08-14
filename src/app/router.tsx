import { Routes, Route } from "react-router";
import App from "./app";
import { AddPage } from "@/page/app-add-page";
import { AppMain } from "@/components";

export default function Router() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<AppMain />} />
        <Route path="/add" element={<AddPage />} />
      </Route>
    </Routes>
  );
}
