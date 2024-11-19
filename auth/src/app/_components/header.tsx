import Logo from "@/components/common/logo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Nav from "../../components/common/nav";
import AuthWrapper from "./auth-wrapper";
import LocaleSwitch from "./locale-switch";
import Menu from "./menu";

export default function Header() {
  const t = useTranslations("RootLayout.Header");

  return (
    <header className="navbar w-full rounded-lg bg-base-200">
      <div className="navbar-start gap-10">
        <Link href="/" className="btn btn-ghost" title={t("logoLinkTitle")}>
          <Logo />
        </Link>
        <div className="hidden md:block">
          <Nav />
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex gap-3">
        <LocaleSwitch />
        <AuthWrapper />
        <div className="block md:hidden">
          <Menu />
        </div>
      </div>
    </header>
  );
}
