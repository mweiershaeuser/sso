import Link from "next/link";
import AuthWrapper from "./auth-wrapper";
import LocaleSwitch from "./locale-switch";

export default function Header() {
  return (
    <header className="navbar w-full rounded-lg bg-base-200">
      <div className="navbar-start">
        <div className="font-display">
          <Link href="/" className="btn btn-ghost text-2xl">
            <span className="font-light">mw</span>
            <span className="font-bold max-[450px]:hidden">auth</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex gap-3">
        <LocaleSwitch />
        <AuthWrapper />
      </div>
    </header>
  );
}
