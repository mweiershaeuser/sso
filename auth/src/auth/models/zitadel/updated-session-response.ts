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
        publicKey: PublicKeyCredentialRequestOptions;
      };
    };
    otpSms: string;
    otpEmail: string;
  };
}
