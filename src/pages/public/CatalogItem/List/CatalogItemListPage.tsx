import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";
import styles from "./CatalogItemListPage.module.css";

// Layout component.
import MainContainer from "@/components/layouts/public/MainContainer";

// Child components.
import CatalogItem from "./CatalogItem";

// Component.
export default function ListPage() {
  const model = useAsyncModelInitializer("catalogItemList")

  return (
    <MainContainer title={}>
      <div className="container my-3 align-items-center">
        {props.model.length > 0 ? (
          <div className={`row g-3 p-3 ${styles.catalogItemsRow}`}>
            {props.model.map((item, index) => (
              <CatalogItem model={item} index={index} key={index} />
            ))}
          </div>
        ) : (
          <div className="opacity-50 text-center">
            Không có {props.typeDisplayName.toLowerCase()} nào
          </div>
        )}
      </div>
    </MainContainer>
  );
}

