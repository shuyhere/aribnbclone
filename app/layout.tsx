import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly  from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          {/*<Modal actionLabel="submit" title="hello world" isOpen/>*/}
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
      </ClientOnly>

      {children}
      </body>
      </html>
  );
}


