import { useEffect } from "react";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

export default function PageLoadProgressBarStarter() {
  // Dependencies.
  const start = usePageLoadProgressBarStore(store => store.start);

  // Effect.
  useEffect(() => {
    start();
  }, []);

  return null;
}