import { cookies } from "next/headers";
import AuthActions from "./auth-actions";

export default function AuthWrapper() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  return (
    <>
      <AuthActions cookies={allCookies} />
    </>
  );
}
