import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";
import styles from "./CatalogItemListPage.module.css";

// Child components.
import CatalogItem from "./CatalogItem";

// Component.
export default function ListPage() {
  return (
    <>
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
    </>
  );
}

