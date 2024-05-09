import { HowTo } from "@/components/howTo";
import { RootLayout } from "../components/layout";
import PointsCharts from "../components/PointCharts";
import Image from "next/image";
import RankCharts from "../components/RankCharts";
import i18nHelper from "@/i18n";
import { CommonHead } from "@/components/Head";

export default function Home() {
  return (
    <RootLayout>
      <CommonHead pageName="Home" />
      <div className="w-full bg-[#046035]">
        <div className="max-w-screen-lg mx-4 lg:mx-auto  relative">
          <Image
            src="/homeBanner.jpg"
            width="1200"
            height="300"
            alt="FPL Charts Banner"
          />
          <h1 className="text-white bg-[#046035] absolute text-3xl bottom-12 left-0 font-bold p-4">
            {i18nHelper.t("bannerTitle")}
          </h1>
        </div>
      </div>
      <HowTo />
      <div className="border-t py-5 max-w-screen-lg mx-4 lg:mx-auto">
        <h1 className="flex text-lg font-bold">{i18nHelper.t("demoTitle")}</h1>
        <div className="my-6">
          <h2 className="flex text-lg font-bold justify-center px-2 my-2 border-b border-[#046035]">
            Points Charts
          </h2>
          <PointsCharts demo />
          <h2 className="flex text-lg font-bold justify-center px-2 my-2 border-b border-[#046035]">
            Rank Charts
          </h2>
          <div className="mt-6">
            <RankCharts demo />
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
