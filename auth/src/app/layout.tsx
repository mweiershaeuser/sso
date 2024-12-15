import SkipLink from "@/components/common/skip-link";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { MuseoModerno, Open_Sans } from "next/font/google";
import Alerts from "./_components/alerts";
import Footer from "./_components/footer";
import Header from "./_components/header";
import LoginLogoutDialogs from "./_components/login-logout-dialogs";
import StoreProvider from "./_contexts/store-provider";
import "./globals.css";

const museo_moderno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const viewport: Viewport = {
  themeColor: "#495e35",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RootLayout.metadata");

  return {
    title: t("title"),
    description: t("description"),
    appleWebApp: {
      title: "mw auth",
      statusBarStyle: "default",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const t = await getTranslations("RootLayout");

  return (
    <html lang={locale} data-theme="mw_auth">
      <body
        className={`min-h-screen flex flex-col ${museo_moderno.variable} ${open_sans.variable} font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <SkipLink label={t("skipToMainContentLink")} href="#main-content" />
            <div className="w-full p-4">
              <Header />
            </div>
            <main
              id="main-content"
              className="grow flex flex-col min-w-full max-w-full prose prose-headings:font-display"
            >
              <LoginLogoutDialogs />
              <Alerts />
              {children}
            </main>
            <div className="w-full p-4">
              <Footer />
            </div>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
