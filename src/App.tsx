import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/main.css";

// Layout component.
import RootLayout from "@/components/layouts/RootLayout";
import PublicLayout from "./components/layouts/public/PublicLayout";
import PublicSubPageLayout from "@/components/layouts/public/PublicSubPageLayout";
import ProtectedLayout from "./components/layouts/protected/ProtectedLayout";

// Page components.
const HomePage = lazy(() => import("@/pages/public/Home/HomePage"));
const SummaryItemPage = lazy(() => import("@/pages/public/SummaryItem/SummaryItemPage"));
const AboutUsIntroductionPage = lazy(() => {
  return import("@/pages/public/AboutUsIntroduction/AboutUsIntroductionPage");
});

const Dashboard = lazy(() => import("@/pages/protected/Dashboard"));
const SliderItem = lazy(() => import("@/pages/protected/SliderItemPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        Component: PublicLayout,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            element: <PublicSubPageLayout />,
            children: [
              {
                path: "ve-chung-toi",
                element: <AboutUsIntroductionPage />
              },
              {
                path: "gioi-thieu",
                element: <SummaryItemPage />
              }
            ]
          },
        ]
      },
      {
        path: "/admin",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "trinh-chieu-anh",
            element: <SliderItem />
          }
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
