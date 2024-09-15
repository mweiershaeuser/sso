export default interface UserInfo {
  details: {
    sequence: string;
    changeDate: string;
    resourceOwner: string;
  };
  user: {
    userId: string;
    details: {
      sequence: string;
      changeDate: string;
      resourceOwner: string;
    };
    state: string;
    username: string;
    loginNames: string[];
    preferredLoginName: string;
    human: {
      userId: string;
      state: string;
      username: string;
      loginNames: string[];
      preferredLoginName: string;
      profile: {
        givenName: string;
        familyName: string;
        nickName: string;
        displayName: string;
        preferredLanguage: string;
        gender: string;
        avatarUrl: string;
      };
      email: {
        email: string;
        isVerified: boolean;
      };
      phone: {
        phone: string;
        isVerified: boolean;
      };
      passwordChangeRequired: boolean;
      passwordChanged: string;
    };
    machine: {
      name: string;
      description: string;
      hasSecret: string;
      accessTokenType: string;
    };
  };
}
