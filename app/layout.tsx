import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tennis with Fanni | Teniszoktatás és közösség",
  description:
    "Teniszoktatás, táborok és inspiráló közösségi események Fricska Fannival Székesfehérváron.",
  icons: {
    icon: "/favicon.svg?v=2",
    shortcut: "/favicon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
