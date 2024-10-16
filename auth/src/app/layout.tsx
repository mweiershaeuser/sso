import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { MuseoModerno, Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./_components/footer";
import Header from "./_components/header";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RootLayout.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="mw_auth">
      <body
        className={`min-h-screen flex flex-col ${museo_moderno.variable} ${open_sans.variable} font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 5000,
                style: {
                  color: "oklch(var(--ac))",
                  background: "oklch(var(--a))",
                },
                success: {
                  style: {
                    color: "oklch(var(--suc))",
                    background: "oklch(var(--su))",
                  },
                  iconTheme: {
                    primary: "oklch(var(--suc))",
                    secondary: "oklch(var(--su))",
                  },
                },
                error: {
                  style: {
                    color: "oklch(var(--erc))",
                    background: "oklch(var(--er))",
                  },
                  iconTheme: {
                    primary: "oklch(var(--erc))",
                    secondary: "oklch(var(--er))",
                  },
                },
              }}
            />
            <div className="w-full p-4">
              <Header />
            </div>
            <main className="grow flex flex-col min-w-full max-w-full prose prose-headings:font-display">
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
