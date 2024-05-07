import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CssBaseline from "@mui/material/CssBaseline";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "./footer";
const inter = Inter({ subsets: ["latin"] });

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-100">
      <div>
        <CssBaseline />
        <Nav />
        <main className="my-2">{children}</main>
        <Footer />
        <Analytics />
        {/* <ToastContainer
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
        /> */}
      </div>
    </div>
    // <html lang="en">
    //   <Head>
    //   <title>FPL-Charts: Help you analysis FPL game stats.</title>
    //   <desc>Web App for FPL players to visual analysis their player performance, player stats and play history. Comparison stats.</desc>
    //   </Head>
    //   <body className={inter.className}>

    //     <div className="flex flex-col sm:flex-row text-sm">
    //       <div className="flex-1 px-4">
    //         <Nav />
    //         <div className="flex">{children}</div>
    //       </div>
    //     </div>

    //   </body>
    // </html>
  );
};
