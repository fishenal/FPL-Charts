import { fetchPicks } from "@/lib/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

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
        const data = [];
        for (let i = 1; i <= Number(gw); i++) {
          let gepick = await fetchPicks(gid as string, i);
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
