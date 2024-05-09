import { Typography } from "@mui/material";
import { RootLayout } from "../../components/layout";
import { CommonHead } from "@/components/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function About() {
  const router = useRouter();
  const { locale: activeLocale } = router;

  useEffect(() => {
    if (activeLocale === "zh") {
      router.push("/about/zh");
    } else {
      router.push("/about");
    }
  }, [activeLocale, router]);

  return (
    <RootLayout innerFix withoutUserInfoBanner>
      <CommonHead pageName="About" desc="About FPL charts & fishenal" />
      <div className="flex flex-col gap-2 py-8 w-full h-full">
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography gutterBottom>
          This Site is created by fishenal, a Web Developer in Shanghai.
        </Typography>

        <Typography gutterBottom>
          This project is open-sourced, If you are interesting about this
          project please see my github:
          <a
            href="https://github.com/fishenal/FPL-Charts"
            target="_blank"
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            https://github.com/fishenal/FPL-Charts
          </a>
        </Typography>
        <Typography gutterBottom>
          I used React + Next.js + SWR + ECharts + Tailwindcss + MaterialUI for
          this project. Thanks for these wonderful libarary.
        </Typography>
        <Typography gutterBottom>
          Contact me by email:{" "}
          <a
            href="mailTo:yu_dong_han@hotmail.com"
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            yu_dong_han@hotmail.com
          </a>
        </Typography>
        {/* <div>
          <a href="https://www.buymeacoffee.com/fishenal" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
              alt="Buy Me A Coffee"
            />
          </a>
        </div> */}
      </div>
    </RootLayout>
  );
}
