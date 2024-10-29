import { ServerResponse } from "./models/server-response";
import {
  authenticateWithWebauthn,
  completeWebauthnRegistration,
  createWebauthnChallenge,
  startWebauthnRegistration,
} from "./server-actions";

export async function createWebauthnCredential(
  publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions,
) {
  return navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  });
}

export async function webauthnRegistrationFlow(): Promise<ServerResponse> {
  const {
    type: startWebauthnRegistrationSuccess,
    message: startWebauthnRegistrationError,
    messageT: startWebauthnRegistrationErrorT,
    data: startWebauthnRegistrationData,
  } = await startWebauthnRegistration();

  if (
    startWebauthnRegistrationSuccess === "error" ||
    !startWebauthnRegistrationData
  ) {
    return {
      type: "error",
      message: startWebauthnRegistrationError,
      messageT: startWebauthnRegistrationErrorT,
    };
  }

  const { passkeyId, creationOptions } = startWebauthnRegistrationData;
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
    (PublicKeyCredential as any).parseCreationOptionsFromJSON(creationOptions);

  const credential = await createWebauthnCredential(
    publicKeyCredentialCreationOptions,
  );

  if (!credential) {
    return { type: "error" };
  }

  const {
    type: completeWebauthnRegistrationSuccess,
    message: completeWebauthnRegistrationError,
    messageT: completeWebauthnRegistrationErrorT,
  } = await completeWebauthnRegistration(passkeyId, JSON.stringify(credential));

  if (completeWebauthnRegistrationSuccess === "error") {
    return {
      type: "error",
      message: completeWebauthnRegistrationError,
      messageT: completeWebauthnRegistrationErrorT,
    };
  }

  return { type: "success" };
}

export async function getWebauthnCredential(
  publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions,
) {
  return navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });
}

export async function webauthnLoginFlow(): Promise<ServerResponse> {
  const {
    type: createWebauthnChallengeSuccess,
    message: createWebauthnChallengeError,
    messageT: createWebauthnChallengeErrorT,
    data: publicKeyCredentialRequestOptions,
  } = await createWebauthnChallenge();

  if (
    createWebauthnChallengeSuccess === "error" ||
    !publicKeyCredentialRequestOptions
  ) {
    return {
      type: "error",
      message: createWebauthnChallengeError,
      messageT: createWebauthnChallengeErrorT,
    };
  }

  const credential = await getWebauthnCredential(
    publicKeyCredentialRequestOptions,
  );

  if (!credential) {
    return { type: "error" };
  }

  const {
    type: authenticateWithWebauthnSuccess,
    message: authenticateWithWebauthnError,
    messageT: authenticateWithWebauthnErrorT,
  } = await authenticateWithWebauthn(credential);

  if (authenticateWithWebauthnSuccess === "error") {
    return {
      type: "error",
      message: authenticateWithWebauthnError,
      messageT: authenticateWithWebauthnErrorT,
    };
  }

  return { type: "success" };
}
