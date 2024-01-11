import type { NextApiRequest, NextApiResponse } from "next";

interface BasicInfoRes {
  name: string;
  player_first_name: string;
  player_last_name: string;
  player_region_name: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  id: number;
}

interface PointsItem {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}
export interface UserData {
  basicInfo: BasicInfoRes;
  historyInfo: PointsItem[];
}
interface ResponseData {
  message?: string;
  data?: UserData;
}
//fantasy.premierleague.com/api/entry/5524951/
const host = "https://fantasy.premierleague.com";
const fetchBasicInfo = async (gid: string): Promise<BasicInfoRes> => {
  const res = await fetch(`${host}/api/entry/${gid}`);
  const repo = await res.json();
  return {
    name: repo.name,
    player_first_name: repo.player_first_name,
    player_last_name: repo.player_last_name,
    player_region_name: repo.player_region_name,
    summary_overall_points: repo.summary_overall_points,
    summary_overall_rank: repo.summary_overall_rank,
    id: repo.id,
  };
};

const fetchPointsHistory = async (gid: string): Promise<PointsItem[]> => {
  const res = await fetch(`${host}/api/entry/${gid}/history`);
  const repo = await res.json();
  return repo.current;
};

const fetchStaticData = async () => {
  const res = await fetch(`${host}/api/bootstrap-static`);
  const repo = await res.json();
  return repo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { gid } = req.query;
    if (gid) {
      try {
        const basicInfo = await fetchBasicInfo(gid as string);
        const historyInfo = await fetchPointsHistory(gid as string);
        // const staticData = await fetchStaticData();
        res.status(200).json({
          message: "",
          data: {
            basicInfo,
            historyInfo,
            // staticData,
          },
        });
      } catch (err) {
        res.status(500).json({ message: err as string });
      }
    }
  } else {
    res.status(404);
  }

  res.end();
}
