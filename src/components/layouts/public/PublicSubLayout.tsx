import { useEffect, useState, type CSSProperties } from "react";
import { Outlet } from "react-router";
import { compute } from "@/utils/computeUtils";

// Layout components.
// import EnquiryForm from "@/components/layout/frontPages/enquiryFormComponent";

// Component.
export default function PublicSubLayout() {
	// States.
	const [title, setTitle] = useState<string>();

	// Effect.
	useEffect(() => {
		setTitle(document.title);
	}, []);

	// Computed.
	const outerContainerClassName = compute<string>((): string => {
		return "container-fluid bg-success-subtle text-white border-bottom border-success p-5";
	});

  const outerContainerStyle = compute<CSSProperties>(() => {
    return {
      backgroundImage: `
        linear-gradient(
            to right,
            rgba(var(--bs-success-rgb), 0.85) 0%,
            rgba(var(--bs-success-rgb), 0.85) 100%),
        url("/images/front-pages/sub-page-title-container-background.webp")
      `
    };
  });

	return (
		<>
			<div className={outerContainerClassName} style={outerContainerStyle}>
				<div className="container p-3">
					<span className="fs-1">{title}</span>
				</div>
			</div>

      <Outlet/>
		</>
	);
}