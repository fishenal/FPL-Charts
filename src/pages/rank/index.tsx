import { CommonHead } from "@/components/Head";
import { RootLayout } from "../../components/layout";
import RankCharts from "../../components/RankCharts";

export default function Ranks() {
  return (
    <RootLayout innerFix>
      <CommonHead
        pageName="Ranks"
        desc="Your FPL Ranks History Chart"
        noIndex
      />
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
        <div className="w-full h-full">
          <h2 className="mb-4 text-center">Your FPL Ranks History Chart</h2>
          <RankCharts />
        </div>
      </div>
    </RootLayout>
  );
}
