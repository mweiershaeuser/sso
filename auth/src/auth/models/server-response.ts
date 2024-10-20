import { TranslationKey } from "@/i18n/models/translation";

export type ServerResponse<T = void> = T extends void
  ? ServerResponseBase
  : ServerResponseWithData<T>;

interface ServerResponseBase {
  type: "success" | "error";
  message?: string;
  messageT?: TranslationKey;
  errors?: FieldError;
}

interface ServerResponseWithData<T> extends ServerResponseBase {
  data?: T;
}

interface FieldError {
  [key: string]: string;
}
