export interface PasskeyRegistrationCode {
  id: string;
  code: string;
}

export interface PasskeyRegistrationCodeResponse {
  details: {
    sequence: string;
    changeDate: string;
    resourceOwner: string;
  };
  code: PasskeyRegistrationCode;
}

export interface StartPasskeyRegistrationResponse {
  details: {
    sequence: string;
    changeDate: string;
    resourceOwner: string;
  };
  passkeyId: string;
  publicKeyCredentialCreationOptions: {
    publicKey: {
      attestation: string;
      authenticatorSelection: {
        userVerification: string;
      };
      challenge: string;
      excludeCredentials: Array<{
        id: string;
        type: string;
      }>;
      pubKeyCredParams: Array<{
        alg: number;
        type: string;
      }>;
      rp: {
        id: string;
        name: string;
      };
      timeout: number;
      user: {
        displayName: string;
        id: string;
        name: string;
      };
    };
  };
}
