import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Footer from "./_components/footer";
import Header from "./_components/header";
import StoreProvider from "./_contexts/store-provider";
import "./globals.css";

const open_sans = Open_Sans({ subsets: ["latin"] });

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
      <body className={`min-h-screen flex flex-col ${open_sans.className}`}>
        <StoreProvider>
          <div className="w-full p-4">
            <Header />
          </div>
          <main className="grow flex flex-col min-w-full max-w-full prose">
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
