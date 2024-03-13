import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Employeer Hub",
  description:
    "This website deals with the management of a company's employees.",
};

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} background-color-global`}>
        {children}
      </body>
    </html>
  );
}
