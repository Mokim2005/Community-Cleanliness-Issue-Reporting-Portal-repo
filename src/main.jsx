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
import IssueDetails from "./Components/IssusDetails.jsx";
import Error from "./Components/Error.jsx";
import MyContribution from "./Pages/MyContribution.jsx";
import PrivateRoute from "./Components/PrivateRout.jsx";
import MyIssus from "./Pages/MyIssus.jsx";
import { ThemeProvider } from "next-themes";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:3000/issus-single/latest"),
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
        element: (
          <PrivateRoute>
            <AddIssus></AddIssus>
          </PrivateRoute>
        ),
      },
      {
        path: "/issueDetails/:id",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/issus/${params.id}`),
      },
      {
        path: "/myContribution",
        element: (
          <PrivateRoute>
            <MyContribution></MyContribution>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/contributions"),
      },
      {
        path: "/myIssus",
        element: (
          <PrivateRoute>
            <MyIssus></MyIssus>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/issus"),
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
