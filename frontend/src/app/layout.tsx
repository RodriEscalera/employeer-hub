"use client";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../state/store";
import NavBar from "@/components/NavBar/NavBar";
import PersistSession from "@/components/PersistSession/PersistSession";
const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${roboto.className} background-color-global`}>
          <PersistSession>
            <NavBar />
            {children}
          </PersistSession>
        </body>
      </html>
    </Provider>
  );
}
