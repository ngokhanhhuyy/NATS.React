import { Link } from "react-router";
import { compute } from "@/utils/computeUtils";

// Props.
type AboutUsIntroductionProps = {
  model: AboutUsIntroductionDetailModel;
}

export default function AboutUsIntroduction(props: AboutUsIntroductionProps) {
  // Computed.
  const thumbnailColumnClassName = compute<string>(() => {
    return "col col-xl-6 col-lg-8 col-12 overflow-hidden d-flex align-items-center p-4";
  });

  const paragraphColumnClassName = compute<string>(() => {
    return (
      "col-xl col-lg-8 col p-4 pt-3 d-flex flex-column\
      justify-content-center align-items-start"
    );
  });

  return (
    <div className="container-fluid bg-success text-white fs-5 mb-5 shadow">
      <div className="container">
        <div className="row justify-content-center align-items-stretch">
          <div className={thumbnailColumnClassName}>
            <img
              src={props.model.thumbnailUrl}
              className="w-100 h-auto rounded-3"
              alt="Về chúng tôi"
            />
          </div>
          <div className={paragraphColumnClassName}>
            <h2 className="mb-2">Về chúng tôi</h2>
            <p>{props.model.aboutUsContent}</p>
            <Link to={props.model.detailRoute} className="btn btn-outline-light mt-3">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}