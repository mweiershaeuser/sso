import { AuthFactors } from "./auth-factors";

export default interface AuthState {
  sessionCreated: boolean;
  availableAuthFactors: AuthFactors;
  loggedIn: boolean;
}
