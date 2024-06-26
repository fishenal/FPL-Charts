import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { HistoryRes, PointsItem } from "@/lib/fetch";
import { useAppConfig } from "../hooks/useAppConfig";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Box, CircularProgress } from "@mui/material";
import historyDemoData from "../lib/demo/history";

export default function RankCharts({ demo = false }: { demo?: boolean }) {
  const { id } = useAppConfig();
  const { data, isLoading } = useSWR<HistoryRes>(
    () => (id && !demo ? `/api/fpl/history/${id}` : ""),
    fetcher
  );
  const historyInfo = demo ? historyDemoData.current : data?.current;
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
    if (historyInfo) {
      const seriesData: Record<string, any>[] = [];

      catArr.forEach(({ mapKey, label }) => {
        seriesData.push({
          name: label,
          type: "line",
          emphasis: {
            focus: "series",
          },
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          data: historyInfo.map((it) => it[mapKey as keyof PointsItem]),
        });
      });
      return seriesData;
    }
    return null;
  }, [historyInfo, catArr]);

  const setXAxis = useMemo(() => {
    if (historyInfo) {
      const xData = [];
      for (let a = 0; a < historyInfo.length; a++) {
        xData.push(`GW${historyInfo[a]?.event}`);
      }
      return xData;
    }
    return [];
  }, [historyInfo]);
  const option = {
    // title: {
    //   text: "Rank Chart",
    // },
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
        type: "log",
        inverse: true,
      },
    ],
    series: setSeries,
  };
  return isLoading ? (
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
      style={
        demo
          ? {}
          : {
              height: "500px",
            }
      }
    />
  );
}
