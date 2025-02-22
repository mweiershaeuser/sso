import { getAuthState, getUser } from "@/auth/server-operations";
import AuthActions from "./auth-actions";

export default async function AuthWrapper() {
  const authStateResponse = await getAuthState();
  const userResponse = await getUser();

  return (
    <>
      <AuthActions
        authStateResponse={authStateResponse}
        userResponse={userResponse}
      />
    </>
  );
}
