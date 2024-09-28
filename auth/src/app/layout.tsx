import type { Metadata } from "next";
import { MuseoModerno, Open_Sans } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`min-h-screen flex flex-col ${museo_moderno.variable} ${open_sans.variable} font-sans`}
      >
        <StoreProvider>
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
      </body>
    </html>
  );
}
