"use client";
import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { HistoryRes, PointsItem } from "@/lib/fetch";
import useSWR from "swr";
import { useAppConfig } from "../hooks/useAppConfig";
import { fetcher } from "@/lib/fetcher";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Events } from "@/pages/api/fpl/events";
import { UserInfoHeader } from "../components/userInfoHeader";
export default function Points() {
  const { id } = useAppConfig();
  const { data, isLoading } = useSWR<HistoryRes>(
    () => (id ? `/api/fpl/history/${id}` : ""),
    fetcher
  );
  const { data: events } = useSWR<Events>("/api/fpl/events", fetcher);
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
      {
        label: "GW Avg.",
        mapKey: "gw_avg",
      },
      {
        label: "GW Max",
        mapKey: "gw_max",
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
        const isGwData = mapKey === "gw_max" || mapKey === "gw_avg";

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
        const getData = () => {
          if (mapKey === "gw_max") {
            return events?.map((it) => it.highest_score);
          }
          if (mapKey === "gw_avg") {
            return events?.map((it) => it.average_entry_score);
          }
          return historyInfo.map((it) => it[mapKey as keyof PointsItem]);
        };
        let lineStyle = {};
        let itemStyle = {};
        if (isGwData) {
          lineStyle = {
            color: "#ddd",
            type: "dashed",
          };
          itemStyle = {
            color: "#999",
          };
        }
        seriesData.push({
          name: label,
          type: "line",
          emphasis: {
            focus: "series",
          },
          lineStyle,
          itemStyle,
          markPoint,
          data: getData(),
        });
      });
      // console.log("🚀 ~ setSeries ~ seriesData:", seriesData);
      return seriesData;
    }
    return null;
  }, [historyInfo, catArr, chips, events]);

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
      <UserInfoHeader />
      <Typography variant="h6" gutterBottom>
        Your FPL Team Points Line Chart
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
