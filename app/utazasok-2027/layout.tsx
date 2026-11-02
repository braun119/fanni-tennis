import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2027-es teniszutazások | Tennis with Fanni",
  description:
    "Öt prémium teniszutazás 2027-ben: La Manga, Mallorca és Lošinj a Tennis with Fanni közösségével.",
};

export default function GetawaysLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
