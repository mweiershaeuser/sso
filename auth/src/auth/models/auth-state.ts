import { AuthFactors } from "./auth-factors";

export default interface AuthState {
  sessionCreated: boolean;
  availableAuthFactors: AuthFactors;
  authenticatedAuthFactors: AuthFactors;
  loggedIn: boolean;
}
