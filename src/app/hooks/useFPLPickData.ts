import { Elements } from "@/pages/api/fpl/elements";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IPickItem {
  active_chip: string | null;
  automatic_subs: {
    element_in: number;
    element_out: number;
    entry: number;
    event: number;
  }[];
  entry_history: {
    bank: number;
    event: number;
    event_transfers: number;
    event_transfers_cost: number;
    overall_rank: number;
    percentile_rank: number;
    points: number;
    points_on_bench: number;
    rank: number;
    rank_sort: number;
    total_points: number;
    value: number;
  };
  picks: {
    element: number;
    is_captain: boolean;
    is_vice_captain: boolean;
    multiplier: number;
    position: number;
  }[];
}
export interface IFPLPickData {
  picks: IPickItem[];
  elements: Elements;
  updateAt: string;
  userId: string;
  local?: boolean;
}
const lsKey = "fpl-charts-pick-data";

export const useFPLPickData = (
  currentGW: number,
  id: string
): IFPLPickData | {} => {
  const [fplPickData, setFplPickData] = useState<IFPLPickData | {}>({});
  console.log("🚀 ~ getData ~ id:", id);
  console.log("🚀 ~ getData ~ currentGW:", currentGW);
  useEffect(() => {
    const ls = window.localStorage.getItem(`${lsKey}`);
    const getData = async (id: string) => {
      if (id && currentGW) {
        const tid = toast.loading("Please wait fetching your Data...");
        const res = await axios.get(`/api/fpl/picks/${id}?gw=${currentGW}`);
        const eleRes = await axios.get("/api/fpl/elements");
        // let allPass = true;
        // for (let i = 0; i < res.length; i++) {
        //   if (res[i].status !== 200) {
        //     toast.error(`Fetch ${id} Failed ${res[i].data.message}`);
        //     allPass = false;
        //   }
        // }
        if (res.status === 200) {
          const pickData: IFPLPickData = {
            picks: res.data.data,
            elements: eleRes.data.data,
            updateAt: new Date().toISOString(),
            userId: id,
          };
          setFplPickData(pickData);
          window.localStorage.setItem(`${lsKey}`, JSON.stringify(pickData));
        }
        toast.update(tid, {
          render: `Fetch ${id} Success`,
          type: "success",
          isLoading: false,
        });
      }
    };
    if (ls) {
      setFplPickData({ ...JSON.parse(ls), local: true });
    } else {
      getData(id);
    }
  }, [id, currentGW]);

  return fplPickData;
};
