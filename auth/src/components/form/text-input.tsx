import { ServerResponse } from "@/auth/models/server-response";
import {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  RefObject,
} from "react";

export function TextInput({
  name,
  label,
  type = "text",
  required = false,
  autocomplete,
  formState,
  inputRef,
}: {
  name: string;
  label: string;
  type?: Extract<HTMLInputTypeAttribute, "text" | "password">;
  required?: boolean;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  formState?: ServerResponse;
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span
            className={`label-text ${formState?.errors?.[name] && "text-error"}`}
          >
            {label}
            {required && <span aria-hidden> *</span>}
          </span>
        </div>
        <input
          type={type}
          name={name}
          ref={inputRef}
          className={`input input-primary input-bordered ${formState?.errors?.[name] && "input-error"}`}
          autoComplete={autocomplete}
          aria-required={required}
          aria-invalid={!!formState?.errors?.[name]}
          aria-describedby={`${name}Error`}
        />
      </label>
      {formState?.errors?.[name] && (
        <p id={`${name}Error`} className="m-0 text-error">
          <i
            className="bi bi-exclamation-circle-fill"
            aria-label="Fehler: "
            role="img"
          ></i>{" "}
          {formState?.errors?.[name]}
        </p>
      )}
    </>
  );
}
