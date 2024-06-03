
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import NavBar from "./ui/Navbar/NavBar";
import Footer from "./ui/Footer/Footer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const cookieStore = cookies();
  const isLogged = cookieStore.get("access_token") ? true : false;
     return (
     <html lang="en">
        <body className={inter.className}>
        <Providers>
        {isLogged ? children : <><NavBar />{children}<Footer /></>}
        </Providers>  
          </body>
      </html>
     )   
}
