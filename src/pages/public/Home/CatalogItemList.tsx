import { Link } from "react-router";
import { compute } from "@/utils/computeUtils";
import styles from "./CatalogItemList.module.css";

// Props.
type Props = {
  title: string;
  model: CatalogItemBasicModel[];
};

export default function CatalogItemList(props: Props) {
  // Computed.
  const columnClassName = compute(() => {
    return (
      "col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-12 \
      justify-self-md-start justify-self-sm-center"
    );
  });

  const bodyClassName = compute(() => {
    return "card-body d-flex flex-column flex-fill justify-content-between align-items-start";
  });

  return (
    <div className="container mt-4 mb-3">
      <h2 className="text-success text-center">
        {props.title}
      </h2>
      <div className={`row g-3 p-3 align-items-stretch ${styles.catalogItemRow}`}>
        {props.model.map((item, index) => (
          <div className={columnClassName} key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.thumbnailUrl}
                className={`card-img-top ${styles.catalogItemThumbnail}`}
                style={{ aspectRatio: 1 }}
                alt={item.name}
              />

              <div className={bodyClassName}>
                <h5 className="card-title">
                  {item.name}
                </h5>

                <Link to={item.detailRoute} className="btn btn-outline-success mt-2">
                  Chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}