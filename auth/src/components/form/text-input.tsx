import { ServerResponse } from "@/auth/models/server-response";
import { useTranslations } from "next-intl";
import {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  RefObject,
} from "react";

export function TextInput({
  name,
  label,
  description,
  type = "text",
  required = false,
  autocomplete,
  inputMode = "text",
  formState,
  inputRef,
}: {
  name: string;
  label: string;
  description?: string;
  type?: Extract<HTMLInputTypeAttribute, "text" | "password">;
  required?: boolean;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  formState?: ServerResponse;
  inputRef?: RefObject<HTMLInputElement>;
}) {
  const t = useTranslations("components.form.TextInput");

  return (
    <>
      <label className="form-control">
        <div className="label">
          <span
            className={`label-text ${formState?.errors?.[name] && "text-error"}`}
          >
            {label}
            {required && <span> *</span>}
          </span>
        </div>
        <input
          type={type}
          name={name}
          ref={inputRef}
          className={`input input-primary input-bordered ${formState?.errors?.[name] && "input-error"}`}
          autoComplete={autocomplete}
          inputMode={inputMode}
          aria-required={required}
          aria-invalid={!!formState?.errors?.[name]}
          aria-describedby={`${name}Description ${name}Error`}
        />
      </label>
      {!!description && (
        <p id={`${name}Description`} className="mt-1 mb-2 px-1 text-sm">
          <i
            className="bi bi-info-circle-fill"
            aria-label={`${t("descriptionIconAriaLabel")}: `}
            role="img"
          ></i>{" "}
          {description}
        </p>
      )}
      <div aria-live="polite">
        {formState?.errors?.[name] && (
          <p
            id={`${name}Error`}
            className={`${!description ? "mt-1" : "mt-0"} mb-2 px-1 text-sm text-error`}
          >
            <i
              className="bi bi-exclamation-circle-fill"
              aria-label={`${t("errorMessageIconAriaLabel")}: `}
              role="img"
            ></i>{" "}
            {formState?.errors?.[name]}
          </p>
        )}
      </div>
    </>
  );
}
