"use client";
import { useMemo } from "react";
import { IFPLData, useFPLData } from "../hooks/useFPLData";
import ReactEcharts from "echarts-for-react";
import { PointsItem } from "@/lib/fetch";

export default function Points() {
  const data = useFPLData(true, "");
  const catArr = useMemo(
    () => [
      {
        label: "OR Rank",
        mapKey: "overall_rank",
      },
      {
        label: "GW Rank",
        mapKey: "rank",
      },
    ],
    []
  );
  const catData = catArr.map((item) => item.label);
  const setSeries = useMemo(() => {
    if (Object.keys(data).length > 0) {
      const { historyInfo } = data as IFPLData;
      const seriesData: Record<string, any>[] = [];

      catArr.forEach(({ mapKey, label }) => {
        seriesData.push({
          name: label,
          type: "line",
          emphasis: {
            focus: "series",
          },
          data: historyInfo.map((it) => it[mapKey as keyof PointsItem]),
        });
      });
      return seriesData;
    }
    return null;
  }, [data, catArr]);

  const setXAxis = useMemo(() => {
    if (Object.keys(data).length > 0) {
      const { historyInfo } = data as IFPLData;
      const xData = [];
      for (let a = 1; a <= historyInfo.length; a++) {
        xData.push(`GW${a}`);
      }
      return xData;
    }
    return [];
  }, [data]);
  const option = {
    title: {
      text: "Rank Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: catData,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      // containLabel: true,
      // height: "300",
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: setXAxis,
      },
    ],
    yAxis: [
      {
        type: "value",
        inverse: true,
      },
    ],
    series: setSeries,
  };
  return (
    <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
      <div className="w-full h-full">
        <ReactEcharts
          option={option}
          style={{
            height: "500px",
          }}
        />
      </div>
    </div>
  );
}
