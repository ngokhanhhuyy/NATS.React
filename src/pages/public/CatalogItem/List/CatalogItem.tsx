import { Link } from "react-router";
import { CatalogItemType } from "@/enums/catalogItemType";
import { getCourseDetailRoutePath, getProductDetailRoutePath, getServiceDetailRoutePath }
  from "@/utils/routeUtils";
import { compute } from "@/utils/computeUtils";

// Props.
type CatalogItemProps = {
  model: CatalogItemBasicModel;
  index: number;
}

// Component.
export default function Item(props: CatalogItemProps) {
  // Computed.
  const className = compute<string>(() => {
    return "col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-12 " +
          "justify-self-md-start justify-self-sm-center";
  });

  const thumbnailUrl = compute<string>(() => {
    if (props.model.type == CatalogItemType.Course) {
      return "https://placehold.co/400";
    }

    return props.model.thumbnailUrl;
  });

  const cardBodyClassName = compute<string>(() => {
    return "card-body d-flex flex-column flex-fill justify-content-between align-items-start";
  });

  const detailRoutePath = compute<string>(() => {
    const detailRoutePathGetters = {
      [CatalogItemType.Service]: getServiceDetailRoutePath,
      [CatalogItemType.Course]: getCourseDetailRoutePath,
      [CatalogItemType.Product]: getProductDetailRoutePath,
    };

    return detailRoutePathGetters[props.model.type](props.model.id);
  });

  return (
    <div className={className}>
      <div className="card h-100 shadow-sm">
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          className="card-img-top catalog-item-thumbnail"
          alt={props.model.name}
        />

        <div className={cardBodyClassName}>
          {/* Title */}
          <h5 className="card-title text-success">
            {props.model.name}
          </h5>

          {/* Summary */}
          <span>{props.model.summary}</span>

          {/* LinkToDetail */}
          <Link to={detailRoutePath} className="btn btn-outline-success mt-2">
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}