export type AlertType = "info" | "success" | "warning" | "error";
export type AlertRole = "alert" | "status";

export interface Alert {
  id: string;
  type: AlertType;
  role: AlertRole;
  content: string;
}
