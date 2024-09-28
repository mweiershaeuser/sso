import Link from "next/link";
import AuthWrapper from "./auth-wrapper";

export default function Header() {
  return (
    <div className="navbar w-full rounded-lg bg-base-300">
      <div className="navbar-start">
        <div className="font-display">
          <Link href="/" className="btn btn-ghost text-2xl">
            <span className="font-light">mw</span>
            <span className="font-bold">auth</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <AuthWrapper />
      </div>
    </div>
  );
}
