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
import PasswordForm from "./password-form";
import TotpForm from "./totp-form";

export default function AuthFactorsForm() {
  const availableAuthFactors = useAppSelector(selectAvailableAuthFactors);
  const authenticatedAuthFactors = useAppSelector(
    selectAuthenticatedAuthFactors,
  );

  return (
    <>
      {availableAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
      ) &&
        !authenticatedAuthFactors.primary.find(
          (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
        ) && <PasswordForm />}
      {authenticatedAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
      ) &&
        availableAuthFactors.secondary.find(
          (authFactor) => authFactor === SecondaryAuthFactor.TOTP,
        ) && <TotpForm />}
    </>
  );
}
