import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tennis with Fanni | Teniszoktatás és közösség",
  description:
    "Teniszoktatás, táborok és inspiráló közösségi események Fricska Fannival Székesfehérváron.",
  icons: {
    icon: "/favicon-logo-terracotta.png?v=4",
    shortcut: "/favicon-logo-terracotta.png?v=4",
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
