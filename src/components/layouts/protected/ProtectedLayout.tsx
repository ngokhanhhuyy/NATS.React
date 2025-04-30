import { useState, useCallback, useEffect, startTransition } from "react";
import { useLocation, useBlocker, Outlet, Link } from "react-router";

export default function ProtectedLayout() {
  const location = useLocation();

  const [key, setKey] = useState<number>(0);
  const [shouldBlock, setShouldBlock] = useState<boolean>(true);
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    console.log(blocker.state);
    setKey(key => key + 1);
    if (blocker.state === "blocked") {
      startTransition(() => {
        setShouldBlock(false);
        blocker.proceed?.();
      });
    } else {
      setShouldBlock(true);
    }
  }, [blocker.state]);

  
  return (
    <>
      <div className="d-flex flex-column">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/trinh-chieu-anh">Slider items</Link>
      </div>
      <h1>AdminLayout</h1>
      <span>{location.pathname}</span><br/>
      <span>{key}</span>
      <Outlet />
      {JSON.stringify({
        key,
        blockerState: blocker.state
      }, null, 2)}
    </>
  );
}