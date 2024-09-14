import Link from "next/link";
import AuthWrapper from "./auth-wrapper";

export default function Header() {
  return (
    <div className="navbar m-4 w-auto rounded-lg bg-base-300">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          auth
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <AuthWrapper />
      </div>
    </div>
  );
}
