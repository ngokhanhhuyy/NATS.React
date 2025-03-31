import type { CSSProperties } from "react";
import { compute } from "@/utils/computeUtils";
import styles from "./SummaryItem.module.css";

// Props.
type SummaryItemProps = {
  model: SummaryItemDetailModel;
  index: number;
  isCurrentId: boolean;
}

export default function SummaryItem(props: SummaryItemProps) {
  // Computed.
  const containerClassName = compute<string>(() => {
    const classList = [
      "row gx-5 gy-3 mb-3 justify-content-center",
      styles.itemRow,
      props.isCurrentId && styles.blinkingAnimation
    ];

    return classList.filter(name => name).join(" ");
  });

  const thumbnailStyle = compute<CSSProperties>(() => {
    return {
      width: 250,
      height: "auto",
      aspectRatio: 1,
      objectFit: "cover",
      objectPosition: "50%"
    };
  });

  const thumbnailColumnClassName = compute<string>(() => {
    return [
      "col col-lg-auto col-md-10 col-12 d-flex justify-content-center align-items-start",
      `order-lg-${props.index % 2}`
    ].filter(name => name).join(" ");
  });
  const detailColumnClassName = compute<string>(() => `order-lg-${(props.index + 1) % 2}`);
  const nameClassName = compute<string>(() => {
    let className: string = "text-center";
    if (props.index % 2 == 0) {
      className += " text-lg-start";
    } else {
      className += " text-lg-end";
    }

    return className;
  });

  return (
    <div className={containerClassName} id={props.model.id.toString()}>
      {/* Thumbnail */}
      <div className={thumbnailColumnClassName}>
        <img
          src={props.model.thumbnailUrl}
          className="rounded-circle shadow"
          style={thumbnailStyle}
          alt={props.model.name}
        />
      </div>

      {/* Detail */}
      <div className={`col col-lg col-md-10 col-12 ${detailColumnClassName}`}>
        {/* Name */}
        <h2 className={`text-success ${nameClassName}`}>
          {props.model.name}
        </h2>

        {/* DetailContent */}
        {props.model.detailContent.split(/\r?\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}