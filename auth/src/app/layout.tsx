import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  title: "auth.melvinweiershaeuser.de",
  description: "Single Sign-On",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`min-h-screen flex flex-col ${museo_moderno.variable} ${open_sans.variable} font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
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
