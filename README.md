# mwauth

This project aims at creating an accessible Single Sign-On (SSO) with support for Multi-Factor-Authentication (MFA) and Passkeys. It has been created in the context of my master's thesis for demonstration and evaluation of the development of accessible authentication means, specifically comparing MFA authentication with Passkeys in this regard.

The SSO is based on [Zitadel](https://github.com/zitadel/zitadel) and introduces a Custom Login UI, implemented with Next.js.

## Features and Status

- General
  - Language Support
    - Deutsch ✅
    - English ✅
- Registration ❌
- Authentication
  - Password ✅
  - MFA
    - TOTP ✅
  - Passkeys ✅
- Account Management
  - User Data ❌
  - Password ❌
  - MFA
    - TOTP ❌
  - Passkeys
    - Create Passkey ✅
    - Multiple Passkeys ❌
    - Delete Passkey ❌
    - Manage Passkeys ❌
- Accessibility
  - WCAG 2.2 Level AA measures taken ✅
