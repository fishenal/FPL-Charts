"use client";
import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import useSWR from "swr";
import { SolvedBasicInfo, basicInfofetcher, fetcher } from "@/lib/fetcher";
import { Elements } from "@/pages/api/fpl/elements";
import { useAppConfig } from "../hooks/useAppConfig";
import { PickDataItem } from "@/pages/api/fpl/picks/[gid]";

interface SolvedPicksItem {
  isCap: boolean;
  isViceCap: boolean;
  element: number;
  subIn: boolean;
  subOut: boolean;
  bench: boolean;
}

interface PlayerStatsItem {
  name: string;
  pos: string;
  team: string;
  element: number;
  capTimes: number;
  viceCapTimes: number;
  subInTimes: number;
  subOutTimes: number;
  benchTimes: number;
  pickTimes: number;
}

export default function PlayerChoose() {
  const { id } = useAppConfig();
  const { data: userInfoData } = useSWR<SolvedBasicInfo>(
    `/api/fpl/user/${id}`,
    basicInfofetcher
  );
  const { data: pickData } = useSWR<PickDataItem[]>(
    () =>
      id && userInfoData?.current_event
        ? `/api/fpl/picks/${id}?gw=${userInfoData?.current_event}`
        : null,
    fetcher
  );
  const { data: elements } = useSWR<Elements>("/api/fpl/elements", fetcher);

  const picks = useMemo(() => {
    if (pickData && elements) {
      const solvedData: SolvedPicksItem[][] = pickData.map((pickItem) => {
        return pickItem.picks.map((item, idx) => {
          let subIn = false;
          let subOut = false;
          pickItem.automatic_subs.forEach((subItem) => {
            if (subItem.element_in === item.element) {
              subIn = true;
            }
            if (subItem.element_out === item.element) {
              subOut = true;
            }
          });
          return {
            element: item.element,
            isCap: item.is_captain,
            isViceCap: item.is_vice_captain,
            subIn,
            subOut,
            bench: idx > 10,
          };
        });
      });
      console.log("🚀 ~ solvedData ~ solvedData;:", solvedData);
      return solvedData;
    }
    return;
  }, [pickData]);

  // console.log("🚀 ~ PlayerChoose ~ elements:", elements);
  console.log("🚀 ~ Player ~ pickData:", pickData);
  const catArr = useMemo(
    () => [
      {
        label: "Total Points",
        mapKey: "total_points",
      },
      {
        label: "GW Points",
        mapKey: "points",
      },
      {
        label: "Bench Points",
        mapKey: "points_on_bench",
      },
      {
        label: "Trans. Cost",
        mapKey: "event_transfers_cost",
      },
    ],
    []
  );
  const catData = catArr.map((item) => item.label);
  const setSeries = useMemo(
    () => {
      // if (Object.keys(data).length > 0) {
      //   const { historyInfo } = data as IFPLData;
      //   const seriesData: Record<string, any>[] = [];

      //   catArr.forEach(({ mapKey, label }) => {
      //     seriesData.push({
      //       name: label,
      //       type: "line",
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: historyInfo.map((it) => it[mapKey as keyof PointsItem]),
      //     });
      //   });
      //   // console.log("🚀 ~ setSeries ~ seriesData:", seriesData);
      //   return seriesData;
      // }
      return null;
    },
    [
      /*data, catArr*/
    ]
  );

  const setXAxis = useMemo(
    () => {
      // if (Object.keys(data).length > 0) {
      //   const { historyInfo } = data as IFPLData;
      //   const xData = [];
      //   for (let a = 1; a <= historyInfo.length; a++) {
      //     xData.push(`GW${a}`);
      //   }
      //   return xData;
      // }
      return [];
    },
    [
      /*data*/
    ]
  );

  const option = {
    title: {
      text: "Points Chart",
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
