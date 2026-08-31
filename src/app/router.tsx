import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./app";
import { AddPage } from "@/page/app-add-page";
import { AppMain } from "@/components";
import { LayoutPage } from "@/page/app-layout-page";

const router = createBrowserRouter([
  {
    element: <App />,
    handle: {
      crumb: "Home",
    },
    children: [
      {
        path: "/",
        element: <AppMain />,
      },
      {
        path: "add",
        element: <AddPage />,
        handle: {
          crumb: "Add",
        },
      },
      {
        path: "command/:id",
        element: <LayoutPage />,
        handle: {
          crumb: "Command",
        },
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
