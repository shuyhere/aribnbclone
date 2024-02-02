import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

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
      <Navbar />
      {children}
      </body>
      </html>
  );
}


