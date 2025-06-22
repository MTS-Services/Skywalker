import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import About from "../pages/about/About";
import { Home } from "../pages/home/Home";
import MainLayout from "../MainLayout";
import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";
import Agent from "../pages/agent/Agent";


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "agents",
        element: <Agent />,
      },
    ],
  },
]);

export { AppRoutes };
