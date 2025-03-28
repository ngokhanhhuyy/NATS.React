import { Link } from "react-router";
import { compute } from "@/utils/computeUtils";
import styles from "./SummaryItemList.module.css";

// Props.
type SummaryItemListProps = {
  model: SummaryItemDetailModel[];
};

export default function SummaryItemList(props: SummaryItemListProps) {
  // Computed.
  const linkClassName = compute(() => {
    return `col col-xl-3 col-md-6 col-12 d-flex flex-column align-items-center ${styles.link}`;
  });

  return (
    <div className="container mb-3 p-4">
      <div className="row g-3">
        {props.model.map((item, index) => (
          <Link to={item.detailRoute} className={linkClassName} key={index}>
            <img
              className={`rounded-circle mb-3 ${styles.thumbnail}`}
              style={{ objectFit: "cover" }}
              src={item.thumbnailUrl}
              alt={item.name}
            />

            <h2 className="text-center text-success mb-2">
              {item.name}
            </h2>

            <p>{item.summaryContent}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}