import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/about/About";
import { Home } from "../pages/home/Home";
import MainLayout from "../MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AgentsDetails from "../pages/propertyDetails/AgentsDetails";
import Contact from "../pages/contact/Contact";
import TermAndCondition from "../pages/termAndCondition/TermAndCondition";
import AdDetailPage from "../pages/adDetails/AdDetailPage";
import SearchResults from "../pages/search/SearchResults";
import AdUpload from "../pages/adUpload/AdUpload";
import MyAds from "../pages/myAds/MyAds";
import MyArchive from "../pages/myArchive/MyArchive";
import CompanyAdsPage from "../testingCode/AgentDetailsPage/CompanyAdsPage";
import ProtectedRoute from "../authente/AuthProvideer/ProtectedRoute";
import BuyCredits from "../pages/BuyCredits/BuyCredits";
import Setting from "../pages/settings/Setting";
import Agent from "../pages/agent/Agent";
import PublicRoute from "../authente/AuthProvideer/PublicRoute";
import Sitemap from "../pages/sitemap/Sitemap";
import ResetPassword from "../pages/auth/ResetPassword";

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
        path: "about",
        element: <About />,
      },
      {
        path: "sitemap",
        element: <Sitemap></Sitemap>,
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
        path: "agents",
        element: <Agent />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
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
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "my-ads",
            element: <MyAds />,
          },
          {
            path: "ad-upload",
            element: <AdUpload />,
          },
          {
            path: "my-archives",
            element: <MyArchive />,
          },
          {
            path: "buy-credits",
            element: <BuyCredits />,
          },
          {
            path: "settings",
            element: <Setting />,
          },
        ],
      },
    ],
  },
]);

export { AppRoutes };
