import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenerife Tennis Holiday 2027 | Tennis with Fanni",
  description:
    "Hat éjszakás tenerifei teniszutazás a Bahia del Duque hotelben, 10-14 óra teniszedzéssel.",
};

export default function TenerifeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
