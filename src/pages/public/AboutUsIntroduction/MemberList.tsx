import { Fragment } from "react";
import { compute } from "@/utils/computeUtils";
import styles from "./AboutUsIntroductionPage.module.css";

type MemberListProps = {
  model: MemberDetailModel[];
};

export default function MemberList(props: MemberListProps) {
  // Computed.
  const itemContainerClassName = compute<string>(() => {
    return "col col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12 " +
          "d-flex flex-column align-items-center justify-content-start";
  });

  const fullNameClassName = compute<string>(() => {
    return "fs-4 fw-bold bg-success-subtle border border-success-subtle " +
            "rounded text-success px-2 text-success";
  });

  function splitToParagraphs(detailContent: string): string[] {
    return detailContent.split(/\r?\n/);
  }

  return (
    <>
      <div className="col col-lg-12 col-md-10 col-12">
        <h2 className={`text-center ${styles.contentLabel}`}>
          Đội ngũ của chúng tôi
        </h2>
      </div>
      
      {props.model.map(member => (
        <div className={itemContainerClassName} key={member.id}>
          <img
            src={member.thumbnailUrl}
            className={`mb-3 shadow ${styles.memberThumbnail}`}
            alt={member.fullName}
          />

          {/* FullName */}
          <span className={fullNameClassName}>
            {member.fullName}
          </span>

          {/* RoleName */}
          <span className="my-2 text-success">{member.roleName}</span>

          {/* Description */}
          {splitToParagraphs(member.description).map((paragraph, index, paragraphs) => (
            <Fragment key={index}>
              {paragraph}
              {index < paragraphs.length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
}