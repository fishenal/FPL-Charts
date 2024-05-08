import { RootLayout } from "../../components/layout";
import PointsCharts from "./charts";

export default function Points({ demo = false }: { demo?: boolean }) {
  return (
    <RootLayout innerFix>
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
        <div className="w-full h-full">
          <PointsCharts />
        </div>
      </div>
    </RootLayout>
  );
}
