import {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
} from "@github/webauthn-json/browser-ponyfill";
import {
  createRequestFromJSON,
  createResponseToJSON,
  getRequestFromJSON,
  getResponseToJSON,
} from "@github/webauthn-json/extended";
import { ServerResponse } from "./models/server-response";
import {
  authenticateWithWebauthn,
  completeWebauthnRegistration,
  createWebauthnChallenge,
  startWebauthnRegistration,
} from "./server-actions";

export async function createWebauthnCredential(
  publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions,
): Promise<ServerResponse<Credential>> {
  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    });

    if (!credential) {
      return {
        type: "error",
        messageT:
          "auth.webauthn.createWebauthnCredential.errorMessages.generic",
      };
    }

    return { type: "success", data: credential };
  } catch (error) {
    return {
      type: "error",
      messageT: "auth.webauthn.createWebauthnCredential.errorMessages.generic",
    };
  }
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

  let publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions;

  if (
    typeof (PublicKeyCredential as any).parseCreationOptionsFromJSON !==
    "undefined"
  ) {
    publicKeyCredentialCreationOptions = (
      PublicKeyCredential as any
    ).parseCreationOptionsFromJSON(creationOptions);
  } else {
    publicKeyCredentialCreationOptions = createRequestFromJSON({
      publicKey: creationOptions,
    } as CredentialCreationOptionsJSON).publicKey!;
  }

  const {
    type: credentialSuccess,
    message: credentialError,
    messageT: credentialErrorT,
    data: credentialData,
  } = await createWebauthnCredential(publicKeyCredentialCreationOptions);

  if (credentialSuccess === "error" || !credentialData) {
    return {
      type: "error",
      message: credentialError,
      messageT: credentialErrorT,
    };
  }

  let credentialJson = "{}";

  if (
    typeof (PublicKeyCredential as any).parseCreationOptionsFromJSON !==
    "undefined"
  ) {
    credentialJson = JSON.stringify(credentialData);
  } else {
    credentialJson = JSON.stringify(
      createResponseToJSON(credentialData as PublicKeyCredential),
    );
  }

  const {
    type: completeWebauthnRegistrationSuccess,
    message: completeWebauthnRegistrationError,
    messageT: completeWebauthnRegistrationErrorT,
  } = await completeWebauthnRegistration(passkeyId, credentialJson);

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

  let publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions;

  if (
    typeof (PublicKeyCredential as any).parseRequestOptionsFromJSON !==
    "undefined"
  ) {
    publicKeyCredentialRequestOptions = (
      PublicKeyCredential as any
    ).parseRequestOptionsFromJSON(createWebauthnChallengeData);
  } else {
    publicKeyCredentialRequestOptions = getRequestFromJSON({
      publicKey: createWebauthnChallengeData,
    } as CredentialRequestOptionsJSON).publicKey!;
  }

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

  let credentialJson = "{}";

  if (
    typeof (PublicKeyCredential as any).parseRequestOptionsFromJSON !==
    "undefined"
  ) {
    credentialJson = JSON.stringify(credentialData);
  } else {
    credentialJson = JSON.stringify(
      getResponseToJSON(credentialData as PublicKeyCredential),
    );
  }

  const {
    type: authenticateWithWebauthnSuccess,
    message: authenticateWithWebauthnError,
    messageT: authenticateWithWebauthnErrorT,
  } = await authenticateWithWebauthn(credentialJson);

  if (authenticateWithWebauthnSuccess === "error") {
    return {
      type: "error",
      message: authenticateWithWebauthnError,
      messageT: authenticateWithWebauthnErrorT,
    };
  }

  return { type: "success" };
}
