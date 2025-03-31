import { Suspense } from "react";
import { Outlet } from "react-router";

export default function RootLayout(): React.ReactNode {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}