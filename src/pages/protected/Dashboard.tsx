import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";

async function initializeModelAsync(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });
}

export default function DashboardPage() {
  useAsyncModelInitializer("dashboardPage", initializeModelAsync);
  return <h2>Dashboard</h2>;
}
