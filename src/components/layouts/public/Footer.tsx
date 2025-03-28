import { Link } from "react-router";
import { getContactListAsync } from "@/services/contactService";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { ContactType } from "@/enums/contactType";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";
import { compute } from "@/utils/computeUtils";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./Footer.module.css";

// Props.
type Model = {
  contacts: ContactDetailModel[];
  generalSettings: GeneralSettingsDetailModel;
}

export default function Footer() {
  // States.
  const model = useAsyncModelInitializer("footer", async () => {
    const [contactResponseDtos, generalSettingsResponseDto] = await Promise.all([
      getContactListAsync(),
      getGeneralSettingsAsync()
    ]);

    return {
      contacts: contactResponseDtos.map(dto => createContactDetailModel(dto)),
      generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    } satisfies Model;
  });

  // Computed.
  const footerClassName = compute<string>(() => (
    `container-fluid bg-dark position-relative h-auto flex-shrink-0 ${styles.footer}`
  ));

  return (
    <footer className={footerClassName}>
      <div className="container text-white">
        <div className="row g-4 m-4 justify-content-center align-items-stretch">
          {/* As - Left/Top column */}
          <div className={`col col-xl-2 col-lg-3 col-sm-6 col-12 ${styles.linksColumn}`}>
            <span className="fw-bold fs-5 opacity-75">
              Công ty
            </span>

            {/* SummaryItems */}
            <Link to={routeUtils.getSummaryItemsRoutePath()}>
              Giới thiệu
            </Link>

            {/* AboutUs */}
            <Link to={routeUtils.getAboutUsIntroductionRoutePath()}>
              Về chúng tôi
            </Link>

            {/* News */}
            <Link to="#" type="button">
              Tin tức
            </Link>

            {/* Contacts */}
            <Link to={routeUtils.getContactsRoutePath()}>
              Liên hệ
            </Link>
          </div>

          {/* As - Right/Bottom column */}
          <div className={`col col-xl-2 col-lg-3 col-sm-6 col-12 ${styles.linksColumn}`}>
            <span className="fw-bold fs-5 opacity-75">
              Lĩnh vực
            </span>

            {/* Services */}
            <Link to={routeUtils.getServiceListRoutePath()}>
              Dịch vụ
            </Link>

            {/* Courses */}
            <Link to={routeUtils.getCourseListRoutePath()}>
              Khóa học
            </Link>
          </div>

          {/* Contacts */}
          <div className="col col-xl-5 col-lg-6 col-12">
            <span className="fw-bold fs-5 opacity-75">
              Liên hệ
            </span>

            {model.contacts.map(contact => (
              <Contact model={contact} key={contact.id} />
            ))}
          </div>


          {/* Logo */}
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div
              className={
                "border border-4 rounded-circle d-flex justify-content-center " +
                `align-items-center ${styles.logoContainer}`
              }
            >
              <img src="/images/main-logo-transparent-white.png" alt="Logo" />
            </div>

            <h5 className="text-center mt-3 text-white">
              {model.generalSettings.applicationName}
            </h5>
          </div>

          {/* Copyright */}
          <div className="col col-12 text-center">
            Bản quyền ©2025&nbsp;
            <a
              href="https://facebook.com/huy.nino.97"
              className="fw-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ngô Khánh Huy
            </a>.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Contact(props: { model: ContactDetailModel }) {
  // Computed.
  function computeZaloUrl(): string {
    return "https://zalo.me/" + props.model.content
      .replaceAll(" ", "")
      .replaceAll("+84", "0");
  }

  function ContactLink() {
    switch (props.model.type) {
      case ContactType.PhoneNumber:
        return (
          <a href={`tel:${props.model.content}`}>
            {props.model.content}
          </a>
        );
      case ContactType.ZaloNumber:
        return (
          <a href={computeZaloUrl()} target="_blank" rel="noopener noreferrer">
            {props.model.content}
          </a>
        );
      case ContactType.Email:
        return (
          <a href={`mailto:${props.model.content}`}>
            {props.model.content}
          </a>
        );
      case ContactType.Address:
        return (
          <a
            href={`https://maps.google.com/?q=${props.model.encodedContent}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.model.content}
          </a>
        );
      default:
        return null;
    }
  }

  return (
    <div className="my-2">
      {/* Label */}
      <i className={`bi ${props.model.iconClassName} me-2`}></i>

      {/* Content */}
      <ContactLink />
    </div>
  );
}