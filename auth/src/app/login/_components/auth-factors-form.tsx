"use client";

import {
  PrimaryAuthFactor,
  SecondaryAuthFactor,
} from "@/auth/models/auth-factors";
import {
  selectAuthenticatedAuthFactors,
  selectAvailableAuthFactors,
} from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import PasswordForm from "./password-form";
import TotpForm from "./totp-form";
import WebauthnForm from "./webauthn-form";

export default function AuthFactorsForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm");

  const availableAuthFactors = useAppSelector(selectAvailableAuthFactors);
  const authenticatedAuthFactors = useAppSelector(
    selectAuthenticatedAuthFactors,
  );

  return (
    <div className="mt-5">
      {/* Primary Factors */}

      {availableAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.WEB_AUTH_N,
      ) &&
        !authenticatedAuthFactors.primary.find(
          (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
        ) && (
          <>
            <WebauthnForm />
            <div className="divider">{t("dividerText")}</div>
          </>
        )}

      {availableAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
      ) &&
        !authenticatedAuthFactors.primary.find(
          (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
        ) && <PasswordForm />}

      {/* Secondary Factors */}

      {authenticatedAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
      ) &&
        availableAuthFactors.secondary.find(
          (authFactor) => authFactor === SecondaryAuthFactor.TOTP,
        ) && <TotpForm />}
    </div>
  );
}
