import { useEffect, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { compute } from "@/utils/computeUtils";

// Props.
type MainContainerProps = {
    title: string;
    children: ReactNode | ReactNode[];
    fluid?: boolean;
} & ComponentPropsWithoutRef<"div">;

// Component.
export default function MainContainer(props: MainContainerProps) {
    // Effect.
    useEffect(() => {
        document.title = props.title;
    }, []);

    // Computed.
    const className = compute<string>(() => {
        let containerClassName: string = "container";
        if (props.fluid == null || props.fluid) {
            containerClassName = "container-fluid";
        }
        
        let name = `${containerClassName} fade-animation fade-animation-reverse`;
        if (props.className) {
            name += ` ${props.className}`;
        }

        return name;
    });

    return (
        <div className={className}>
            {props.children}
        </div>
    );
}