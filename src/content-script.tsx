// content/index.tsx
import { createRoot } from "react-dom/client";
import { FieldAutoComplete } from "@/components/autocomplite/field-autocomplete";
import css from "@/index.css?inline";

const host = document.createElement("div");
host.id = "text-commander-root";
document.documentElement.appendChild(host);

const shadow = host.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = css;
shadow.appendChild(style);

const mountPoint = document.createElement("div");
shadow.appendChild(mountPoint);

createRoot(mountPoint).render(<FieldAutoComplete />);
