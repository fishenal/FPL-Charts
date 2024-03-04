import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        <CssBaseline />
        <Grid
          container
          sx={{
            height: "100vh",
          }}
        >
          <Grid item xs={4} sm={3} md={2}>
            <nav className="bg-neutral-100 shadow-inner h-full">
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
          </Grid>
          <Grid
            item
            xs={8}
            sm={9}
            md={10}
            sx={{
              paddingX: 5,
            }}
          >
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
          </Grid>
        </Grid>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
