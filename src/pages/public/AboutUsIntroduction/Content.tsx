import { compute } from "@/utils/computeUtils";
import styles from "./AboutUsIntroductionPage.module.css";

type ContentProps = {
  model: string;
  title: string;
};

export default function Content(props: ContentProps) {
  // Computed.
  const paragraphs = compute<string[]>(() => {
    return props.model.split(/\r?\n/);
  });

  return (
    <div className="col col-lg-6 col-md-10 col-12">
      <h2 className={styles.contentLabel}>
        {props.title}
      </h2>

      <div className={styles.paragraphContainer}>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}