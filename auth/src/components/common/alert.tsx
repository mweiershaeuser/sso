import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { AlertType } from "../models/alert";

const alertTypeClassMap = new Map<AlertType, string>([
  ["info", "alert-info"],
  ["success", "alert-success"],
  ["warning", "alert-warning"],
  ["error", "alert-error"],
]);
const alertTypeIconMap = new Map<AlertType, string>([
  ["info", "bi-info-circle-fill"],
  ["success", "bi-check-circle-fill"],
  ["warning", "bi-exclamation-circle-fill"],
  ["error", "bi-x-circle-fill"],
]);

export default function Alert({
  type,
  children,
}: {
  type: AlertType;
  children: React.ReactNode;
}) {
  const t = useTranslations("components.common.Alert");
  const alertClass = useMemo(() => alertTypeClassMap.get(type), [type]);
  const alertIcon = useMemo(() => alertTypeIconMap.get(type), [type]);

  return (
    <div className={`alert ${alertClass}`}>
      <i
        className={`bi ${alertIcon}`}
        aria-label={t(`iconAriaLabels.${type}`)}
        role="img"
      ></i>
      {children}
    </div>
  );
}
