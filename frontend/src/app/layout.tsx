import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employeer Hub",
  description:
    "This website deals with the management of a company's employees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
