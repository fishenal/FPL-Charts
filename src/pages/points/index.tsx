import { CommonHead } from "@/components/Head";
import { RootLayout } from "../../components/layout";
import PointsCharts from "../../components/PointCharts";

export default function Points() {
  return (
    <RootLayout innerFix>
      <CommonHead
        pageName="Points"
        desc="Your FPL Points History Chart"
        noIndex
      />
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
        <div className="w-full h-full">
          <h2 className="mb-4 text-center">Your FPL Points History Chart</h2>
          <PointsCharts />
        </div>
      </div>
    </RootLayout>
  );
}
