"use client";

import Alert from "@/components/common/alert";
import { selectAlert } from "@/store/alert/alertSlice";
import { useAppSelector } from "@/store/hooks";

export default function Alerts() {
  const alerts = useAppSelector(selectAlert);

  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-col gap-3" aria-live="assertive">
        {alerts
          .filter((alert) => alert.role === "alert")
          .map((alert) => (
            <Alert key={alert.id} type={alert.type}>
              <p className="m-0">{alert.content}</p>
            </Alert>
          ))}
      </div>
      <div className="flex flex-col gap-3" aria-live="polite">
        {alerts
          .filter((alert) => alert.role === "status")
          .map((alert) => (
            <Alert key={alert.id} type={alert.type}>
              <p className="m-0">{alert.content}</p>
            </Alert>
          ))}
      </div>
    </div>
  );
}
