import { useEffect, Suspense } from "react";
import { useLocation ,Outlet } from "react-router";
import PageLoadProgressBar from "../ui/ux/PageLoadProgressBar";
import PageLoadProgressBarStarter from "../ui/ux/PageLoadProgressBarStarter";
import PageLoadProgressBarFinisher from "../ui/ux/PageLoadProgressBarFinisher";

export default function RootLayout(): React.ReactNode {
  // Dependencies.
  const location = useLocation();
  
  // Effect.
  useEffect(() => {
    console.log("Mounted");
  }, []);

  return (
    <>
      <PageLoadProgressBar />
      <PageLoadProgressBarStarter key={`starter-${location.pathname}`} />
      <Suspense>
        <Outlet />
        <PageLoadProgressBarFinisher key={`finisher-${location.pathname}`} />
      </Suspense>
    </>
  );
}