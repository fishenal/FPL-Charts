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
    const { gw } = req.query;
    if (gw) {
      try {
        const data: Record<string, any> = {};
        for (let i = 1; i <= Number(gw); i++) {
          const { elements } = await import(`@/lib/live/${i}.json`);
          const liveData: Record<string, number> = {};
          elements.forEach((item: any) => {
            liveData[item.id] = item.stats.total_points;
          });
          data[i] = liveData;
        }
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
