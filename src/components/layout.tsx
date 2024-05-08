import { Inter } from "next/font/google";
import { Nav } from "./nav";
import CssBaseline from "@mui/material/CssBaseline";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "./footer";
import { UserInfoBanner } from "./UserInfoBanner";
import { GlobalSnackbar } from "./Snackbar";
const inter = Inter({ subsets: ["latin"] });
export const RootLayout = ({
  children,
  innerFix = false,
  withoutUserInfoBanner = false,
}: {
  children: React.ReactNode;
  innerFix?: boolean;
  withoutUserInfoBanner?: boolean;
}) => {
  const renderChildren = () => {
    if (innerFix) {
      return <div className="max-w-screen-lg mx-4 lg:mx-auto">{children}</div>;
    }
    return children;
  };
  return (
    <div className="bg-neutral-100">
      <div>
        <CssBaseline />
        <Nav />
        {!withoutUserInfoBanner && <UserInfoBanner />}
        <main>{renderChildren()}</main>
        <Footer />
        <Analytics />
        <GlobalSnackbar />
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
