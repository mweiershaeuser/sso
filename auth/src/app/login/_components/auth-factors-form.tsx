"use client";

import { PrimaryAuthFactor } from "@/auth/models/auth-factors";
import { selectAvailableAuthFactors } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import PasswordForm from "./password_form";

export default function AuthFactorsForm() {
  const availableAuthFactors = useAppSelector(selectAvailableAuthFactors);

  return (
    <>
      {availableAuthFactors.primary.find(
        (authFactor) => authFactor === PrimaryAuthFactor.PASSWORD,
      ) && <PasswordForm />}
    </>
  );
}
