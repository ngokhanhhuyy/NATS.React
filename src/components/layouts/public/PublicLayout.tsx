import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function FrontPagesLayout() {
  return (
    <>
      <NavigationBar />
      <main className="d-flex flex-column flex-fill flex-shrink-0
                      fade-animation fade-animation-reverse">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}