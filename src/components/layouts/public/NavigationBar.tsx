import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { compute } from "@/utils/computeUtils";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  // States.
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  // Computed.
  const navBarCollapseClassName = compute(() => {
    let classNames = styles.navBarCollapse;
    if (isContentVisible) {
      classNames += " show";
    }
    
    return classNames;
  });

  return (
    <nav
      className={`navbar navbar-expand-xl fixed-top shadow fs-5 p-0 ${styles.nav}`}
      data-bs-theme="light"
    >
      <div className="container">
        {/* Main logo */}
        <Link
          to={routeUtils.getHomeRoutePath()}
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <img
            src="/images/main-logo-transparent-white-without-text.png"
            className={`me-2 flex-shrink-0 ${styles.logo}`}
            alt="Main Logo"
          />
          <span className={`fs-2 ${styles.applicationShortName}`}>
            NATS
          </span>
        </Link>

        <button
          className={`navbar-toggler fs-3 me-2 my-0 py-2 ${styles.togglerButton}`}
          id="navbar-toggler-button"
          type="button"
          data-bs-toggle="collapse"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsContentVisible(isVisible => !isVisible)}
        >
          <i className="bi bi-list"></i>
        </button>
        
        <div className={`collapse navbar-collapse ${navBarCollapseClassName}`}>
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.itemListContainer}`}>
            {/* Home */}
            <NavigationItem path={routeUtils.getHomeRoutePath()}>
              Trang chủ
            </NavigationItem>

            {/* SummaryItem */}
            <NavigationItem path={routeUtils.getSummaryItemsRoutePath()}>
              Giới thiệu
            </NavigationItem>

            {/* AboutUsIntroduction */}
            <NavigationItem path={routeUtils.getAboutUsIntroductionRoutePath()}>
              Về chúng tôi
            </NavigationItem>

            {/* CatalogItem - Services */}
            <NavigationItem path={routeUtils.getServiceListRoutePath()}>
              Dịch vụ
            </NavigationItem>

            {/* CatalogItem - Course */}
            <NavigationItem path={routeUtils.getCourseListRoutePath()}>
              Khoá học
            </NavigationItem>

            {/* CatalogItem - Product */}
            <NavigationItem path={routeUtils.getProductListRoutePath()}>
              Sản phẩm
            </NavigationItem>

            {/* Contacts */}
            <NavigationItem path={routeUtils.getContactsRoutePath()}>
              Liên hệ
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavigationItem(props: { path: string, children: ReactNode | ReactNode[] }) {
  // Dependencies.
  const location = useLocation();

  // Computed.
  const itemClassName = compute(() => {
    const classNames = [styles.link];
    const pathName = location.pathname;
    if ((pathName === "/" && props.path === "/") ||
      (props.path !== "/" && pathName.startsWith(props.path))) {
      classNames.push("active");
    }

    return classNames.join(" ");
  });

  return (
    <li className="nav-item">
      <Link to={props.path} className={`nav-link ${itemClassName}`}>
        {props.children}
      </Link>
    </li>
  );
}