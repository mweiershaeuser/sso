export default interface SessionInfo {
  session: {
    id: string;
    creationDate: string;
    changeDate: string;
    sequence: string;
    factors: {
      user: {
        verifiedAt: string;
        id: string;
        loginName: string;
        displayName: string;
        organizationId: string;
      };
      password: {
        verifiedAt: string;
      };
      webAuthN: {
        verifiedAt: string;
        userVerified: boolean;
      };
      intent: {
        verifiedAt: string;
      };
      totp: {
        verifiedAt: string;
      };
      otpSms: {
        verifiedAt: string;
      };
      otpEmail: {
        verifiedAt: string;
      };
    };
    metadata: {};
    userAgent: {
      fingerprintId: string;
      ip: string;
      description: string;
      header: {};
    };
    expirationDate: string;
  };
}
