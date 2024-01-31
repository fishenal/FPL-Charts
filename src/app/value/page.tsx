"use client";
import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { PointsItem } from "@/lib/fetch";
import { useAppConfig } from "../hooks/useAppConfig";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Points() {
  const { id } = useAppConfig();
  const { data: historyInfo } = useSWR<PointsItem[]>(
    `/api/fpl/history/${id}`,
    fetcher
  );
  const catArr = useMemo(
    () => [
      {
        label: "Bank Money",
        mapKey: "bank",
      },
      {
        label: "Tans. Made",
        mapKey: "event_transfers",
      },
      {
        label: "Team Value",
        mapKey: "value",
      },
    ],
    []
  );
  const catData = catArr.map((item) => item.label);
  const setSeries = useMemo(() => {
    if (historyInfo) {
      const seriesData: Record<string, any>[] = [];

      catArr.forEach(({ mapKey, label }) => {
        const type = mapKey === "value" ? "line" : "bar";
        seriesData.push({
          name: label,
          type,
          emphasis: {
            focus: "series",
          },
          data: historyInfo.map((it) => {
            if (mapKey === "value" || mapKey === "bank") {
              return it[mapKey as keyof PointsItem] / 10;
            }
            return it[mapKey as keyof PointsItem];
          }),
        });
      });
      // console.log("🚀 ~ setSeries ~ seriesData:", seriesData);
      return seriesData;
    }

    return null;
  }, [historyInfo, catArr]);

  const setXAxis = useMemo(() => {
    if (historyInfo) {
      const xData = [];
      for (let a = 1; a <= historyInfo.length; a++) {
        xData.push(`GW${a}`);
      }
      return xData;
    }
    return [];
  }, [historyInfo]);
  const option = {
    title: {
      text: "Value Chart",
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
