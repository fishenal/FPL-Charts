export interface BasicInfoRes {
  name: string;
  player_first_name: string;
  player_last_name: string;
  player_region_name: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  id: number;
}

export interface PointsItem {
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

//fantasy.premierleague.com/api/entry/5524951/
const host = "https://fantasy.premierleague.com";
export const fetchBasicInfo = async (gid: string): Promise<BasicInfoRes> => {
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

export const fetchPointsHistory = async (
  gid: string
): Promise<PointsItem[]> => {
  const res = await fetch(`${host}/api/entry/${gid}/history`);
  const repo = await res.json();
  return repo.current;
};

export const fetchStaticData = async () => {
  const res = await fetch(`${host}/api/bootstrap-static`);
  const repo = await res.json();
  return repo;
};
