import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function FrontPagesLayout() {
  return (
    <>
      <NavigationBar />

      <main className="flex-shrink-0">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}