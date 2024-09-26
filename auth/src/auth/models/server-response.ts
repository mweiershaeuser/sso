export interface ServerResponse {
  type: "success" | "error";
  message?: string;
  errors?: FieldError;
}

export interface FieldError {
  [key: string]: string;
}
