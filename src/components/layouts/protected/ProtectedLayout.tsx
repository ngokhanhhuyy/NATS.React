import { Outlet } from "react-router";

export default function ProtectedLayout() {
  return (
    <>
      <h1>AdminLayout</h1>
      <Outlet />
    </>
  );
}