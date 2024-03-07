import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly  from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});


export default async function RootLayout({
   children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
      <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          {/*<Modal actionLabel="submit" title="hello world" isOpen/>*/}
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser = {currentUser}/>
      </ClientOnly>
      {children}
      </body>
      </html>
  );
}


