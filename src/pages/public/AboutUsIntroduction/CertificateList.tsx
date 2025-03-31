import { compute } from "@/utils/computeUtils";
import styles from "./AboutUsIntroductionPage.module.css";

export default function CertificateList(props: { model: CertificateDetailModel[] }) {
  // Computed.
  const itemContainerClassName = compute<string>(() => {
    return "d-flex flex-column justify-content-stretch align-items-stretch";
  });

  return (
    <>
      <div className="col col-lg-12 col-md-10 col-12">
        <h2 className={`text-center ${styles.contentLabel}`}>Chứng chỉ</h2>
      </div>

      {props.model.map((certificate) => (
        <div className="col col-xl-5 col-md-10 col-12" key={certificate.id}>
          <div className={itemContainerClassName}>
            {/* Thumbnail */}
            <img
              className="img-thumbnail rounded-3 shadow"
              src={certificate.thumbnailUrl}
              alt={certificate.name}
            />

            {/* Title */}
            <div className="text-center mt-2 fw-bold text-success">
              {certificate.name}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}