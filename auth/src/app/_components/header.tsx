import Logo from "@/components/common/logo";
import LocaleSwitch from "@/components/i18n/locale-switch";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Nav from "../../components/common/nav";
import AuthWrapper from "./auth-wrapper";
import Menu from "./menu";

export default function Header() {
  const t = useTranslations("RootLayout.Header");

  return (
    <header className="navbar w-full rounded-lg bg-base-200 flex-wrap">
      <div className="navbar-start gap-10 flex-wrap">
        <Link href="/" className="btn btn-ghost" title={t("logoLinkTitle")}>
          <Logo />
        </Link>
        <div className="hidden md:block">
          <Nav />
        </div>
      </div>
      <div className="navbar-center flex-wrap"></div>
      <div className="navbar-end flex md:gap-3 flex-wrap">
        <LocaleSwitch />
        <AuthWrapper />
        <div className="block md:hidden">
          <Menu />
        </div>
      </div>
    </header>
  );
}
