import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Nav } from "./components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FPL-Charts",
  description:
    "Web App for FPL players to visual analysis their player performance, player stats and play history. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-row h-screen w-screen text-sky-800">
          <nav className="w-1/5 bg-neutral-100 shadow-inner">
            <header className="p-2 pt-4">
              <h1 className="flex text-2xl p-2 gap-2">
                <Image
                  src="/icon.png"
                  width="30"
                  height="25"
                  alt="FPL Charts Icon"
                />
                FPL Charts
              </h1>
            </header>
            <Nav />
          </nav>
          <div className="w-4/5 p-4">
            <Header />
            <div className="flex">{children}</div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </main>
      </body>
    </html>
  );
}
