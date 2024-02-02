import { HistoryRes, fetchPointsHistory } from "@/lib/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  message?: string;
  data?: HistoryRes;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { gid } = req.query;
    if (gid) {
      try {
        const data = await fetchPointsHistory(gid as string);
        res.status(200).json({
          message: "success",
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
