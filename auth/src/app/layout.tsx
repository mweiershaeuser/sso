import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Footer from "./_components/footer";
import Header from "./_components/header";
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
      <body
        className={`min-h-screen flex flex-col justify-between ${open_sans.className}`}
      >
        <div>
          <Header />
          <main className="prose">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
