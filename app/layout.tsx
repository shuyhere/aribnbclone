import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly  from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

const font = Nunito({
  subsets: ["latin"],
});


export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};
export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={font.className}>
      <ClientOnly>
        <Modal actionLabel="submit" title="hello world" isOpen/>
        <Navbar />
      </ClientOnly>

      {children}
      </body>
      </html>
  );
}


