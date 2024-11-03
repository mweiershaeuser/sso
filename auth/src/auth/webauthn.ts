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
): Promise<ServerResponse<Credential>> {
  try {
    const credential = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    });

    if (!credential) {
      return {
        type: "error",
        messageT: "auth.webauthn.getWebauthnCredential.errorMessages.generic",
      };
    }

    return { type: "success", data: credential };
  } catch (error) {
    return {
      type: "error",
      messageT: "auth.webauthn.getWebauthnCredential.errorMessages.generic",
    };
  }
}

export async function webauthnLoginFlow(): Promise<ServerResponse> {
  const {
    type: createWebauthnChallengeSuccess,
    message: createWebauthnChallengeError,
    messageT: createWebauthnChallengeErrorT,
    data: createWebauthnChallengeData,
  } = await createWebauthnChallenge();

  if (
    createWebauthnChallengeSuccess === "error" ||
    !createWebauthnChallengeData
  ) {
    return {
      type: "error",
      message: createWebauthnChallengeError,
      messageT: createWebauthnChallengeErrorT,
    };
  }

  const publicKeyCredentialRequestOptions = (
    PublicKeyCredential as any
  ).parseRequestOptionsFromJSON(createWebauthnChallengeData);

  const {
    type: credentialSuccess,
    message: credentialError,
    messageT: credentialErrorT,
    data: credentialData,
  } = await getWebauthnCredential(publicKeyCredentialRequestOptions);

  if (credentialSuccess === "error" || !credentialData) {
    return {
      type: "error",
      message: credentialError,
      messageT: credentialErrorT,
    };
  }

  const {
    type: authenticateWithWebauthnSuccess,
    message: authenticateWithWebauthnError,
    messageT: authenticateWithWebauthnErrorT,
  } = await authenticateWithWebauthn(JSON.stringify(credentialData));

  if (authenticateWithWebauthnSuccess === "error") {
    return {
      type: "error",
      message: authenticateWithWebauthnError,
      messageT: authenticateWithWebauthnErrorT,
    };
  }

  return { type: "success" };
}
