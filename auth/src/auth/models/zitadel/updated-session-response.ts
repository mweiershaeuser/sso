export default interface UpdatedSessionResponse {
  details: {
    sequence: string;
    changeDate: string;
    resourceOwner: string;
  };
  sessionId: string;
  sessionToken: string;
  challenges: {
    webAuthN: {
      publicKeyCredentialRequestOptions: {
        publicKey: {
          allowCredentials: Array<{
            id: string;
            type: string;
          }>;
          challenge: string;
          rpId: string;
          timeout: number;
          userVerification: string;
        };
      };
    };
    otpSms: string;
    otpEmail: string;
  };
}
