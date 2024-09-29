import { AuthCheckProp } from "./zitadel/auth-check-prop";
import { AuthMethod } from "./zitadel/auth-method";
import SessionInfo from "./zitadel/session-info";

export interface AuthFactors {
  primary: PrimaryAuthFactor[];
  secondary: SecondaryAuthFactor[];
}

export enum PrimaryAuthFactor {
  PASSWORD = "PASSWORD",
  WEB_AUTH_N = "WEB_AUTH_N",
}

export enum SecondaryAuthFactor {
  TOTP = "TOTP",
}

const authMethodToPrimaryAuthFactorMap = new Map<AuthMethod, PrimaryAuthFactor>(
  [
    [
      AuthMethod.AUTHENTICATION_METHOD_TYPE_PASSWORD,
      PrimaryAuthFactor.PASSWORD,
    ],
    [
      AuthMethod.AUTHENTICATION_METHOD_TYPE_PASSKEY,
      PrimaryAuthFactor.WEB_AUTH_N,
    ],
  ],
);

const authMethodToSecondaryAuthFactorMap = new Map<
  AuthMethod,
  SecondaryAuthFactor
>([[AuthMethod.AUTHENTICATION_METHOD_TYPE_TOTP, SecondaryAuthFactor.TOTP]]);

export function getPrimaryAuthFactorsFromAuthMethods(
  authMethods: AuthMethod[],
) {
  return authMethods
    .map((authMethod) => authMethodToPrimaryAuthFactorMap.get(authMethod))
    .filter((authFactor) => !!authFactor);
}

export function getSecondaryAuthFactorsFromAuthMethods(
  authMethods: AuthMethod[],
) {
  return authMethods
    .map((authMethod) => authMethodToSecondaryAuthFactorMap.get(authMethod))
    .filter((authFactor) => !!authFactor);
}

const authCheckPropToPrimaryAuthFactorMap = new Map<
  AuthCheckProp,
  PrimaryAuthFactor
>([
  ["password", PrimaryAuthFactor.PASSWORD],
  ["webAuthN", PrimaryAuthFactor.WEB_AUTH_N],
]);

const authCheckPropToSecondaryAuthFactorMap = new Map<
  AuthCheckProp,
  SecondaryAuthFactor
>([["totp", SecondaryAuthFactor.TOTP]]);

export function getPrimaryAuthFactorsFromSessionInfo(sessionInfo: SessionInfo) {
  const authCheckProps = Object.keys(
    sessionInfo.session.factors,
  ) as AuthCheckProp[];
  return authCheckProps
    .map((authCheckProp) =>
      sessionInfo.session.factors[authCheckProp].verifiedAt
        ? authCheckPropToPrimaryAuthFactorMap.get(authCheckProp)
        : undefined,
    )
    .filter((authFactor) => !!authFactor);
}

export function getSecondaryAuthFactorsFromSessionInfo(
  sessionInfo: SessionInfo,
) {
  const authCheckProps = Object.keys(
    sessionInfo.session.factors,
  ) as AuthCheckProp[];
  return authCheckProps
    .map((authCheckProp) =>
      sessionInfo.session.factors[authCheckProp].verifiedAt
        ? authCheckPropToSecondaryAuthFactorMap.get(authCheckProp)
        : undefined,
    )
    .filter((authFactor) => !!authFactor);
}
