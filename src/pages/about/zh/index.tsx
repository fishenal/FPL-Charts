import { Typography } from "@mui/material";
import { RootLayout } from "../../../components/layout";
import { CommonHead } from "@/components/Head";

export default function About() {
  return (
    <RootLayout innerFix withoutUserInfoBanner>
      <CommonHead pageName="About" desc="About FPL charts & fishenal" />
      <div className="flex flex-col gap-2 py-8 w-full h-full">
        <Typography variant="h4" gutterBottom>
          关于
        </Typography>
        <Typography gutterBottom>
          网站由fishenal独立设计开发, 我是一名前端开发工程师
        </Typography>
        <Typography gutterBottom>
          可在github查看此开源项目:
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
          , 欢迎提交issue/PR.
        </Typography>
        <Typography gutterBottom>
          技术栈包括： React + Next.js + SWR + ECharts + Tailwindcss +
          MaterialUI, 在此鸣谢
        </Typography>
        <Typography gutterBottom>
          可通过这个联系我：
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
