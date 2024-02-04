"use client";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <div className="flex flex-col gap-2 py-8 w-full h-full">
      <Typography gutterBottom>
        This Site is created by fishenal, a FPL Player(ID: 5524951), and an
        Experienced Web Developer in Shanghai/China.
      </Typography>
      <Typography gutterBottom>
        I made this site because I want to record my play history & stats, which
        interesting for me. Hope it will help for you too.
      </Typography>
      <Typography gutterBottom>
        If you are interesting about this project please see my github:
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
        If you found some bugs to report or ideas to make this app better,
        welcome leave message on{" "}
        <a
          href="https://github.com/fishenal/FPL-Charts/issues"
          target="_blank"
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Project Issues
        </a>
        or contact me by email:{" "}
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
      <div>
        <a href="https://www.buymeacoffee.com/fishenal" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
            alt="Buy Me A Coffee"
          />
        </a>
      </div>
    </div>
  );
}
