"use client";
import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { HistoryRes, PointsItem } from "@/lib/fetch";
import useSWR from "swr";
import { useAppConfig } from "../hooks/useAppConfig";
import { fetcher } from "@/lib/fetcher";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ComparisonHeader } from "../components/comparisonHeader";
export default function Points() {
  const { id } = useAppConfig();
  const { data, isLoading } = useSWR<HistoryRes>(
    () => (id ? `/api/fpl/history/${id}` : ""),
    fetcher
  );

  const historyInfo = data?.current;
  const chips = data?.chips;
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
  const setSeries = useMemo(() => {
    if (historyInfo) {
      const seriesData: Record<string, any>[] = [];

      catArr.forEach(({ mapKey, label }) => {
        let markPoint;
        const chipsUsed = chips?.map((item) => {
          return {
            value: item.name,
            itemStyle: {
              color: "red",
            },
            symbol: "triangle",
            symbolSize: 40,
            symbolOffset: [0, 30],
            coord: [item.event - 1, 0],
          };
        });
        if (mapKey === "points" && chipsUsed) {
          markPoint = {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
              ...chipsUsed,
            ],
          };
        }
        seriesData.push({
          name: label,
          type: "line",
          emphasis: {
            focus: "series",
          },
          markPoint,
          data: historyInfo.map((it) => it[mapKey as keyof PointsItem]),
        });
      });
      // console.log("🚀 ~ setSeries ~ seriesData:", seriesData);
      return seriesData;
    }
    return null;
  }, [historyInfo, catArr, chips]);

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
      selected: {
        "Total Points": false,
      },
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
      <ComparisonHeader />
      <Typography variant="h6" gutterBottom>
        Comparison Page can help to compare two FPL players points & rank by
        GWs.
      </Typography>
      <div className="w-full h-full">
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <ReactEcharts
            option={option}
            style={{
              height: "500px",
            }}
          />
        )}
      </div>
    </div>
  );
}
