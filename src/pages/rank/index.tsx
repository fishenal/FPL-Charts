import { RootLayout } from "../../components/layout";
import RankCharts from "./charts";

export default function Ranks() {
  return (
    <RootLayout innerFix>
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
        <div className="w-full h-full">
          <RankCharts />
        </div>
      </div>
    </RootLayout>
  );
}
