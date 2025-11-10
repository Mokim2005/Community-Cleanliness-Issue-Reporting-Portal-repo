import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import Issus from "./Pages/Issus.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import AddIssus from "./Pages/AddIssus.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/issus",
        Component: Issus,
        loader: () => fetch(`http://localhost:3000/issus`),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/addIssus",
        Component: AddIssus,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
