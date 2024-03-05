"use client";
import { useMemo, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { PointsItem } from "@/lib/fetch";
import useSWR from "swr";
import { multiFetcher } from "@/lib/fetcher";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ComparisonHeader, idsItem } from "../components/comparisonHeader";
export default function Points() {
  const [idList, setIdList] = useState<idsItem[]>([]);
  const { data: hisData, isLoading } = useSWR(
    idList.length > 0 &&
      idList.map((idItem) => `/api/fpl/history/${idItem.id}`),
    multiFetcher
  );

  // console.log("🚀 ~ Points ~ hisData:", hisData);

  const handleSearch = (idList: idsItem[]) => {
    setIdList(idList);
  };

  const setGwpSeries = useMemo(() => {
    if (idList.length > 0) {
      const seriesData: Record<string, any>[] = [];
      idList.forEach((idItem, idx) => {
        const historyInfo: PointsItem[] = hisData && hisData[idx]?.current;
        if (historyInfo) {
          seriesData.push({
            name: idItem.name,
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
            data: historyInfo.map((it) => it.points),
          });
        }
      });
      return seriesData;
    }
    return null;
  }, [hisData, idList]);

  const setTpSeries = useMemo(() => {
    if (idList.length > 0) {
      const seriesData: Record<string, any>[] = [];
      idList.forEach((idItem, idx) => {
        const historyInfo: PointsItem[] = hisData && hisData[idx]?.current;
        if (historyInfo) {
          seriesData.push({
            name: idItem.name,
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: historyInfo.map((it) => it.total_points),
          });
        }
      });
      return seriesData;
    }
    return null;
  }, [hisData, idList]);
  const setRankSeries = useMemo(() => {
    if (idList.length > 0) {
      const seriesData: Record<string, any>[] = [];
      idList.forEach((idItem, idx) => {
        const historyInfo: PointsItem[] = hisData && hisData[idx]?.current;
        if (historyInfo) {
          seriesData.push({
            name: idItem.name,
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: historyInfo.map((it) => it.overall_rank),
          });
        }
      });
      return seriesData;
    }
    return null;
  }, [hisData, idList]);

  const setXAxis = useMemo(() => {
    if (hisData && hisData[0]?.current) {
      const xData = [];
      for (let a = 1; a <= hisData[0]?.current.length; a++) {
        xData.push(`GW${a}`);
      }
      return xData;
    }
    return [];
  }, [hisData]);

  const genOption = (
    title: string,
    dataMethod: Record<any, any>[] | null,
    yInverse = false
  ) => {
    return {
      title: {
        text: title,
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
        data: idList,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
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
          inverse: yInverse,
        },
      ],
      series: dataMethod,
    };
  };

  return (
    <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
      <ComparisonHeader onSearch={handleSearch} />
      <h2>
        Comparison Page can help to compare FPL players points & rank by GWs.
      </h2>
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
          <>
            <ReactEcharts
              option={genOption("GW Points Comparision Chart", setGwpSeries)}
              style={{
                height: "500px",
              }}
            />
            <ReactEcharts
              option={genOption("Total Points Comparision Chart", setTpSeries)}
              style={{
                height: "500px",
              }}
            />
            <ReactEcharts
              option={genOption("Rank Comparision Chart", setRankSeries, true)}
              style={{
                height: "500px",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
