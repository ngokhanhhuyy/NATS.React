import { compute } from "@/utils/computeUtils";
import styles from "./ApplicationName.module.css";

// Props.
type ApplicationNameProps = {
    model: GeneralSettingsDetailModel;
}

export default function ApplicationName(props: ApplicationNameProps) {
    // Computed.
    const containerClassName = compute<string>(() => {
        return "container-fluid text-center text-white fw-bold p-2 mb-3 shadow " +
            styles.container;
    });
    return (
        <div className={containerClassName}>
          {props.model.applicationName}
        </div>
    );
}