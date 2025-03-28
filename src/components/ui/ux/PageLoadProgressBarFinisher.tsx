import { useEffect } from "react";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

export default function PageLoadProgressBarFinisher() {
  // Dependencies.
  const store = usePageLoadProgressBarStore();

  // Effect.
  useEffect(() => {
    console.log(store.phase);
    if (store.phase === "waiting") {
      store.finish();
    }
  }, []);

  return null;
}