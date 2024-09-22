import { getAuthState } from "@/auth/server-operations";
import { redirect } from "next/navigation";

export default async function Account() {
  const authState = await getAuthState();

  if (!authState.loggedIn) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1>Account</h1>
    </div>
  );
}
