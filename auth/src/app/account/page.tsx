import { getAuthState } from "@/auth/server-operations";
import { redirect } from "next/navigation";
import UserDetails from "./_components/user-details";

export default async function Account() {
  const authStateResponse = await getAuthState();

  if (!authStateResponse.data?.loggedIn) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="!font-sans font-normal badge badge-neutral p-4">
        Account
      </h1>
      <UserDetails />
    </div>
  );
}
