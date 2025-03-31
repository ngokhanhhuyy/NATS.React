import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";

// Layout component.
import MainContainer from "@/components/layouts/public/MainContainer";

// Child component.
import SummaryItem from "./SummaryItem";

// Component.
export default function SummaryItemPage() {
  // States.
  const model = useAsyncModelInitializer("summaryItemPage", async () => {
    const responseDtos = await getSummaryItemListAsync();
    return responseDtos.map(dto => createSummaryItemDetailModel(dto));
  });
  const [searchParams] = useSearchParams();
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);

  // Effect.
  useEffect(() => {
    const itemId = searchParams.get("id");
    if (itemId == null) {
      return;
    }

    const parsedItemId = parseInt(itemId);
    if (isNaN(parsedItemId) || !model.map(item => item.id).includes(parsedItemId)) {
      return;
    }

    setCurrentItemId(parsedItemId);

    const itemElement = document.getElementById(itemId);
    if (itemElement) {
      itemElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <MainContainer title="Giới thiệu" className="p-4" fluid={false}>
      {model.map((item, index) => (
        <SummaryItem
          model={item}
          index={index}
          isCurrentId={currentItemId === item.id}
          key={index}
        />
      ))}
    </MainContainer>
  );
}