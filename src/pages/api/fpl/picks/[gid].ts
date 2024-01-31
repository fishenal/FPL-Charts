import { fetchPicks } from "@/lib/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

export interface PicksItem {
  element: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  position: number;
}

export interface AutoSubs {
  element_in: number;
  element_out: number;
  entry: number;
  event: number;
}
export interface PickDataItem {
  active_chip: string | null;
  automatic_subs: AutoSubs[];
  entry_history: { [key: string]: number | string };
  picks: PicksItem[];
}

export interface ResponseData {
  message?: string;
  data?: any;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { gid, gw } = req.query;
    if (gid && gw) {
      try {
        const data: PickDataItem[] = [];
        for (let i = 1; i <= Number(gw); i++) {
          let gepick = await fetchPicks(gid as string, i);
          // console.log("🚀 ~ gepick:", gepick);
          data.push(gepick);
        }
        // console.log("🚀 ~ data:", data);
        res.status(200).json({
          message: "",
          data,
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
