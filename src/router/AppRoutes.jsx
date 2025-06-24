import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import About from "../pages/about/About";
import { Home } from "../pages/home/Home";
import MainLayout from "../MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Agent from "../pages/agent/Agent";

import AgentsDetails from "../pages/propertyDetails/AgentsDetails";

import Contact from "../pages/contact/Contact";
import TermAndCondition from "../pages/termAndCondition/TermAndCondition";

import AdDetailPage from "../pages/home/AdDetailPage";
import SearchResults from "../pages/home/SearchResults";
import AdUpload from "../pages/adUpload/AdUpload";

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
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "ads/:slug",
        element: <AdDetailPage />,
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
      {
        path: "agents-details/:id",
        element: <AgentsDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms",
        element: <TermAndCondition />,
      },
      {
        path: "ad-upload",
        element: <AdUpload />,
      },
    ],
  },
]);

export { AppRoutes };
