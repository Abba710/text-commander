import { createRoot } from "react-dom/client";

// ── Shadow DOM mount ──────────────────────────────────────────────────────────
function mount() {
  if (document.getElementById("cs-host")) return;

  const host = document.createElement("div");
  host.id = "cs-host";
  host.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:2147483647;pointer-events:none;";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });
  const mountPoint = document.createElement("div");

  shadow.appendChild(mountPoint);

  createRoot(mountPoint).render(<div>Test</div>);
}

mount();
