import {
  BasicInfoRes,
  PointsItem,
  fetchBasicInfo,
  fetchPointsHistory,
} from "@/lib/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  message?: string;
  data?: PointsItem[];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { gid } = req.query;
    if (gid) {
      try {
        const historyInfo = await fetchPointsHistory(gid as string);
        res.status(200).json({
          message: "",
          data: historyInfo,
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
