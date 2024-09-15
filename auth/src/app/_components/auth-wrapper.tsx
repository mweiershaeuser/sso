import { getAuthState, getUser } from "@/auth/server-operations";
import AuthActions from "./auth-actions";

export default async function AuthWrapper() {
  const authState = await getAuthState();
  const user = await getUser();

  return (
    <>
      <AuthActions authState={authState} user={user} />
    </>
  );
}
