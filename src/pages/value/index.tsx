import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { HistoryRes, PointsItem } from "@/lib/fetch";
import { useAppConfig } from "../../hooks/useAppConfig";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Box, CircularProgress } from "@mui/material";
import { RootLayout } from "../../components/layout";
import { CommonHead } from "@/components/Head";

export default function Points() {
  const { id } = useAppConfig();
  const { data, isLoading } = useSWR<HistoryRes>(
    () => (id ? `/api/fpl/history/${id}` : ""),
    fetcher
  );
  const historyInfo = data?.current;
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
      for (let a = 0; a < historyInfo.length; a++) {
        xData.push(`GW${historyInfo[a]?.event}`);
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
      selected: {
        "Team Value": false,
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
    <RootLayout innerFix>
      <CommonHead pageName="Values" desc="Your FPL Team Value Chart" noIndex />
      <h2 className="mb-4 text-center mt-6">Your FPL Team Value Chart</h2>
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
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
    </RootLayout>
  );
}
