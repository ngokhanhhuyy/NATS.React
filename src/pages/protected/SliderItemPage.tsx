import { useState } from "react";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";

async function initializeModelAsync(): Promise<number[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from(Array(10)).map(_ => Math.round(Math.random() * 10)));
    }, 1500);
  });
}

export default function DashboardPage() {
  const initializedModel = useAsyncModelInitializer("sliderItemPage", initializeModelAsync);

  return (
    <h2>Slider items</h2>
  );
}
