import { createSession } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import {
  addAlert,
  removeAlert,
  selectAlertWithId,
} from "@/store/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

const usernameFormErrorAlertId = "ERR_USERNAME_FORM";

export default function UsernameForm() {
  const t = useTranslations("Login.LoginForm.UsernameForm");

  const errorAlert = useAppSelector(
    selectAlertWithId(usernameFormErrorAlertId),
  );
  const dispatch = useAppDispatch();

  const [state, formAction] = useFormState(createSession, undefined);
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.user) {
      userRef.current?.focus();
    }
    if (state?.type === "error" && state?.message) {
      dispatch(
        addAlert({
          id: usernameFormErrorAlertId,
          type: "error",
          role: "alert",
          content: state.message,
        }),
      );
    } else if (errorAlert) {
      dispatch(removeAlert(usernameFormErrorAlertId));
    }
  }, [dispatch, state]);

  useEffect(() => {
    return () => {
      dispatch(removeAlert(usernameFormErrorAlertId));
    };
  }, []);

  return (
    <form action={formAction} className="flex flex-col">
      <p>
        <i
          className="bi bi-info-circle-fill"
          aria-label={`${t("required-message.icon-aria-label")}: `}
          role="img"
        ></i>{" "}
        {t("required-message.message")}
      </p>

      <TextInput
        name={"user"}
        label={t("username-input-label")}
        required
        autocomplete="username"
        formState={state}
        inputRef={userRef}
      />

      <div className="form-control mt-3">
        <label className="label cursor-pointer">
          <span className="label-text">
            {t("stay-logged-in-checkbox-label")}
          </span>
          <input
            type="checkbox"
            name="stayLoggedIn"
            className="checkbox checkbox-primary"
          />
        </label>
      </div>

      <input
        type="submit"
        className="btn btn-primary mt-3"
        value={t("submit-button-label")}
      />
    </form>
  );
}
