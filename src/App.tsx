import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/main.css";

// Layout component.
import RootLayout from "@/components/layouts/RootLayout";
import PublicLayout from "./components/layouts/public/PublicLayout";
import ProtectedLayout from "./components/layouts/protected/ProtectedLayout";

// Page components.
const HomePage = lazy(() => import("@/pages/public/Home/HomePage"));
const SummaryItemPage = lazy(() => import("@/pages/public/SummaryItem/SummaryItemPage"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="ve-chung-toi" element={<>About us</>} />
            <Route path="gioi-thieu" element={<SummaryItemPage />} />
          </Route>

          <Route path="/admin" element={<ProtectedLayout />}>
            <Route index element={<>Dashboard</>} />
            <Route path="ve-chung-toi" element={<>About us</>} />
            <Route path="gioi-thieu" element={<>Summary items</>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
