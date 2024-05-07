"use client";
import { useMemo } from "react";
import useSWR from "swr";
import { SolvedBasicInfo, basicInfofetcher, fetcher } from "@/lib/fetcher";
import { Elements } from "@/pages/api/fpl/elements";
import { useAppConfig } from "../../hooks/useAppConfig";
import { PickDataItem } from "@/pages/api/fpl/picks/[gid]";
import { SimpleLiveData } from "@/pages/api/fpl/live/[gw]";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UserInfoHeader } from "../../components/UserInfoBanner";
import { RootLayout } from "../../components/layout";

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
  totalPoints: number;
}
const columns: GridColDef[] = [
  { field: "element", headerName: "ID" },
  { field: "name", headerName: "Name" },
  {
    field: "pos",
    headerName: "Position",
  },
  {
    field: "team",
    headerName: "Team",
  },
  {
    field: "pickTimes",
    headerName: "Pick",
    type: "number",
  },
  {
    field: "benchTimes",
    headerName: "Bench",
    type: "number",
  },
  {
    field: "capTimes",
    headerName: "Captain",
    type: "number",
  },
  {
    field: "viceCapTimes",
    headerName: "V-Captain",
    type: "number",
  },
  {
    field: "subInTimes",
    headerName: "Sub-in",
    type: "number",
  },
  {
    field: "subOutTimes",
    headerName: "Sub-out",
    type: "number",
  },
  {
    field: "totalPoints",
    width: 180,
    headerName: "Points Contribute",
    type: "number",
  },
];
export default function PlayerChoose() {
  const { id } = useAppConfig();
  const { data: userInfoData } = useSWR<SolvedBasicInfo>(
    () => (id ? `/api/fpl/user/${id}` : ""),
    basicInfofetcher
  );
  const { data: pickData, isLoading: loading1 } = useSWR<PickDataItem[]>(
    () =>
      id && userInfoData?.current_event
        ? `/api/fpl/picks/${id}?gw=${userInfoData?.current_event}`
        : null,
    fetcher
  );
  const { data: liveData, isLoading: loading2 } = useSWR<SimpleLiveData>(
    () =>
      userInfoData?.current_event
        ? `/api/fpl/live/${userInfoData?.current_event}`
        : null,
    fetcher
  );
  const { data: elements } = useSWR<Elements>("/api/fpl/elements", fetcher);
  // console.log("🚀 ~ PlayerChoose ~ liveData:", liveData);
  const playerStats = useMemo(() => {
    if (pickData && elements && liveData) {
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
      const playerStats: PlayerStatsItem[] = [];
      solvedData.forEach((players, idx) => {
        const gw = idx + 1;
        players.forEach((player) => {
          let current = playerStats.find(
            (item) => item.element === player.element
          );
          let gwPoint = liveData?.[gw]?.[player.element] || 0;
          if (current) {
            if (player.isCap) {
              current.capTimes += 1;
            }
            if (player.isViceCap) {
              current.viceCapTimes += 1;
            }
            if (player.subIn) {
              current.subInTimes += 1;
            }
            if (player.subOut) {
              current.subOutTimes += 1;
            }
            if (player.bench) {
              current.benchTimes += 1;
            }
            current.pickTimes += 1;
            current.totalPoints += gwPoint;
          } else {
            playerStats.push({
              name: elements[player.element].web_name,
              pos: elements[player.element].element_types,
              team: elements[player.element].team,
              element: player.element,
              capTimes: player.isCap ? 1 : 0,
              viceCapTimes: player.isViceCap ? 1 : 0,
              subInTimes: player.subIn ? 1 : 0,
              subOutTimes: player.subOut ? 1 : 0,
              benchTimes: player.bench ? 1 : 0,
              pickTimes: 1,
              totalPoints: gwPoint,
            });
          }
        });
      });
      // console.log("🚀 ~ playerStats ~ playerStats;:", playerStats);
      return playerStats;
    }
    return;
  }, [pickData, liveData, elements]);

  return (
    <RootLayout innerFix>
      <div className="flex justify-center flex-col items-center gap-2 py-8 w-full h-full">
        {/* <UserInfoHeader /> */}
        {/* <h2>Analytics of Your FPL Picks Stats Table</h2> */}
        <div className="w-full h-full">
          {loading1 || loading2 ? (
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
            playerStats && (
              <DataGrid
                rows={playerStats}
                columns={columns}
                disableRowSelectionOnClick
                disableColumnMenu
                hideFooter
                slots={{ toolbar: GridToolbar }}
                getRowId={(row) => row.element}
              />
            )
          )}
        </div>
      </div>
    </RootLayout>
  );
}
