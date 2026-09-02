import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./app";
import {
  AddFolderPage,
  AddCommandPage,
  EditCommandPage,
  NotFoundPage,
  HomePage,
  EditFolderPage,
} from "@/page";

const router = createBrowserRouter([
  {
    element: <App />,
    handle: {
      crumb: "Home",
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "add-command",
        element: <AddCommandPage />,
        handle: {
          crumb: "Add Command",
        },
      },
      {
        path: "edit-command/:id",
        element: <EditCommandPage />,
        handle: {
          crumb: "Edit Command",
        },
      },
      {
        path: "add-folder",
        element: <AddFolderPage />,
        handle: {
          crumb: "Add Folder",
        },
      },
      {
        path: "edit-folder/:id",
        element: <EditFolderPage />,
        handle: {
          crumb: "Edit Folder",
        },
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
