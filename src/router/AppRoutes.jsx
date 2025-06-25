import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/about/About";
import { Home } from "../pages/home/Home";
import MainLayout from "../MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Agent from "../pages/agent/Agent";

import AgentsDetails from "../pages/propertyDetails/AgentsDetails";

import Contact from "../pages/contact/Contact";
import TermAndCondition from "../pages/termAndCondition/TermAndCondition";
import AdDetailPage from "../pages/adDetails/AdDetailPage";
import SearchResults from "../pages/search/SearchResults";

import AdUpload from "../pages/adUpload/AdUpload";

import MyAds from "../pages/myAds/MyAds";
import MyArchive from "../pages/myArchive/MyArchive";

import AgentList from "../testingCode/AgentList";
import CompanyAdsPage from "../testingCode/AgentDetailsPage/CompanyAdsPage";
import TestRegister from "../TestingPage/TestRegister";
import ProtectedRoute from "../authente/AuthProvideer/ProtectedRoute";
import BuyCredits from "../pages/BuyCredits/BuyCredits";

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
      // {
      //   path: "agents",
      //   element: <Agent />,
      // },
      {
        path: "my-ads",
        element: <MyAds />,
      },
      {
        path: "my-archives",
        element: <MyArchive />,
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

      {
        path: "agents",
        element: <AgentList />,
      },
      {
        path: "agents-details/:id",
        element: <AgentsDetails />,
      },
      {
        path: "agent/:companyId/ads",
        element: <CompanyAdsPage />,
      },

      {
        path: "buy-credits",
        element: <BuyCredits />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "testingpage",
            element: <TestRegister></TestRegister>,
          },
        ],
      },
    ],
  },
]);

export { AppRoutes };
